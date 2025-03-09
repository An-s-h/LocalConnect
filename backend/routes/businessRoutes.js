const express = require('express');
const Business = require('../models/Business');
const router = express.Router();

// Create a new business
router.post('/', async (req, res) => {
  const { name, category, description, location, phoneNumber } = req.body;
  try {
    const newBusiness = new Business({ name, category, description, location, phoneNumber });
    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all businesses
router.get('/', async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;