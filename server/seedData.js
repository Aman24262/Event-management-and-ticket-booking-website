const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Place = require('./models/Place');

dotenv.config();

const places = [
  {
    name: "Taj Mahal",
    description: "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal. The tomb is the centrepiece of a 17-hectare complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall.",
    briefIntro: "A UNESCO World Heritage Site, the Taj Mahal is one of the New Seven Wonders of the World and a symbol of eternal love.",
    state: "Uttar Pradesh",
    city: "Agra",
    mainImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
      "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
    ],
    category: "monument",
    bestTimeToVisit: "October to March",
    nearestAirport: "Agra Airport",
    coordinates: { latitude: 27.1751, longitude: 78.0421 },
    isPopular: true,
    rating: 4.8
  },
  {
    name: "Goa Beaches",
    description: "Goa is a state in western India with coastlines stretching along the Arabian Sea. Its long history as a Portuguese colony prior to 1961 is evident in its preserved 17th-century churches and the area's tropical spice plantations. Goa is also known for its beaches, ranging from popular stretches at Baga and Palolem to those in laid-back fishing villages such as Agonda.",
    briefIntro: "Famous for pristine beaches, vibrant nightlife, Portuguese heritage, and delicious seafood cuisine.",
    state: "Goa",
    city: "Panaji",
    mainImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1544880503-7ad532c3dde8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    category: "beach",
    bestTimeToVisit: "November to February",
    nearestAirport: "Goa International Airport",
    coordinates: { latitude: 15.2993, longitude: 74.1240 },
    isPopular: true,
    rating: 4.6
  },
  {
    name: "Kerala Backwaters",
    description: "The Kerala backwaters are a network of brackish lagoons and lakes lying parallel to the Arabian Sea coast of Kerala state in southern India. The network includes five large lakes linked by canals, both man-made and natural, fed by 38 rivers, and extending virtually half the length of Kerala state.",
    briefIntro: "A serene network of interconnected canals, rivers, lakes and inlets offering houseboat cruises through lush landscapes.",
    state: "Kerala",
    city: "Alleppey",
    mainImage: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1544913845-0404e95edef6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1564507592309-30a56ab8e8ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    category: "adventure",
    bestTimeToVisit: "December to February",
    nearestAirport: "Cochin International Airport",
    coordinates: { latitude: 9.4981, longitude: 76.3388 },
    isPopular: true,
    rating: 4.7
  },
  {
    name: "Jaipur - Pink City",
    description: "Jaipur is the capital of India's Rajasthan state. It evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City, or 'Pink City' for its trademark building color. At the center of its stately street grid stands the opulent, colonnaded City Palace complex.",
    briefIntro: "The Pink City of India, famous for its royal palaces, magnificent forts, and vibrant culture.",
    state: "Rajasthan",
    city: "Jaipur",
    mainImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615027039427-60540ebb2da8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      "https://images.unsplash.com/photo-1506021379694-a5cb671a04c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    category: "heritage",
    bestTimeToVisit: "October to March",
    nearestAirport: "Jaipur International Airport",
    coordinates: { latitude: 26.9124, longitude: 75.7873 },
    isPopular: true,
    rating: 4.5
  },
  {
    name: "Varanasi",
    description: "Varanasi is a city in the northern Indian state of Uttar Pradesh dating to the 11th century B.C. Regarded as the spiritual capital of India, the city draws Hindu pilgrims who bathe in the Ganges River's sacred waters and perform funeral rites.",
    briefIntro: "One of the world's oldest cities and India's spiritual capital, famous for its ghats along the sacred Ganges River.",
    state: "Uttar Pradesh",
    city: "Varanasi",
    mainImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1544013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80"
    ],
    category: "heritage",
    bestTimeToVisit: "October to March",
    nearestAirport: "Lal Bahadur Shastri Airport",
    coordinates: { latitude: 25.3176, longitude: 82.9739 },
    isPopular: true,
    rating: 4.4
  },
  {
    name: "Ladakh",
    description: "Ladakh is a region administered by India as a union territory, and constituting a part of the larger Kashmir region, which has been the subject of dispute between India, Pakistan, and China since 1947. It extends from the Siachen Glacier in the Karakoram range to the main Great Himalayas to the south.",
    briefIntro: "Known as 'Land of High Passes', famous for stunning landscapes, Buddhist monasteries, and adventure sports.",
    state: "Ladakh",
    city: "Leh",
    mainImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1544013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
      "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80"
    ],
    category: "adventure",
    bestTimeToVisit: "May to September",
    nearestAirport: "Kushok Bakula Rimpochee Airport",
    coordinates: { latitude: 34.1526, longitude: 77.5771 },
    isPopular: true,
    rating: 4.9
  },
  {
    name: "Rishikesh",
    description: "Rishikesh is a city in India's northern state of Uttarakhand, in the Himalayan foothills beside the Ganges River. The river is considered holy, and the city is renowned as a center for studying yoga and meditation.",
    briefIntro: "The Yoga Capital of the World, famous for spiritual retreats, adventure sports, and the holy Ganges River.",
    state: "Uttarakhand",
    city: "Rishikesh",
    mainImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1544013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
      "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80"
    ],
    category: "adventure",
    bestTimeToVisit: "September to November, March to May",
    nearestAirport: "Jolly Grant Airport",
    coordinates: { latitude: 30.0869, longitude: 78.2676 },
    isPopular: true,
    rating: 4.3
  },
  {
    name: "Hampi",
    description: "Hampi is an ancient village in the south Indian state of Karnataka. It's dotted with numerous ruined temple complexes from the Vijayanagara Empire. On the south bank of the River Tungabhadra is the 7th-century Hindu Virupaksha Temple, near the revived Hampi Bazaar.",
    briefIntro: "A UNESCO World Heritage Site with stunning ruins of the Vijayanagara Empire and ancient temples.",
    state: "Karnataka",
    city: "Hampi",
    mainImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1544013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
      "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80"
    ],
    category: "heritage",
    bestTimeToVisit: "October to February",
    nearestAirport: "Bellary Airport",
    coordinates: { latitude: 15.3350, longitude: 76.4600 },
    isPopular: false,
    rating: 4.5
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected...');

    // Clear existing data
    await Place.deleteMany({});
    console.log('Existing places removed...');

    // Insert new data
    await Place.insertMany(places);
    console.log('Places data seeded successfully...');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();