const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const Review = require('../models/Review');

// @route   GET api/places
// @desc    Get all places with optional filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, state, popular, limit = 10, page = 1 } = req.query;
    let query = {};

    if (category) query.category = category;
    if (state) query.state = new RegExp(state, 'i');
    if (popular === 'true') query.isPopular = true;

    const places = await Place.find(query)
      .sort({ isPopular: -1, rating: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Place.countDocuments(query);

    res.json({
      places,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET api/places/popular
// @desc    Get popular places for hero section
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const places = await Place.find({ isPopular: true })
      .select('name mainImage briefIntro state city rating')
      .sort({ rating: -1 })
      .limit(8);

    res.json(places);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET api/places/:id
// @desc    Get place by ID with reviews
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // Get reviews for this place
    const reviews = await Review.find({ place: req.params.id })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ place, reviews });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET api/places/search/:term
// @desc    Search places by name or state
// @access  Public
router.get('/search/:term', async (req, res) => {
  try {
    const searchTerm = req.params.term;
    const places = await Place.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { state: { $regex: searchTerm, $options: 'i' } },
        { city: { $regex: searchTerm, $options: 'i' } }
      ]
    }).limit(10);

    res.json(places);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;