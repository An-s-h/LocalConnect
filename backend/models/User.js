// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firebaseID: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  preferences: {
    type: [String],
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', UserSchema);