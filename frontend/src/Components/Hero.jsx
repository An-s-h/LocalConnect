import React, { useState } from "react";
import SearchBox from "./SearchBox";
import ServiceCategories from "./ServiceCategories";

const Hero = () => {
  const [locationQuery, setLocationQuery] = useState("");
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=469c8c4c7af34d4580ffaf9690e2ffa0`
            );
            const data = await response.json();
            const locationInfo = data.features[0]?.properties;
  
            const suburb =
              locationInfo.suburb ||
              locationInfo.city_district ||
              locationInfo.neighbourhood ||
              locationInfo.locality ;
              // locationInfo.address_line1 ;
  
            const city =
              locationInfo.city || locationInfo.town || locationInfo.village;
            const state = locationInfo.state;
            const country = locationInfo.country;
  
            console.log("Suburb:", suburb);
            console.log("Full location info:", locationInfo);
  
            const location = suburb || city || state || country || "your area";
            setLocationQuery(`${location}`);
          } catch (error) {
            console.error("Error fetching location:", error);
            alert("Couldn't fetch city name from coordinates.");
          }
        },
        (err) => {
          console.warn("Geolocation error:", err.message || err);
          alert(
            "We couldn't fetch your location. Please ensure location services are enabled."
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation not supported by your browser");
    }
  };
  

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center pt-16 sm:pt-24 pb-32 sm:pb-48">
      <div
        className="absolute inset-0 bg-gray-900 z-0"
        style={{
          backgroundImage: `url(https://mydukaan.io/blog/wp-content/uploads/Rural-Handicrafts.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-1" />
      <div className="relative z-10 text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">
          Discover Local Treasures
        </h1>
        <p className="text-lg sm:text-xl text-gray-100 font-medium max-w-md sm:max-w-2xl mx-auto mt-3 sm:mt-4">
          Connect with trusted businesses and essential services in your
          neighborhood
        </p>

        {/* Location Button (Updated) */}

        {/* Search Box */}
        <div className="w-full max-w-sm sm:max-w-4xl mx-auto rounded-xl p-4 mt-6 sm:mt-8">
          <SearchBox locationQuery={locationQuery} />
        </div>
        <button
          onClick={detectLocation}
          className="mt-6 px-6 py-2 rounded-xl border border-white/30 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 text-lg font-semibold"
        >
          Detect My Location
        </button>
      </div>

      <ServiceCategories />
    </div>
  );
};

export default Hero;
