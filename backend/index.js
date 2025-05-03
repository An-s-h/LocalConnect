//index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const { getJson } = require("serpapi");
dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

mongoose.connect(process.env.MONGO_URI, { bufferCommands: false })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Enhanced image quality helper function
const enhanceImageUrl = (url, size = 800) => {
  if (!url) return null;
  
  // Handle Google images
  if (url.includes('googleusercontent.com')) {
    return url.replace(/=s\d+-c/, `=s${size}-c`)
             .replace(/=w\d+-h\d+/, `=w${size}-h${size}`);
  }
  
  // Handle Cloudinary images
  if (url.includes('cloudinary.com')) {
    return url.replace(/upload\//, `upload/q_auto:best,w_${size}/`);
  }
  
  return url;
};

// Local Search API Endpoint
app.get("/api/local-search", async (req, res) => {
  const { query, location = "India" } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  const params = {
    api_key: process.env.SERPAPI_KEY,
    engine: "google_local",
    q: query,
    location: location,
    google_domain: "google.co.in",
    gl: "in",
    hl: "en",
    device: "desktop"
  };

  try {
    getJson(params, (json) => {
      if (json.error) {
        return res.status(500).json({ error: json.error });
      }

      const processedResults = (json.local_results || []).map((result) => ({
        position: result.position,
        title: result.title,
        type: result.type,
        address: result.address,
        rating: result.rating,
        reviews: result.reviews,
        price: result.price,
        thumbnail: enhanceImageUrl(result.thumbnail, 600) || "https://via.placeholder.com/600x400?text=No+Image",
        gps_coordinates: result.gps_coordinates || {},
        place_id: result.place_id,
        place_id_search: result.place_id_search,
        phone: result.phone || result.phone_number || "Not available",
        hours: result.hours || result.operating_hours || "Hours not available",
        service_options: result.service_options || {},
        description: result.description || `${result.title} - ${result.type}`
      }));
      
      res.json({
        search_metadata: json.search_metadata || {},
        search_parameters: json.search_parameters || {},
        local_results: processedResults
      });
    });
  } catch (error) {
    console.error("Error fetching data from SerpAPI:", error.message);
    res.status(500).json({ error: "Error fetching data from SerpAPI" });
  }
});

// Business Details Endpoint
app.get("/api/business/:place_id", async (req, res) => {
  const { place_id } = req.params;

  const params = {
    api_key: process.env.SERPAPI_KEY,
    engine: "google_maps",
    q: place_id,
    type: "place",
    data_id: place_id,
    hl: "en"
  };

  try {
    getJson(params, (json) => {
      if (json.error) {
        return res.status(404).json({ error: "Business not found" });
      }

      const place = json.place_results || {};
      const businessData = {
        title: place.title,
        type: place.type,
        address: place.address,
        phone: place.phone || place.phone_number || "Not available",
        rating: place.rating,
        reviews: place.reviews,
        thumbnail: enhanceImageUrl(place.thumbnail, 1200) || 
                 enhanceImageUrl(place.photos?.[0], 1200) || 
                 "https://via.placeholder.com/1200x800?text=Business+Image",
        hours: place.hours || place.operating_hours || "Not available",
        description: place.description || `${place.title} - ${place.type}`,
        payment_methods: place.payment_options || ["Cash", "Card", "UPI"],
        amenities: place.amenities || [],
        specialties: place.service_options || [],
        service_options: place.service_options || {},
        photos: (place.photos || []).map(photo => enhanceImageUrl(photo, 800)),
        place_id: place_id
      };

      res.json(businessData);
    });
  } catch (error) {
    console.error("Error fetching business details:", error);
    res.status(500).json({ error: "Error fetching business details" });
  }
});

// Business Reviews Endpoint - UPDATED
// Updated Business Reviews Endpoint
app.get("/api/business-reviews/:place_id", async (req, res) => {
  const { place_id } = req.params;
  
  if (!place_id) {
    return res.status(400).json({ 
      error: "Place ID is required",
      details: "No place_id parameter provided in the URL"
    });
  }

  const params = {
    api_key: process.env.SERPAPI_KEY,
    engine: "google_maps_reviews",
    data_id: place_id,
    hl: "en",
    sort_by: "newest"
  };

  try {
    // Using promise-based approach instead of callback
    const response = await new Promise((resolve, reject) => {
      getJson(params, (json) => {
        if (json.error) {
          reject(json.error);
        return;
        }
        resolve(json);
      });
    });

    const processedReviews = (response.reviews || []).map(review => ({
      name: review.user?.name || "Anonymous",
      rating: review.rating || 0,
      text: review.snippet || review.review || "No review text available",
      date: review.date || "Unknown date",
      relative_time: review.relative_time || "",
      profile_photo: enhanceImageUrl(review.user?.profile_photo, 100) || 
                    "https://via.placeholder.com/100?text=User"
    }));

    res.json({
      success: true,
      reviews: processedReviews,
      average_rating: response.place_results?.rating || 
                     response.rating || 
                     null,
      total_reviews: response.place_results?.reviews || 
                    response.reviews || 
                    0
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch reviews",
      details: error.message || "Unknown error occurred",
      place_id: place_id // Echo back the place_id for debugging
    });
  }
});

// Basic routes
app.get('/', (req, res) => {
  res.send('LocalConnect Backend');
});

// User and business routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const businessRoutes = require('./routes/businessRoutes');
app.use('/api/businesses', businessRoutes);

const reviewRoutes=require('./routes/reviewRoutes');
app.use('/api/localreviews',reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); 
});
