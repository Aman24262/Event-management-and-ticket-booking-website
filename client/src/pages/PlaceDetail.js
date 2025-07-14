import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaClock, FaPlane, FaArrowLeft, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PlaceDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchPlaceDetails();
  }, [id]);

  const fetchPlaceDetails = async () => {
    try {
      const res = await axios.get(`/api/places/${id}`);
      setPlace(res.data.place);
      setReviews(res.data.reviews);
      setSelectedImage(res.data.place.mainImage);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching place details:', error);
      toast.error('Failed to load place details');
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await axios.post('/api/reviews', {
        place: id,
        ...reviewForm
      });

      setReviews([res.data, ...reviews]);
      setReviewForm({ rating: 5, comment: '' });
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
    setSubmittingReview(false);
  };

  const StarRating = ({ rating, size = 16 }) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}
            size={size}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Place not found</h2>
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-10 rounded-xl overflow-hidden">
              <img
                src={selectedImage}
                alt={place.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              <img
                src={place.mainImage}
                alt={place.name}
                className={`h-20 w-full object-cover rounded-lg cursor-pointer transition-opacity ${
                  selectedImage === place.mainImage ? 'ring-2 ring-primary-600' : 'hover:opacity-75'
                }`}
                onClick={() => setSelectedImage(place.mainImage)}
              />
              {place.gallery.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${place.name} ${index + 1}`}
                  className={`h-20 w-full object-cover rounded-lg cursor-pointer transition-opacity ${
                    selectedImage === image ? 'ring-2 ring-primary-600' : 'hover:opacity-75'
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Place Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
                {place.name}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <FaMapMarkerAlt />
                  <span>{place.city}, {place.state}</span>
                </div>
                <StarRating rating={place.rating} />
                <span className="text-sm">({place.totalReviews} reviews)</span>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {place.briefIntro}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 text-primary-600 mb-2">
                  <FaClock />
                  <span className="font-medium">Best Time</span>
                </div>
                <p className="text-gray-700">{place.bestTimeToVisit}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 text-primary-600 mb-2">
                  <FaPlane />
                  <span className="font-medium">Nearest Airport</span>
                </div>
                <p className="text-gray-700">{place.nearestAirport}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 text-primary-600 mb-2">
                  <FaStar />
                  <span className="font-medium">Category</span>
                </div>
                <p className="text-gray-700 capitalize">{place.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-8 mb-12">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">
            About {place.name}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {place.description}
          </p>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl p-8">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">
            Reviews ({reviews.length})
          </h2>

          {/* Review Form */}
          {isAuthenticated ? (
            <form onSubmit={handleReviewSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Write a Review</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="focus:outline-none"
                    >
                      <FaStar
                        className={
                          star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'
                        }
                        size={24}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  rows={4}
                  className="input-field"
                  placeholder="Share your experience..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submittingReview}
                className="btn-primary"
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          ) : (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600 mb-4">Please login to write a review</p>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <FaUser className="text-white" size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                          <StarRating rating={review.rating} size={14} />
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                No reviews yet. Be the first to review this place!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;