import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaFilter, FaSearch } from 'react-icons/fa';
import axios from 'axios';

const Gallery = () => {
  const location = useLocation();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    state: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'monument', label: 'Monuments' },
    { value: 'temple', label: 'Temples' },
    { value: 'beach', label: 'Beaches' },
    { value: 'hill-station', label: 'Hill Stations' },
    { value: 'wildlife', label: 'Wildlife' },
    { value: 'heritage', label: 'Heritage' },
    { value: 'adventure', label: 'Adventure' }
  ];

  const states = [
    { value: '', label: 'All States' },
    { value: 'uttar pradesh', label: 'Uttar Pradesh' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'goa', label: 'Goa' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'ladakh', label: 'Ladakh' },
    { value: 'uttarakhand', label: 'Uttarakhand' }
  ];

  useEffect(() => {
    // Get search term from URL if present
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get('search');
    if (searchTerm) {
      setFilters(prev => ({ ...prev, search: searchTerm }));
    }
  }, [location]);

  useEffect(() => {
    fetchPlaces();
  }, [filters, pagination.currentPage]);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.state) params.append('state', filters.state);
      if (filters.search) params.append('search', filters.search);
      params.append('page', pagination.currentPage);
      params.append('limit', 12);

      let url = '/api/places';
      if (filters.search) {
        url = `/api/places/search/${filters.search}`;
      } else {
        url = `/api/places?${params.toString()}`;
      }

      const res = await axios.get(url);
      
      if (filters.search) {
        setPlaces(res.data);
        setPagination({ currentPage: 1, totalPages: 1, total: res.data.length });
      } else {
        setPlaces(res.data.places || []);
        setPagination({
          currentPage: res.data.currentPage || 1,
          totalPages: res.data.totalPages || 1,
          total: res.data.total || 0
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching places:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <Link to={`/place/${place._id}`} className="group">
      <div className="card overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            src={place.mainImage}
            alt={place.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="gradient-overlay"></div>
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium capitalize">
              {place.category}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-display font-semibold text-xl mb-1">{place.name}</h3>
            <div className="flex items-center space-x-1 text-sm">
              <FaMapMarkerAlt />
              <span>{place.city}, {place.state}</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-3 line-clamp-2">{place.briefIntro}</p>
          <div className="flex items-center justify-between">
            <StarRating rating={place.rating} />
            <span className="text-sm text-gray-500">{place.totalReviews} reviews</span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Photo Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the diverse beauty of India through our curated collection of destinations
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <h2 className="font-semibold text-lg text-gray-900 mb-4 md:mb-0">
              Filter Destinations
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 text-primary-600"
            >
              <FaFilter />
              <span>Toggle Filters</span>
            </button>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search places..."
                  className="input-field pl-10"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                className="input-field"
              >
                {states.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilters({ category: '', state: '', search: '' });
                  setPagination(prev => ({ ...prev, currentPage: 1 }));
                }}
                className="btn-secondary w-full"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `Showing ${places.length} of ${pagination.total} destinations`}
          </p>
        </div>

        {/* Places Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : places.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {places.map((place) => (
                <PlaceCard key={place._id} place={place} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {[...Array(pagination.totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === pagination.totalPages ||
                    (page >= pagination.currentPage - 1 && page <= pagination.currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg ${
                          page === pagination.currentPage
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === pagination.currentPage - 2 || page === pagination.currentPage + 2) {
                    return <span key={page} className="px-2 py-2 text-gray-500">...</span>;
                  }
                  return null;
                })}
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.02-5.17-2.5A8.014 8.014 0 016 10V6a2 2 0 012-2h8a2 2 0 012 2v4.169"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
            <button
              onClick={() => {
                setFilters({ category: '', state: '', search: '' });
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;