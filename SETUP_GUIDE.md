# Quick Setup Guide - Incredible India Photo Gallery

## 🚀 Quick Start (5 Minutes)

### Step 1: Clone and Install
```bash
# Clone the repository
git clone <your-repo-url>
cd indian-photo-gallery

# Install all dependencies
npm run install-all
```

### Step 2: Setup Environment
```bash
# Navigate to server directory
cd server

# Create .env file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/indian-photo-gallery
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development" > .env
```

### Step 3: Start MongoDB
```bash
# Start MongoDB (if installed locally)
mongod

# OR use MongoDB Atlas cloud database
# Update MONGODB_URI in .env with your Atlas connection string
```

### Step 4: Seed Database
```bash
# From server directory
node seedData.js
```

### Step 5: Start Application
```bash
# From root directory
npm run dev
```

🎉 **That's it!** Your application will be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🎯 What You Get

### ✅ Complete Features
- [x] Logo + Navbar + Signup Button
- [x] Hero Section with Indian places
- [x] Individual place pages (Taj Mahal, etc.)
- [x] Image galleries (5-6 images per place)
- [x] Review system with ratings
- [x] Footer with links
- [x] Professional design with Tailwind CSS
- [x] Responsive design for all devices
- [x] User authentication
- [x] Search and filter functionality

### 🏛️ Pre-loaded Destinations
1. **Taj Mahal** - Agra, Uttar Pradesh
2. **Goa Beaches** - Panaji, Goa
3. **Kerala Backwaters** - Alleppey, Kerala
4. **Jaipur (Pink City)** - Jaipur, Rajasthan
5. **Varanasi** - Varanasi, Uttar Pradesh
6. **Ladakh** - Leh, Ladakh
7. **Rishikesh** - Rishikesh, Uttarakhand
8. **Hampi** - Hampi, Karnataka

## 🛠️ Development Commands

```bash
# Start both client and server
npm run dev

# Start only frontend
npm run client

# Start only backend
npm run server

# Install dependencies
npm run install-all

# Build for production
cd client && npm run build
```

## 🔧 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# If not installed, use MongoDB Atlas:
# 1. Sign up at https://mongodb.com/atlas
# 2. Create cluster
# 3. Get connection string
# 4. Update MONGODB_URI in .env
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run install-all
```

## 📱 Testing the Application

1. **Home Page**: Visit http://localhost:3000
2. **Sign Up**: Create a new account
3. **Browse Gallery**: Click "Explore Gallery"
4. **Place Details**: Click on any place (e.g., Taj Mahal)
5. **Leave Review**: Sign in and leave a review
6. **Search**: Use the search bar in navbar

## 🎨 Customization

### Adding New Places
Edit `server/seedData.js` and add new place objects:
```javascript
{
  name: "Your Place Name",
  description: "Detailed description...",
  briefIntro: "Short introduction...",
  state: "State Name",
  city: "City Name",
  mainImage: "https://your-image-url.jpg",
  gallery: ["url1.jpg", "url2.jpg", ...],
  category: "monument", // or beach, heritage, etc.
  // ... other fields
}
```

### Changing Colors
Edit `client/tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

## 🚀 Deployment Ready

The application is production-ready with:
- Environment variable configuration
- Security best practices
- Responsive design
- Error handling
- Input validation
- JWT authentication
- MongoDB integration

## 📞 Need Help?

- Check the main README.md for detailed documentation
- Review the code comments for implementation details
- MongoDB Atlas setup: https://docs.atlas.mongodb.com/
- React documentation: https://reactjs.org/docs
- Express.js guide: https://expressjs.com/

---

**Happy Coding! 🇮🇳 Enjoy exploring Incredible India!**