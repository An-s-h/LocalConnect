import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Button } from "@mui/material";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const LocalSearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Extract query from URL when component mounts or URL changes
    const searchParams = new URLSearchParams(location.search);
    const urlQuery = searchParams.get('q');
    
    if (urlQuery) {
      setSearchQuery(decodeURIComponent(urlQuery));
      fetchResults(decodeURIComponent(urlQuery));
    }
  }, [location.search]);

  const fetchResults = async (query) => {
    if (!query?.trim()) {
      setError("Please enter a search query");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get("http://localhost:8000/api/local-search", {
        params: { query, location: "India" },
      });
      setSearchData(response.data);
    } catch (err) {
      console.error("Error fetching results:", err);
      setError(err.response?.data?.error || "Failed to fetch results");
      setSearchData(null);
    }
    setLoading(false);
  };

  const handleNewSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const renderServiceOptions = (options) => {
    if (!options) return null;
    
    return (
      <div className="mt-2 flex flex-wrap gap-1">
        {options.dine_in && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Dine-in</span>}
        {options.takeaway && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Takeaway</span>}
        {options.delivery && <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Delivery</span>}
        {options.drive_through && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Drive-through</span>}
      </div>
    );
  };

  const renderMapEmbed = (coordinates) => {
    if (!coordinates?.latitude || !coordinates?.longitude) return null;
    
    const mapUrl = `https://maps.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}&z=15&output=embed`;
    
    return (
     
      <div className="mt-3 h-40 w-full rounded-lg overflow-hidden">
        <iframe
          title="Location Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={mapUrl}
          className="border-0"
        ></iframe>
      </div>
    );
  };

  return (
    <>
    <div className="bg-black h-20"></div>
    <NavBar/>
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Search Box at Top */}
        <div className="max-w-3xl mx-auto bg-white p-4 md:p-6 rounded-xl shadow-md mb-8">
          <form onSubmit={handleNewSearch} className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex-1">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search for businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon 
                      className="text-gray-400 mr-2" 
                      sx={{ fontSize: 28 }}
                    />
                  ),
                  sx: {
                    borderRadius: "12px",
                    height: 56,
                    fontSize: "1.1rem",
                  },
                }}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              sx={{
                height: 56,
                borderRadius: "12px",
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                px: 4,
                py: 1.5,
              }}
            >
              Search
            </Button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center my-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2">Fetching results...</p>
          </div>
        )}

        {/* Search Metadata */}
        {searchData?.search_metadata && (
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-2">Search Information</h2>
            <p className="text-sm text-gray-600">
              Showing results for "{searchData.search_parameters.q}" in {searchData.search_parameters.location_used}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Processed at: {new Date(searchData.search_metadata.processed_at).toLocaleString()}
            </p>
          </div>
        )}

        {/* Results Grid */}
        {searchData?.local_results && (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {searchData.local_results.map((place) => (
              <div
                key={place.place_id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
              >
                {/* Place Image */}
                <div className="relative h-48">
                  <img
                    src={place.thumbnail || "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={place.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h2 className="text-white font-bold text-lg">{place.title}</h2>
                    <p className="text-white/90 text-sm">{place.type}</p>
                  </div>
                  {place.position && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      #{place.position}
                    </span>
                  )}
                </div>

                {/* Place Details */}
                <div className="p-4 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      {place.rating && (
                        <div className="flex items-center">
                          <span className="text-yellow-500 font-bold">{place.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({place.reviews || 0} reviews)</span>
                        </div>
                      )}
                      {place.price && (
                        <p className="text-gray-700 mt-1">{place.price}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mt-2">{place.address}</p>
                  
                  {renderServiceOptions(place.service_options)}

                  {/* Embedded Map */}
                  {renderMapEmbed(place.gps_coordinates)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default LocalSearchPage;