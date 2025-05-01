// src/Pages.jsx/LocalConnectReviewPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MapPin, Star, ChevronLeft } from "lucide-react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import ReviewsComponent from "../Components/ReviewsComponent";

const LocalConnectReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [businessData, setBusinessData] = useState(location.state?.businessData || null);
  const [loading, setLoading] = useState(!location.state?.businessData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location.state?.businessData) {
      const fetchBusiness = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:8000/api/local-connect/businesses/${id}`);
          setBusinessData({
            title: response.data.name,
            type: response.data.category,
            address: response.data.location,
            description: response.data.description,
            place_id: response.data._id,
            rating: response.data.avgRating,
            reviews: response.data.reviewCount
          });
        } catch (err) {
          console.error("Fetch business error:", err);
          setError(err.response?.data?.message || "Failed to load business");
        } finally {
          setLoading(false);
        }
      };
      fetchBusiness();
    }
  }, [id, location.state]);

  const renderStars = (rating) => {
    if (!rating) return null;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`h-5 w-5 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!businessData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Business information not available
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go 
          </button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black h-20"></div>
      <NavBar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back to search</span>
        </button>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{businessData.title}</h1>
              <p className="text-blue-600 font-medium mb-3">{businessData.type}</p>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{businessData.address}</span>
              </div>
              
              {businessData.rating && (
                <div className="flex items-center mb-4">
                  {renderStars(businessData.rating)}
                  <span className="ml-2 text-gray-700">
                    {businessData.rating.toFixed(1)} ({businessData.reviews || 0} reviews)
                  </span>
                </div>
              )}
              
              <p className="text-gray-600">{businessData.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <ReviewsComponent 
            businessName={businessData.title} 
            businessId={businessData.place_id}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LocalConnectReviewPage;