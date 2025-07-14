const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  briefIntro: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  gallery: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['monument', 'temple', 'beach', 'hill-station', 'wildlife', 'heritage', 'adventure'],
    required: true
  },
  bestTimeToVisit: {
    type: String
  },
  nearestAirport: {
    type: String
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Place', placeSchema);