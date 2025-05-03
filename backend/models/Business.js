// models/Business.js
const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  googleMapLink: {
    type: String,
    required: true,
    trim: true
  },
  photos: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }],
  isApproved: {
    type: Boolean,
    default: false
  },
  paymentMethods: {
    type: [String],
    default: ["Cash", "Card", "UPI"],
    enum: ["Cash", "Card", "UPI", "Credit", "Debit", "Net Banking"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }, hours: {
    type: String,
    default: "9:00 AM - 9:00 PM"
  },
  specialties: {
    type: String,
    trim: true
  },
  service_options: {
    delivery: { type: Boolean, default: false },
    takeaway: { type: Boolean, default: false },
    dine_in: { type: Boolean, default: false },
    outdoor_seating: { type: Boolean, default: false },
    wheelchair_accessible: { type: Boolean, default: false },
    free_wifi: { type: Boolean, default: false },
    parking: { type: Boolean, default: false }
  },
  
});

// Automatically update `updatedAt` on every save
BusinessSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Business", BusinessSchema);