// src/components/FeaturedBusinesses.js
import React, { useEffect, useState } from "react";
import { Star, MapPin, LoaderCircle, Image, Info } from "lucide-react";

const FeaturedBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  // Fetch 5 featured businesses from API
  const fetchBusinesses = async () => {
    try {
      const response = await fetch(
        "https://local-connect-one.vercel.app/api/businesses/"
      );
      const data = await response.json();
      setBusinesses(data.slice(0, 4)); // Get only 5
    } catch (error) {
      console.error("Error fetching featured businesses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <LoaderCircle className="animate-spin w-12 h-12 text-indigo-600" />
          <p className="text-gray-600 text-lg">
            Loading featured businesses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
          🌟 Featured Local Spots
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the best local businesses in your community.
        </p>
      </div>

      {/* Businesses Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {businesses.map((business) => (
          <div
            key={business._id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-indigo-100"
          >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden rounded-t-xl">
              {business.photos?.length > 0 ? (
                <img
                  src={business.photos[0]}
                  alt={business.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <Image className="w-14 h-14 text-gray-400" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/90 via-white/40" />
            </div>

            {/* Business Content */}
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {business.name}
                </h2>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
                  {business.category}
                </span>
              </div>

              <div className="space-y-2.5">
                {/* Address */}
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-indigo-600" />
                  <span className="text-sm">{business.location}</span>
                </div>

                {/* Description */}
                <div className="flex items-start text-sm text-gray-600">
                  <Info className="h-4 w-4 mr-1 text-gray-500 mt-0.5" />
                  <p className="line-clamp-2">
                    {business.description || "No description available."}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium text-gray-900">
                    {business.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No businesses available */}
      {businesses.length === 0 && (
        <div className="max-w-7xl mx-auto mt-16 text-center">
          <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-white border border-dashed border-gray-300">
            <Image className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">
              No featured businesses available
            </h3>
            <p className="text-gray-500 mt-1 text-sm">
              Please check back later for updates.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedBusinesses;
