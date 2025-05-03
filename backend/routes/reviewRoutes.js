// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get reviews for a business
router.get('/:businessName', async (req, res) => {
  try {
    const reviews = await Review.find({ businessName: req.params.businessName });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new review
router.post('/', async (req, res) => {
  const review = new Review({
    businessName: req.body.businessName,
    rating: req.body.rating,
    comment: req.body.comment,
    userName: req.body.userName || "Anonymous"
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a review
router.patch('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (req.body.rating) review.rating = req.body.rating;
    if (req.body.comment) review.comment = req.body.comment;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a review
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;