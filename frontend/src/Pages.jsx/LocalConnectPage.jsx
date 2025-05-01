// src/Pages.jsx/LocalConnectPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Search, MapPin, PlusCircle, Star } from "lucide-react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import LoadingIndicator from "../Components/Common/LoadingIndicator";
import ErrorMessage from "../Components/Common/ErrorMessage";

const LocalConnectPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBusiness, setNewBusiness] = useState({
    name: "",
    category: "",
    location: "",
    description: ""
  });

  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:8000/api/local-connect/search`, {
        params: { query: searchQuery }
      });
      setSearchResults(response.data);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.response?.data?.message || "Failed to search businesses");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const handleAddBusiness = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/local-connect/businesses", newBusiness);
      setSearchResults(prev => [...prev, response.data]);
      setShowAddForm(false);
      setNewBusiness({
        name: "",
        category: "",
        location: "",
        description: ""
      });
    } catch (err) {
      console.error("Add business error:", err);
      setError(err.response?.data?.message || "Failed to add business");
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessClick = (business) => {
    navigate(`/local-connect/review/${business._id}`, {
      state: { 
        businessData: {
          title: business.name,
          type: business.category,
          address: business.location,
          description: business.description,
          place_id: business._id
        }
      }
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black h-20"></div>
      <NavBar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">LocalConnect Community</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search for local businesses or contribute by adding and reviewing places in your community.
          </p>
        </section>

        {/* Search Section */}
        <section className="mb-12">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for businesses (e.g., 'cafe in Mumbai', 'plumber near me')"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Search
            </button>
          </form>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} results` 
                : "Search for local businesses"}
            </h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              {showAddForm ? "Cancel" : "Add Business"}
            </button>
          </div>

          {showAddForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-semibold mb-4">Add a New Business</h3>
              <form onSubmit={handleAddBusiness}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name*</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newBusiness.name}
                      onChange={(e) => setNewBusiness({...newBusiness, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newBusiness.category}
                      onChange={(e) => setNewBusiness({...newBusiness, category: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newBusiness.location}
                      onChange={(e) => setNewBusiness({...newBusiness, location: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newBusiness.description}
                      onChange={(e) => setNewBusiness({...newBusiness, description: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Business"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {error && <ErrorMessage message={error} />}
          {loading && <LoadingIndicator />}
        </section>

        {/* Results Section */}
        <section>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((business) => (
                <div 
                  key={business._id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleBusinessClick(business)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{business.name}</h3>
                      {business.avgRating && (
                        <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                          {renderStars(business.avgRating)}
                          <span className="ml-1 text-sm text-gray-700">{business.avgRating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-blue-600 mb-2">{business.category}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{business.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{business.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {business.reviewCount || 0} reviews
                      </span>
                      <button 
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBusinessClick(business);
                        }}
                      >
                        Add Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !loading && searchQuery && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">
                No businesses found for "{searchQuery}". Would you like to add it to our community?
              </p>
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setNewBusiness(prev => ({
                    ...prev,
                    name: searchQuery.split(' in ')[0] || searchQuery,
                    location: searchQuery.split(' in ')[1] || ""
                  }));
                }}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add This Business
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LocalConnectPage;