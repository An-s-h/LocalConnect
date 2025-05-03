import { useUser } from "../Contexts/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Star,
  MapPin,
  LoaderCircle,
  Image,
  Info,
  Clock,
  CreditCard,
  Wifi,
  ParkingCircle,
  Utensils,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecommendedBusinesses = () => {
  const { firebaseUser } = useUser();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        if (firebaseUser) {
          const response = await axios.post(
            "https://local-connect-one.vercel.app/api/businesses/recommendations",
            {
              firebaseID: firebaseUser.uid,
            }
          );
          setBusinesses(response.data);
        } else {
          const response = await fetch(
            "https://local-connect-one.vercel.app/api/businesses/"
          );
          const data = await response.json();
          console.log(data);
          setBusinesses(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [firebaseUser]);

  const handleBusinessClick = (business) => {
    const businessData = {
      title: business.name || "Unknown Business",
      type: business.category || "Business",
      address: business.location || "Address not available",
      phone: business.phoneNumber || "Phone not available",
      rating: business.rating || 0,
      reviews: business.reviews || 0,
      thumbnail:
        business.photos?.[0] ||
        "https://dummyimage.com/800x400/cccccc/000000&text=Business+Image",
      hours: business.hours || "Hours not available",
      description:
        business.description ||
        `${business.name} - ${business.category || "Business"}`,
      payment_methods: business.paymentMethods || ["Cash", "Card", "UPI"],
      amenities: business.amenities || [],
      specialties: business.specialties || [],
      service_options: business.service_options || {},
      place_id: business._id || Math.random().toString(36).substring(7),
      photos: business.photos || [],
      coordinates: business.coordinates || null,
    };

    navigate(
      `/business/${
        business._id || encodeURIComponent(business.name || "unknown")
      }`,
      {
        state: { businessData },
      }
    );
  };

  const renderServiceIcons = (serviceOptions) => {
    if (!serviceOptions) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-1">
        {serviceOptions.delivery && (
          <span className="text-xs flex items-center text-gray-600">
            <ShoppingBag className="w-3 h-3 mr-1" /> Delivery
          </span>
        )}
        {serviceOptions.takeaway && (
          <span className="text-xs flex items-center text-gray-600">
            <Utensils className="w-3 h-3 mr-1" /> Takeaway
          </span>
        )}
        {serviceOptions.free_wifi && (
          <span className="text-xs flex items-center text-gray-600">
            <Wifi className="w-3 h-3 mr-1" /> WiFi
          </span>
        )}
        {serviceOptions.parking && (
          <span className="text-xs flex items-center text-gray-600">
            <ParkingCircle className="w-3 h-3 mr-1" /> Parking
          </span>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="flex flex-col items-center space-y-4">
          <LoaderCircle className="animate-spin w-12 h-12 text-indigo-600" />
          <p className="text-gray-600 text-lg text-center">
            Loading recommended businesses...
          </p>
        </div>
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto mt-16 text-center px-4">
        <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-white border border-dashed border-gray-300">
          <Image className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700">
            No recommended businesses found
          </h3>
          <p className="text-gray-500 mt-1 text-sm">
            Check back later for updates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-8 md:py-12 px-4 sm:px-6">
      <div className="text-center mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          🌟 Recommended for You
        </h2>
        <p className="text-gray-600 mx-auto text-sm sm:text-base">
          Based on your preferences, we think you'll love these businesses.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {businesses.map((business) => (
          <div
            key={business._id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-indigo-100 cursor-pointer flex flex-col"
          >
            {/* Image Section */}
            <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-xl">
              {business.photos?.length > 0 ? (
                <img
                  src={business.photos[0]}
                  alt={business.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onClick={() => handleBusinessClick(business)}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center bg-gray-50"
                  onClick={() => handleBusinessClick(business)}
                >
                  <Image className="w-14 h-14 text-gray-400" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/90 via-white/40" />
            </div>

            {/* Business Content */}
            <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 flex-grow flex flex-col">
              <div className="flex items-start justify-between">
                <h2
                  className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer"
                  onClick={() => handleBusinessClick(business)}
                >
                  {business.name}
                </h2>
                <span className="text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-indigo-100 text-indigo-700">
                  {business.category}
                </span>
              </div>

              <div className="space-y-2 flex-grow">
                {/* Address */}
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-indigo-600" />
                  <span className="text-xs sm:text-sm">
                    {business.location}
                  </span>
                </div>

                {/* Hours */}
                {business.hours && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-indigo-600" />
                    <span className="text-xs sm:text-sm">{business.hours}</span>
                  </div>
                )}

                {/* Payment Methods */}
                {business.paymentMethods?.length > 0 && (
                  <div className="flex items-center text-gray-600">
                    <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-indigo-600" />
                    <span className="text-xs sm:text-sm">
                      {business.paymentMethods.join(", ")}
                    </span>
                  </div>
                )}

                {/* Description */}
                <div className="flex items-start text-gray-600">
                  <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 text-gray-500 mt-0.5" />
                  <p className="text-xs sm:text-sm line-clamp-2">
                    {business.description || "No description available."}
                  </p>
                </div>

                {/* Service Options */}
                {business.service_options &&
                  renderServiceIcons(business.service_options)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedBusinesses;
