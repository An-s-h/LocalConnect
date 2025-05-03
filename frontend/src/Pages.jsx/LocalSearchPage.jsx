// src/Pages.jsx/LocalSearchPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import SearchMetadata from "../Components/LocalSearch/SearchMetadata";
import LoadingIndicator from "../Components/Common/LoadingIndicator";
import ErrorMessage from "../Components/Common/ErrorMessage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Something went wrong displaying this content.
        </div>
      );
    }

    return this.props.children;
  }
}

const LocalSearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [recsError, setRecsError] = useState(null);
  const [searchMode, setSearchMode] = useState("api");
  const [hasSearched, setHasSearched] = useState(false);
  const [cache, setCache] = useState({});

  const normalizeString = useCallback((str) => {
    if (!str) return "";
    return str
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }, []);

  const filterRecommendations = useCallback(
    (query) => {
      if (!recommendations.length) return;

      const normalizedQuery = normalizeString(query);
      if (!normalizedQuery.trim()) {
        setFilteredRecommendations(recommendations.filter((b) => b.isApproved));
        return;
      }

      const queryParts = normalizedQuery.split(" in ");
      let searchTerm, locationTerm;

      if (queryParts.length > 1) {
        searchTerm = queryParts[0].trim();
        locationTerm = queryParts[1].trim();
      } else {
        const words = normalizedQuery.split(" ");
        if (words.length > 1) {
          searchTerm = words.slice(0, -1).join(" ").trim();
          locationTerm = words[words.length - 1].trim();
        } else {
          searchTerm = normalizedQuery.trim();
          locationTerm = "";
        }
      }

      const filtered = recommendations.filter((business) => {
        if (!business.isApproved) return false;

        const normalizedFields = {
          name: normalizeString(business.name),
          category: normalizeString(business.category),
          location: normalizeString(business.location),
          description: normalizeString(business.description),
        };

        const fullQueryMatch =
          normalizedFields.name.includes(normalizedQuery) ||
          normalizedFields.category.includes(normalizedQuery) ||
          normalizedFields.location.includes(normalizedQuery) ||
          normalizedFields.description.includes(normalizedQuery);

        const splitQueryMatch =
          (normalizedFields.name.includes(searchTerm) ||
            normalizedFields.category.includes(searchTerm) ||
            normalizedFields.description.includes(searchTerm)) &&
          (locationTerm === "" ||
            normalizedFields.location.includes(locationTerm));

        return fullQueryMatch || splitQueryMatch;
      });

      setFilteredRecommendations(filtered);
    },
    [recommendations, normalizeString]
  );

  const fetchRecommendations = useCallback(async () => {
    setLoadingRecs(true);
    setRecsError(null);
    try {
      const response = await axios.get(
        "https://local-connect-one.vercel.app/api/businesses"
      );
      setRecommendations(response.data);
      setFilteredRecommendations(response.data.filter((b) => b.isApproved));
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setRecsError(
        err.response?.data?.message || "Failed to fetch recommendations"
      );
      setRecommendations([]);
      setFilteredRecommendations([]);
    } finally {
      setLoadingRecs(false);
    }
  }, []);

  const fetchResults = useCallback(
    async (query) => {
      if (!query?.trim()) {
        setError("Please enter a search query");
        return;
      }

      if (cache[query]) {
        setSearchData(cache[query]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://local-connect-one.vercel.app/api/local-search",
          {
            params: { query, location: "India" },
          }
        );

        const transformedData = {
          ...response.data,
          local_results:
            response.data.local_results?.map((business) => ({
              ...business,
              name: business.title || business.name || "Unknown Business",
              location: business.address || "Location not available",
              phoneNumber: business.phone || "Phone not available",
              rating: business.rating || 0,
              reviews: business.reviews || 0,
              paymentMethods: business.payment_methods || [
                "Cash",
                "Card",
                "UPI",
              ],
              photos: business.photos || [],
              coordinates: business.coordinates || null,
              isApproved: true,
            })) || [],
        };

        setSearchData(transformedData);
        setCache((prev) => ({ ...prev, [query]: transformedData }));
      } catch (err) {
        console.error("Error fetching results:", err);
        setError(err.response?.data?.error || "Failed to fetch results");
        setSearchData(null);
      } finally {
        setLoading(false);
      }
    },
    [cache]
  );

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        setHasSearched(true);
        if (searchMode === "api") {
          fetchResults(searchQuery);
        } else {
          filterRecommendations(searchQuery);
        }
      } else {
        if (searchMode === "database") {
          setFilteredRecommendations(
            recommendations.filter((b) => b.isApproved)
          );
        }
      }
    },
    [
      searchQuery,
      searchMode,
      navigate,
      fetchResults,
      filterRecommendations,
      recommendations,
    ]
  );

  const handleBusinessClick = useCallback(
    (business) => {
      const businessData = {
        title: business.title || business.name || "Unknown Business",
        type: business.category || "Business",
        address:
          business.location || business.address || "Address not available",
        phone: business.phoneNumber || business.phone || "Phone not available",
        rating: business.rating || 0,
        reviews: business.reviews || 0,
        thumbnail:
          business.photos?.[0] ||
          business.thumbnail ||
          "https://dummyimage.com/800x400/cccccc/000000&text=Business+Image",
        hours: business.hours || "Hours not available",
        description:
          business.description ||
          `${business.title || business.name} - ${
            business.category || "Business"
          }`,
        payment_methods: business.paymentMethods || ["Cash", "Card", "UPI"],
        amenities: business.amenities || [],
        specialties: business.specialties || [],
        service_options: business.service_options || {},
        place_id:
          business._id ||
          business.place_id ||
          Math.random().toString(36).substring(7),
        photos: business.photos || [],
        coordinates: business.coordinates || null,
      };

      navigate(
        `/business/${
          business._id ||
          business.place_id ||
          encodeURIComponent(business.title || "unknown")
        }`,
        {
          state: { businessData },
        }
      );
    },
    [navigate]
  );

  const BusinessCard = React.memo(({ business, onClick }) => {
    const getImageUrl = useCallback((photo) => {
      if (!photo)
        return "https://dummyimage.com/300x200/cccccc/000000&text=No+Image";

      if (photo.startsWith("/uploads/")) {
        return `http://localhost:8000${photo}`;
      }

      if (photo.startsWith("http")) {
        return photo;
      }

      return "https://dummyimage.com/300x200/cccccc/000000&text=No+Image";
    }, []);

    const formatPaymentMethods = useCallback((methods) => {
      if (!methods || methods.length === 0) return "Cash, Card, UPI";
      return methods.join(", ");
    }, []);

    const formatRating = useCallback((rating, reviews) => {
      if (!rating || isNaN(rating)) return "N/A";
      return `⭐ ${rating.toFixed(1)}${reviews ? ` (${reviews} reviews)` : ""}`;
    }, []);

    const formatPhoneNumber = useCallback((phone) => {
      if (!phone || phone === "Phone not available") return "📞 Not available";
      return `📞 ${phone}`;
    }, []);

    const fallbackImage =
      "https://dummyimage.com/300x200/cccccc/000000&text=No+Image";

    return (
      <div
        onClick={() => onClick(business)}
        className="cursor-pointer bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition h-full flex flex-col"
      >
        <div className="relative pb-[75%] mb-4 overflow-hidden rounded-md">
          <img
            src={getImageUrl(business.photos?.[0] || business.thumbnail)}
            alt={business.name || "Business image"}
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={(e) => {
              if (e.target.src !== fallbackImage) {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }
            }}
            loading="lazy"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-bold line-clamp-2">
            {business.name || "Unknown Business"}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-1">
            {business.location || "Location not available"}
          </p>
          <div className="mt-2 text-yellow-600 font-semibold">
            {formatRating(business.rating, business.reviews)}
          </div>
          <p className="text-sm mt-2">
            {formatPhoneNumber(business.phoneNumber || business.phone)}
          </p>
          <p className="text-sm text-blue-600 mt-1">
            💳 {formatPaymentMethods(business.paymentMethods)}
          </p>
        </div>
      </div>
    );
  });

  const SearchResults = React.memo(({ results, onBusinessClick }) => (
    <ErrorBoundary>
      <div className="grid gap-6 mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {results.map((business, index) => (
          <BusinessCard
            key={`search-${business._id || business.place_id || index}`}
            business={business}
            onClick={onBusinessClick}
          />
        ))}
      </div>
    </ErrorBoundary>
  ));

  const RecommendationsSection = React.memo(() => {
    if (!hasSearched) return null;

    if (loadingRecs) {
      return (
        <div className="text-center py-8">
          <LoadingIndicator />
          <p className="mt-2">Loading recommendations...</p>
        </div>
      );
    }

    if (recsError) {
      return (
        <div className="text-center py-8">
          <ErrorMessage message={recsError} />
        </div>
      );
    }

    return (
      <>
        {filteredRecommendations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {searchQuery.trim() === ""
                ? "No recommendations available"
                : `No recommendations found for "${searchQuery}"`}
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              Showing {filteredRecommendations.length} recommendation
              {filteredRecommendations.length !== 1 ? "s" : ""}
              {searchQuery.trim() !== "" && ` for "${searchQuery}"`}
            </p>
            <SearchResults
              results={filteredRecommendations}
              onBusinessClick={handleBusinessClick}
            />
          </>
        )}
      </>
    );
  });

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q");
    if (query) {
      setSearchQuery(query);
      setHasSearched(true);
      if (searchMode === "api") {
        fetchResults(query);
      } else {
        filterRecommendations(query);
      }
    }
  }, [location.search, searchMode, fetchResults, filterRecommendations]);

  return (
    <>
      <div className="bg-black h-20"></div>
      <NavBar />
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search for businesses (e.g., 'cafe', 'restaurant in dehradun')..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Search
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg transition ${
                    searchMode === "api"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => {
                    setSearchMode("api");
                    if (searchQuery.trim()) {
                      setHasSearched(true);
                      fetchResults(searchQuery);
                    }
                  }}
                >
                  Web Search
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg transition ${
                    searchMode === "database"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => {
                    setSearchMode("database");
                    if (searchQuery.trim()) {
                      setHasSearched(true);
                      filterRecommendations(searchQuery);
                    } else {
                      setFilteredRecommendations(
                        recommendations.filter((b) => b.isApproved)
                      );
                    }
                  }}
                >
                  Our Recommendations
                </button>
              </div>
            </form>
          </div>

          {searchMode === "api" && searchData?.search_metadata && (
            <SearchMetadata
              query={searchData.search_parameters.q}
              location={searchData.search_parameters.location_used}
              processedAt={searchData.search_metadata.processed_at}
            />
          )}

          {searchMode === "api" ? (
            <>
              {error && <ErrorMessage message={error} />}
              {loading && <LoadingIndicator />}
              {searchData?.local_results ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-6">
                    {searchData.local_results.length} Search Results
                  </h2>
                  <SearchResults
                    results={searchData.local_results}
                    onBusinessClick={handleBusinessClick}
                  />
                </>
              ) : (
                !loading &&
                !error && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      {searchQuery.trim() === ""
                        ? "Enter a search term to find businesses"
                        : "No results found"}
                    </p>
                  </div>
                )
              )}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-6">
                {searchQuery.trim() === ""
                  ? "Our Recommendations"
                  : `Searching Recommendations: "${searchQuery}"`}
              </h2>
              <RecommendationsSection />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LocalSearchPage;
