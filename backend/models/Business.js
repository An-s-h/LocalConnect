const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  googleMapLink: { type: String, required: true },
  photos: [{ type: String }],
  rating: { type: Number, default: 0 }, // ✅ Added this line to allow editing
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  isApproved: { type: Boolean, default: false }, // NEW FIELD
});

module.exports = mongoose.model("Business", BusinessSchema);
