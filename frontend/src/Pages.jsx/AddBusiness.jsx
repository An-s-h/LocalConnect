import React, { useState } from "react";
import {
  Building,
  CheckCircle,
  Users,
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Image,
  Link,
  Clock,
  CreditCard,
  Calendar,
  Wifi,
  ParkingCircle,
  Coffee,
  Utensils,
  ShoppingBag,
  Scissors,
  Home,
} from "lucide-react";
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
    googleMapLink: "",
    hours: "9:00 AM - 9:00 PM",
    paymentMethods: ["Cash", "Card", "UPI"],
    amenities: [],
    specialties: "",
    serviceOptions: {
      delivery: false,
      takeaway: false,
      dine_in: false,
      outdoor_seating: false,
      wheelchair_accessible: false,
      free_wifi: false,
      parking: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "photos") {
      setFormData({ ...formData, photos: [...e.target.files] });
    } else if (e.target.name === "paymentMethods") {
      const value = e.target.value;
      let updatedMethods = [...formData.paymentMethods];

      if (e.target.checked) {
        updatedMethods.push(value);
      } else {
        updatedMethods = updatedMethods.filter((method) => method !== value);
      }

      setFormData({ ...formData, paymentMethods: updatedMethods });
    } else if (e.target.name in formData.serviceOptions) {
      setFormData({
        ...formData,
        serviceOptions: {
          ...formData.serviceOptions,
          [e.target.name]: e.target.checked,
        },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();

    // Basic information
    formDataToSend.append("businessName", formData.businessName);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("googleMapLink", formData.googleMapLink);
    formDataToSend.append("hours", formData.hours);
    formDataToSend.append("specialties", formData.specialties);

    // Arrays and objects
    formDataToSend.append(
      "paymentMethods",
      JSON.stringify(formData.paymentMethods)
    );
    formDataToSend.append(
      "serviceOptions",
      JSON.stringify(formData.serviceOptions)
    );

    // Photos
    formData.photos.forEach((photo) => {
      formDataToSend.append("photos", photo);
    });

    try {
      const response = await fetch(
        "https://local-connect-pi.vercel.app/api/businesses",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Categories for dropdown
  const businessCategories = [
    "Fast Food",
    "Restaurant",
    "Café",
    "Clothing & Accessories",
    "Retail",
    "Hotel",
    "Salon",
    "Gym",
    "Medical",
    "Automotive",
    "Home Services",
    "Amusement",
    "Education",
    "Entertainment",
    "Other",
    "Pet Services",
    "Electronics",
    "Real Estate",
    "Legal Services",
    "Child Care",
    "Cleaning Services",
    "Events",
    "Advertising",
    "Stationaries",
    "Photography Services",
    "Financial Services",
    "Courier & Delivery",
    "Tour & Travel",
    "Home Decor",
    "Health & Wellness",
    "Software Services",
    "Bakeries",
    "Florists",
    "Furniture",
    "Jewelry & Accessories",
    "Sports & Fitness",
    "Grocery Stores",
  ];

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
            Join our platform to connect with local customers and grow your
            business. Fill out the form below, and we'll verify your listing
            before approval.
          </p>
        </div>

        {/* Business Form */}
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
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

            {/* Category - Changed to select dropdown */}
            <div className="relative">
              <CheckCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all appearance-none"
              >
                <option value="">Select Business Category</option>
                {businessCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="location"
                placeholder="Full Business Address"
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
                type="tel"
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

            {/* Operating Hours */}
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="hours"
                placeholder="Operating Hours (e.g., 9:00 AM - 9:00 PM)"
                value={formData.hours}
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
                placeholder="Detailed business description (services, history, specialties)"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              ></textarea>
            </div>

            {/* Specialties */}
            <div className="relative">
              <Star className="absolute left-4 top-5 text-gray-400" />
              <textarea
                name="specialties"
                rows="2"
                placeholder="Business specialties or popular items/services"
                value={formData.specialties}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              ></textarea>
            </div>

            {/* Payment Methods */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Methods Accepted
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["Cash", "Card", "UPI", "Credit", "Debit", "Net Banking"].map(
                  (method) => (
                    <div key={method} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`payment-${method}`}
                        name="paymentMethods"
                        value={method}
                        checked={formData.paymentMethods.includes(method)}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`payment-${method}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {method}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Service Options */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Options
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  {
                    name: "delivery",
                    label: "Delivery",
                    icon: <ShoppingBag className="w-4 h-4 mr-1" />,
                  },
                  {
                    name: "takeaway",
                    label: "Takeaway",
                    icon: <Coffee className="w-4 h-4 mr-1" />,
                  },
                  {
                    name: "dine_in",
                    label: "Dine-in",
                    icon: <Utensils className="w-4 h-4 mr-1" />,
                  },
                  {
                    name: "outdoor_seating",
                    label: "Outdoor Seating",
                    icon: <Home className="w-4 h-4 mr-1" />,
                  },
                  {
                    name: "wheelchair_accessible",
                    label: "Wheelchair Access",
                    icon: <ParkingCircle className="w-4 h-4 mr-1" />,
                  },
                  {
                    name: "free_wifi",
                    label: "Free WiFi",
                    icon: <Wifi className="w-4 h-4 mr-1" />,
                  },
                  {
                    name: "parking",
                    label: "Parking Available",
                    icon: <ParkingCircle className="w-4 h-4 mr-1" />,
                  },
                ].map((option) => (
                  <div key={option.name} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`service-${option.name}`}
                      name={option.name}
                      checked={formData.serviceOptions[option.name]}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`service-${option.name}`}
                      className="ml-2 block text-sm text-gray-700 flex items-center"
                    >
                      {option.icon}
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos Upload */}
            <div className="relative">
              <Image className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="file"
                name="photos"
                multiple
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload high-quality photos of your business (minimum 3 photos
                recommended)
              </p>
            </div>

            {/* Google Map Link */}
            <div className="relative">
              <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                name="googleMapLink"
                placeholder="Google Maps Link (https://goo.gl/maps/...)"
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
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-70 flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit for Verification"
              )}
            </button>

            {/* Status Message */}
            {success !== null && (
              <p
                className={`text-center mt-4 text-sm ${
                  success ? "text-green-600" : "text-red-600"
                }`}
              >
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
              <h3 className="text-xl font-semibold mb-2">
                Reach Local Customers
              </h3>
              <p className="text-gray-600">
                Connect with customers in your community who are looking for
                your services.
              </p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
              <ShieldCheck className="w-8 h-8 text-gray-900 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                Gain trust with a verified badge after our team approves your
                business.
              </p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
              <Star className="w-8 h-8 text-gray-900 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">
                Boost Your Reputation
              </h3>
              <p className="text-gray-600">
                Get reviews and ratings from satisfied customers to grow your
                business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBusiness;
