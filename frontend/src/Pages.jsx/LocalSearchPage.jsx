import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import SearchBox from "../Components/LocalSearch/SearchBox";
import SearchResults from "../Components/LocalSearch/SearchResults";
import SearchMetadata from "../Components/LocalSearch/SearchMetadata";
import LoadingIndicator from "../Components/Common/LoadingIndicator";
import ErrorMessage from "../Components/Common/ErrorMessage";

const LocalSearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  return (
    <>
      <div className="bg-black h-20"></div>
      <NavBar/>
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <SearchBox 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleNewSearch={handleNewSearch}
          />

          {error && <ErrorMessage message={error} />}
          {loading && <LoadingIndicator />}
          
          {searchData?.search_metadata && (
            <SearchMetadata 
              query={searchData.search_parameters.q}
              location={searchData.search_parameters.location_used}
              processedAt={searchData.search_metadata.processed_at}
            />
          )}

          {searchData?.local_results && (
            <SearchResults results={searchData.local_results} />
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default LocalSearchPage;