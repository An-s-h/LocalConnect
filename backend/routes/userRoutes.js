const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Signup Route (Updated Path: /users/signup)
router.post("/signup", async (req, res) => {
  const {
    firebaseID,
    username,
    email,
    password,
    phoneNumber,
    city,
    preferences,
  } = req.body;
  try {
    const newUser = new User({
      firebaseID,
      username,
      email,
      password,
      phoneNumber,
      city,
      preferences,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/sign-in", async (req, res) => {
  const { firebaseID } = req.body;

  try {
    // Check if the user exists in MongoDB by Firebase ID
    const user = await User.findOne({ firebaseID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data if found
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add this to your existing user routes file
// In your user routes
router.post("/check-admin", async (req, res) => {
  const { firebaseID } = req.body;

  try {
    const user = await User.findOne({ firebaseID });
    
    if (!user) {
      return res.status(404).json({ message: "User not found", isAdmin: false });
    }

    res.status(200).json({ 
      isAdmin: user.isAdmin,
      message: user.isAdmin ? "Admin access granted" : "Admin access denied"
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message,
      isAdmin: false 
    });
  }
});

module.exports = router;
