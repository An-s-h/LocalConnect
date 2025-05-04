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

    const formatHours = useCallback((hours) => {
      if (!hours) return "Hours not available";
      if (typeof hours === "string") return hours;
      return "Open today: " + hours;
    }, []);

    const fallbackImage =
      "https://dummyimage.com/300x200/cccccc/000000&text=No+Image";

    return (
      <div
        onClick={() => onClick(business)}
        className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition h-full flex flex-col group"
      >
        <div className="relative pb-[60%] overflow-hidden">
          <img
            src={getImageUrl(business.photos?.[0] || business.thumbnail)}
            alt={business.name || "Business image"}
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
            onError={(e) => {
              if (e.target.src !== fallbackImage) {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }
            }}
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-xl font-bold text-white line-clamp-2">
              {business.name || "Unknown Business"}
            </h3>
            {business.category && (
              <span className="inline-block px-2 py-1 mt-1 bg-blue-600 text-white text-xs font-semibold rounded">
                {business.category}
              </span>
            )}
          </div>
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              {business.rating ? (
                <>
                  <span className="text-yellow-500 font-bold">
                    {business.rating.toFixed(1)}
                  </span>
                  <svg
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {business.reviews > 0 && (
                    <span className="text-gray-500 text-sm">
                      ({business.reviews.toLocaleString()})
                    </span>
                  )}
                </>
              ) : (
                <div></div>
              )}
            </div>

            {business.price_level && (
              <div className="text-green-600 font-medium">
                {Array(Math.min(business.price_level, 4)).fill("₹").join("")}
              </div>
            )}
          </div>

          <div className="mb-3">
            <div className="flex items-start space-x-2">
              <svg
                className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-gray-600 text-sm line-clamp-2">
                {business.location || "Location not available"}
              </p>
            </div>

            {business.hours && (
              <div className="flex items-start space-x-2 mt-1">
                <svg
                  className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-600 text-sm">
                  {formatHours(business.hours)}
                </p>
              </div>
            )}
          </div>

          <div className="mt-auto pt-2 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {business.paymentMethods && (
                <div className="flex items-center space-x-1 text-xs bg-gray-100 px-2 py-1 rounded">
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{formatPaymentMethods(business.paymentMethods)}</span>
                </div>
              )}

              {business.service_options?.delivery && (
                <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Delivery
                </div>
              )}

              {business.service_options?.takeout && (
                <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Takeout
                </div>
              )}

              {business.service_options?.dine_in && (
                <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  Dine-in
                </div>
              )}
            </div>

            {business.phoneNumber &&
              business.phoneNumber !== "Not available" && (
                <div className="mt-2 flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>{business.phoneNumber}</span>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  });

  const SearchResults = React.memo(({ results, onBusinessClick }) => (
    <ErrorBoundary>
      <div className="grid gap-6 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Search businesses..."
                  className="flex-1 px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 md:px-6 md:py-3 bg-black text-white rounded-lg hover:bg-gray-700 transition text-sm md:text-base"
                >
                  Search
                </button>
              </div>
              <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
                <button
                  type="button"
                  className={`px-3 py-1 md:px-4 md:py-2 rounded-lg transition whitespace-nowrap text-sm md:text-base ${
                    searchMode === "api"
                      ? "bg-black text-white"
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
                  className={`px-3 py-1 md:px-4 md:py-2 rounded-lg transition whitespace-nowrap text-sm md:text-base ${
                    searchMode === "database"
                      ? "bg-black text-white"
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
                  Recommendations
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
