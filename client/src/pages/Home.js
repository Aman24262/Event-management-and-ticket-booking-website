import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const Home = () => {
  const [popularPlaces, setPopularPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularPlaces();
  }, []);

  const fetchPopularPlaces = async () => {
    try {
      const res = await axios.get('/api/places/popular');
      setPopularPlaces(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching popular places:', error);
      setLoading(false);
    }
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}
            size={12}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  const PlaceCard = ({ place }) => (
    <div className="group relative card overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img
          src={place.mainImage}
          alt={place.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="gradient-overlay"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="font-display font-semibold text-xl mb-2">{place.name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-sm">
              <FaMapMarkerAlt />
              <span>{place.city}, {place.state}</span>
            </div>
            <StarRating rating={place.rating} />
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-3">{place.briefIntro}</p>
        <Link
          to={`/place/${place._id}`}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          <span>Explore More</span>
          <FaArrowRight size={12} />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Discover
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
              Incredible India
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up">
            Explore the magnificent heritage, breathtaking landscapes, and rich culture
            of India through our curated photo gallery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/gallery" className="btn-primary text-lg px-8 py-3">
              Explore Gallery
            </Link>
            <button className="btn-outline text-lg px-8 py-3">
              Watch Video
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-soft">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover India's most beloved tourist destinations, each telling a unique story
              of heritage, culture, and natural beauty
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-64 bg-gray-300 rounded-t-xl"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularPlaces.map((place) => (
                <PlaceCard key={place._id} place={place} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/gallery" className="btn-primary text-lg px-8 py-3">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our Gallery?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience India like never before with our comprehensive photo gallery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4">High-Quality Images</h3>
              <p className="text-gray-600">
                Professional photography showcasing the true beauty and essence of each destination
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4">Verified Reviews</h3>
              <p className="text-gray-600">
                Authentic reviews from travelers who have experienced these destinations firsthand
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4">Detailed Information</h3>
              <p className="text-gray-600">
                Comprehensive details about each location including best time to visit and travel tips
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of travelers who have discovered the beauty of India through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors text-lg">
              Join Now
            </Link>
            <Link to="/gallery" className="btn-outline text-lg px-8 py-3">
              Explore Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;