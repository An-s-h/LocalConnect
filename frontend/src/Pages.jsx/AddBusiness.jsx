import React, { useState } from "react";
import { Building, CheckCircle, Users, ShieldCheck, Star, MapPin, Phone, Mail, MessageSquare, Image, Link } from "lucide-react";
import NavBar from "../Components/NavBar";

const AddBusiness = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    location: "",
    contact: "",
    email: "",
    description: "",
    photos: [],
    googleMapLink: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "photos") {
      setFormData({ ...formData, photos: [...e.target.files] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
      setFormData({
        businessName: "",
        category: "",
        location: "",
        contact: "",
        email: "",
        description: "",
        photos: [],
        googleMapLink: ""
      });
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* NavBar */}
      <div className="bg-black pt-20 w-full">
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4">
            Add Your Business
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join our platform to connect with local customers and grow your business.
            Fill out the form below, and we'll verify your listing before approval.
          </p>
        </div>

        {/* Business Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div className="relative">
              <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              />
            </div>

            {/* Category */}
            <div className="relative">
              <CheckCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="category"
                placeholder="Business Category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              />
            </div>

            {/* Location */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="location"
                placeholder="Business Location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              />
            </div>

            {/* Contact */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Business Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              />
            </div>

            {/* Description */}
            <div className="relative">
              <MessageSquare className="absolute left-4 top-5 text-gray-400" />
              <textarea
                name="description"
                rows="4"
                placeholder="Business Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              ></textarea>
            </div>

            {/* Photos Upload */}
            <div className="relative">
              <Image className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="file"
                name="photos"
                multiple
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              />
            </div>

            {/* Google Map Link */}
            <div className="relative">
              <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="googleMapLink"
                placeholder="Google Map Link"
                value={formData.googleMapLink}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-70"
            >
              {isLoading ? "Submitting..." : "Submit for Verification"}
            </button>

            {/* Status Message */}
            {success !== null && (
              <p className={`text-center mt-4 text-sm ${
                success ? "text-gray-600" : "text-gray-600"
              }`}>
                {success 
                  ? "✓ Submitted! We'll verify your business shortly."
                  : "! Please try again or contact support@localconnect.com"}
              </p>
            )}
          </form>
        </div>

        {/* Why Get Listed Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Why Get Listed?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
              <Users className="w-8 h-8 text-gray-900 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Reach Local Customers</h3>
              <p className="text-gray-600">
                Connect with customers in your community who are looking for your services.
              </p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
              <ShieldCheck className="w-8 h-8 text-gray-900 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                Gain trust with a verified badge after our team approves your business.
              </p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
              <Star className="w-8 h-8 text-gray-900 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Boost Your Reputation</h3>
              <p className="text-gray-600">
                Get reviews and ratings from satisfied customers to grow your business.
              </p>
            </div>
          </div>
        </div>

        {/* Verification Process Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Our Verification Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
              <CheckCircle className="w-8 h-8 text-gray-900 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Submit Your Details</h3>
              <p className="text-gray-600">
                Fill out the form with accurate business information.
              </p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
              <ShieldCheck className="w-8 h-8 text-gray-900 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">We Verify</h3>
              <p className="text-gray-600">
                Our team reviews your submission to ensure authenticity.
              </p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
              <Star className="w-8 h-8 text-gray-900 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Get Approved</h3>
              <p className="text-gray-600">
                Once verified, your business will be listed on our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBusiness;