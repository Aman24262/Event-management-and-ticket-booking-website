const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Place = require('../models/Place');

// Middleware to verify JWT token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// @route   POST api/reviews
// @desc    Create a review
// @access  Private
router.post('/', [
  auth,
  body('place', 'Place ID is required').not().isEmpty(),
  body('rating', 'Rating must be between 1 and 5').isInt({ min: 1, max: 5 }),
  body('comment', 'Comment is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { place, rating, comment } = req.body;

    // Check if place exists
    const placeExists = await Place.findById(place);
    if (!placeExists) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // Check if user already reviewed this place
    const existingReview = await Review.findOne({ user: req.user.id, place });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this place' });
    }

    // Create new review
    const review = new Review({
      user: req.user.id,
      place,
      rating,
      comment
    });

    await review.save();

    // Update place rating
    await updatePlaceRating(place);

    // Populate user data in the response
    await review.populate('user', 'name avatar');

    res.json(review);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/reviews/place/:placeId
// @desc    Get reviews for a place
// @access  Public
router.get('/place/:placeId', async (req, res) => {
  try {
    const reviews = await Review.find({ place: req.params.placeId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/reviews/:id
// @desc    Delete a review
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns this review
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const placeId = review.place;
    await Review.findByIdAndDelete(req.params.id);

    // Update place rating after deletion
    await updatePlaceRating(placeId);

    res.json({ message: 'Review removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to update place rating
async function updatePlaceRating(placeId) {
  try {
    const reviews = await Review.find({ place: placeId });
    
    if (reviews.length === 0) {
      await Place.findByIdAndUpdate(placeId, {
        rating: 0,
        totalReviews: 0
      });
      return;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    await Place.findByIdAndUpdate(placeId, {
      rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error('Error updating place rating:', error);
  }
}

module.exports = router;