import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <span className="font-display font-bold text-xl">
                Incredible India
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover the magnificent heritage, breathtaking landscapes, and rich culture
              of India through our curated photo gallery. Experience the beauty of incredible India.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Home
              </Link>
              <Link
                to="/gallery"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Photo Gallery
              </Link>
              <Link
                to="/gallery?category=monument"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Monuments
              </Link>
              <Link
                to="/gallery?category=heritage"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Heritage Sites
              </Link>
              <Link
                to="/gallery?category=adventure"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Adventure
              </Link>
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Popular Destinations</h3>
            <div className="space-y-2">
              <Link
                to="/gallery?search=taj mahal"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Taj Mahal
              </Link>
              <Link
                to="/gallery?search=goa"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Goa Beaches
              </Link>
              <Link
                to="/gallery?search=kerala"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Kerala Backwaters
              </Link>
              <Link
                to="/gallery?search=jaipur"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Jaipur - Pink City
              </Link>
              <Link
                to="/gallery?search=ladakh"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Ladakh
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-primary-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Tourism Street, New Delhi, India 110001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  +91 11 2345 6789
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  info@incredibleindia.com
                </span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-2">Subscribe to our Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-r-lg transition-colors text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Incredible India. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;