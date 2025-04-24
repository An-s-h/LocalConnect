// routes/businessRoute.js
const express = require("express");
const router = express.Router();
const Business = require("../models/Business");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "business-photos",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage: storage });

// Create business with image upload
router.post("/", upload.array("photos"), async (req, res) => {
  try {
    const photos = req.files?.map((file) => file.path) || [];

    const newBusiness = new Business({
      name: req.body.businessName,
      category: req.body.category,
      location: req.body.location,
      phoneNumber: req.body.contact,
      email: req.body.email,
      description: req.body.description,
      googleMapLink: req.body.googleMapLink,
      photos: photos,
      isApproved: false, 
      rating:4.2,
      // New business is not approved by default
    });

    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all businesses
router.get("/", async (req, res) => {
  try {
    const businesses = await Business.find({ isApproved: true }); // Only get approved businesses
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all businesses for admin
router.get("/admin", async (req, res) => {
  try {
    const businesses = await Business.find(); // Get all businesses for admin
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve a business
router.put("/approve/:id", async (req, res) => {
  try {
    const business = await Business.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    res.json(business);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete unapproved business
router.delete("/:id", async (req, res) => {
  try {
    await Business.findByIdAndDelete(req.params.id);
    res.json({ message: "Business deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update business rating
router.put("/update-rating/:id", async (req, res) => {
  const { rating } = req.body;
  try {
    const business = await Business.findByIdAndUpdate(
      req.params.id,
      { rating },
      { new: true }
    );
    res.json(business);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;