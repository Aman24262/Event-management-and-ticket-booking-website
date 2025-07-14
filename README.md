# Incredible India - Photo Gallery

A comprehensive full-stack web application showcasing the beautiful tourist destinations of India. Built with React.js frontend, Node.js/Express backend, and MongoDB database.

## 🌟 Features

### Frontend Features
- **Beautiful Hero Section** with stunning background and call-to-action
- **Photo Gallery Grid** displaying Indian tourist destinations
- **Individual Place Pages** with detailed information, image galleries, and reviews
- **User Authentication** with secure login/signup functionality
- **Search & Filter** functionality for finding destinations
- **Responsive Design** optimized for all devices
- **Professional UI** using Tailwind CSS with custom animations

### Backend Features
- **RESTful API** with Express.js
- **User Authentication** with JWT tokens
- **Review System** for places with ratings
- **MongoDB Integration** with Mongoose ODM
- **Data Validation** and error handling
- **Seed Data** for initial database population

### Key Destinations Included
- 🏛️ **Taj Mahal** - UNESCO World Heritage Site
- 🏖️ **Goa Beaches** - Portuguese heritage and pristine beaches
- 🛶 **Kerala Backwaters** - Serene network of canals and lakes
- 🏰 **Jaipur - Pink City** - Royal palaces and magnificent forts
- 🕉️ **Varanasi** - Spiritual capital with sacred Ganges River
- 🏔️ **Ladakh** - Land of High Passes with stunning landscapes
- 🧘 **Rishikesh** - Yoga capital and adventure sports
- 🏛️ **Hampi** - Ancient Vijayanagara Empire ruins

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd indian-photo-gallery
   ```

2. **Install dependencies for both client and server**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/indian-photo-gallery
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system or update the `MONGODB_URI` to point to your MongoDB Atlas cluster.

5. **Seed the database with initial data**
   ```bash
   cd server
   node seedData.js
   ```

6. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and React frontend (port 3000).

## 📁 Project Structure

```
indian-photo-gallery/
├── client/                     # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   ├── context/           # React context for state management
│   │   │   └── AuthContext.js
│   │   ├── pages/             # Main page components
│   │   │   ├── Home.js        # Hero section + popular places
│   │   │   ├── Gallery.js     # All places with filters
│   │   │   ├── PlaceDetail.js # Individual place page
│   │   │   ├── Login.js       # Authentication
│   │   │   └── Signup.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css          # Tailwind CSS imports
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                     # Node.js backend
│   ├── models/                # MongoDB schemas
│   │   ├── Place.js
│   │   ├── User.js
│   │   └── Review.js
│   ├── routes/                # API endpoints
│   │   ├── auth.js           # Authentication routes
│   │   ├── places.js         # Places CRUD operations
│   │   └── reviews.js        # Review management
│   ├── .env                  # Environment variables
│   ├── server.js             # Main server file
│   ├── seedData.js           # Database seeding script
│   └── package.json
├── package.json              # Root package.json
└── README.md
```

## 🛠️ Available Scripts

### Root Level
- `npm run dev` - Start both client and server in development mode
- `npm run install-all` - Install dependencies for both client and server
- `npm run client` - Start only the React frontend
- `npm run server` - Start only the Node.js backend

### Client (Frontend)
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Server (Backend)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🎨 Design & Technologies

### Frontend Stack
- **React.js** - Component-based UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications

### Backend Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Key Features Implementation

#### Authentication System
- Secure user registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes and middleware

#### Review System
- Users can rate and review places (1-5 stars)
- Automatic rating calculation and updates
- One review per user per place restriction
- Real-time review display

#### Search & Filter
- Text search across place names, cities, and states
- Category filtering (monuments, beaches, heritage, etc.)
- State-wise filtering
- Pagination for large result sets

#### Responsive Design
- Mobile-first approach
- Responsive navigation with mobile menu
- Optimized images and layouts
- Touch-friendly interactions

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user (protected)

### Places
- `GET /api/places` - Get all places with pagination/filtering
- `GET /api/places/popular` - Get popular places for hero section
- `GET /api/places/:id` - Get single place with reviews
- `GET /api/places/search/:term` - Search places

### Reviews
- `POST /api/reviews` - Create new review (protected)
- `GET /api/reviews/place/:placeId` - Get reviews for a place
- `DELETE /api/reviews/:id` - Delete review (protected)

## 🎯 Usage Examples

### User Authentication
```javascript
// Register new user
const userData = {
  name: "John Doe",
  email: "john@example.com",
  password: "SecurePass123"
};
await register(userData);

// Login user
const loginData = {
  email: "john@example.com",
  password: "SecurePass123"
};
await login(loginData);
```

### Adding a Review
```javascript
const reviewData = {
  place: "place_id_here",
  rating: 5,
  comment: "Amazing place! Must visit."
};
await axios.post('/api/reviews', reviewData);
```

### Searching Places
```javascript
// Search by text
const places = await axios.get('/api/places/search/taj mahal');

// Filter by category
const monuments = await axios.get('/api/places?category=monument');

// Filter by state
const rajasthanPlaces = await axios.get('/api/places?state=rajasthan');
```

## 🚀 Deployment

### Frontend Deployment
1. Build the React app: `cd client && npm run build`
2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Update MongoDB URI to production database
3. Deploy to Heroku, Railway, or your preferred Node.js hosting service

### Environment Variables for Production
```env
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Images courtesy of Unsplash photographers
- Inspiration from India's incredible tourism destinations
- Built with modern web technologies and best practices

## 📞 Support

For support, email info@incredibleindia.com or create an issue in the repository.

---

**Discover Incredible India! 🇮🇳**