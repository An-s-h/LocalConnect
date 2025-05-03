// src/Pages.jsx/BusinessComponent.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Clock,
  Phone,
  CreditCard,
  Star,
  ArrowUpRight,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import ReviewsComponent from "../Components/ReviewsComponent";

function BusinessComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const businessData = location.state?.businessData;
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);
  const [averageRating, setAverageRating] = useState(businessData?.rating || 0);
  const [totalReviews, setTotalReviews] = useState(businessData?.reviews || 0);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!businessData?.place_id) return;

      setLoadingReviews(true);
      setReviewsError(null);
      try {
        const response = await axios.get(
          `https://local-connect-one.vercel.app/api/business-reviews/${businessData.place_id}`
        );

        if (response.data.error) {
          throw new Error(response.data.error);
        }

        setAverageRating(
          response.data.average_rating || businessData.rating || 0
        );
        setTotalReviews(
          response.data.total_reviews || businessData.reviews || 0
        );
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviewsError(error.message || "Failed to load reviews");
      }
      setLoadingReviews(false);
    };

    fetchReviews();
  }, [businessData?.place_id]);

  if (!businessData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-2xl font-bold mb-4">
          Business Information Not Available
        </h1>
        <p className="mb-6 text-gray-600">
          Please select a business from the search results.
        </p>
        <button
          onClick={() => navigate("/search")}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const amenities = businessData.service_options
    ? Object.entries(businessData.service_options)
        .filter(([_, value]) => value)
        .map(([key]) =>
          key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
        )
    : ["Standard Amenities"];

  const paymentMethods = businessData.payment_methods || [
    "Cash",
    "Card",
    "UPI",
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="h-5 w-5 text-yellow-400 fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-5 w-5 text-yellow-400 fill-current opacity-50"
        />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="flex flex-col bg-gray-50">
      <div className="pt-20 bg-black">
        <NavBar />
      </div>

      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden bg-gray-900">
        <img
          src={businessData.thumbnail}
          alt={businessData.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/1200x800.png?text=Business+Image";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-4">
                {businessData.title}
              </h1>
              <p className="text-xl text-white/90">
                {businessData.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-full">
                <Star className="h-5 w-5 text-gray-700 mr-2" />
                <span className="font-medium text-gray-700">
                  {averageRating || "N/A"} ({totalReviews || "0"} reviews)
                </span>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-gray-700 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Hours
                    </h3>
                    <p className="text-gray-600">{businessData.hours}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      Open Now
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-gray-700 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Location
                    </h3>
                    <p className="text-gray-600">{businessData.address}</p>
                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(
                        businessData.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <span>Get Directions</span>
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="bg-gray-100 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <Phone className="h-8 w-8 text-gray-700" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Contact
                    </h3>
                    <p className="text-2xl font-medium text-gray-900">
                      {businessData.phone}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <a
                    href={`tel:${businessData.phone}`}
                    className="flex-1 bg-gray-900 text-white py-3 rounded-lg text-center hover:bg-gray-800 transition-colors"
                  >
                    Call Now
                  </a>
                  <button className="flex-1 bg-white border border-gray-900 text-gray-900 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    Message
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  We Offer
                </h3>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities / Payment / Signature */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Facilities</h3>
            <ul className="space-y-3">
              {amenities.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-600"
                >
                  <CheckCircle className="h-5 w-5 text-gray-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Signature Offers</h3>
            <div className="space-y-4">
              <div className="pb-2 border-b border-gray-100">
                <h4 className="font-medium text-gray-900">Special Discount</h4>
                <p className="text-sm text-gray-600">
                  Mention this listing for 10% off
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Payment Options</h3>
            <div className="flex flex-wrap gap-4">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-gray-700"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section id="map" className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Our Location
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                businessData.address
              )}&output=embed`}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="bg-gray-100"
              title="Business Location"
            ></iframe>
          </div>
        </section>

        {/* Ratings Summary Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Customer Ratings
            </h2>
            {averageRating > 0 && (
              <div className="flex items-center">
                {renderStars(averageRating)}
                <span className="ml-2 text-gray-700 font-medium">
                  {averageRating.toFixed(1)} ({totalReviews || "0"} reviews)
                </span>
              </div>
            )}
          </div>

          {loadingReviews && (
            <div className="text-center py-8">
              <div className="inline-flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
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
                <span>Loading rating information...</span>
              </div>
            </div>
          )}
        </section>

        {/* Photo Gallery */}
        {businessData.photos && businessData.photos.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Photo Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {businessData.photos.slice(0, 8).map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={photo}
                    alt={`${businessData.title} - Photo ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x300.png?text=Photo+Not+Available";
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <ReviewsComponent businessName={businessData.title} />
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default BusinessComponent;
