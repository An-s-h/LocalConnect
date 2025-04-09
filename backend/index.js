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
const PORT = process.env.PORT ;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  // Local Search API Endpoint
  app.get("/api/local-search", async (req, res) => {
    const { query, location = "India" } = req.query;
  
    if (!query) {
      return res.status(400).json({ error: "Missing query parameter" });
    }
  
    const params = {
      api_key: process.env.SERPAPI_KEY ,
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
  
        // Process the results to match the expected format
        const processedResults = (json.local_results || []).map((result) => ({
          position: result.position,
          title: result.title,
          type: result.type,
          address: result.address,
          rating: result.rating,
          reviews: result.reviews,
          price: result.price,
          thumbnail: result.thumbnail,
          service_options: result.service_options || {},
          gps_coordinates: result.gps_coordinates || {},
          place_id: result.place_id,
          place_id_search: result.place_id_search
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
  

app.get('/', (req, res) => {
  res.send('LocalConnect Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const businessRoutes = require('./routes/businessRoutes');
app.use('/api/businesses', businessRoutes);