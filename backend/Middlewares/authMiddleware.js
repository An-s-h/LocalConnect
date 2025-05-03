// middlewares/authMiddleware.js
const User = require('../models/User');

// Middleware to check if user is authenticated
const authenticate = async (req, res, next) => {
  try {
    const firebaseID = req.headers.authorization || req.body.firebaseID;
    
    if (!firebaseID) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findOne({ firebaseID });
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const firebaseID = req.headers.authorization || req.body.firebaseID;
    
    if (!firebaseID) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findOne({ firebaseID });
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { authenticate, isAdmin };