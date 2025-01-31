import React from "react";
import SearchBox from "./SearchBox";
import ServiceCategories from "./ServiceCategories";

const Hero = () => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center pt-16 sm:pt-24 pb-32 sm:pb-48">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-gray-900 z-0"
        style={{
          backgroundImage: `url(https://mydukaan.io/blog/wp-content/uploads/Rural-Handicrafts.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-1" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">
          Discover Local Treasures
        </h1>
        <p className="text-lg sm:text-xl text-gray-100 font-medium max-w-md sm:max-w-2xl mx-auto mt-3 sm:mt-4">
          Connect with trusted businesses and essential services in your neighborhood
        </p>

        {/* Search Box */}
        <div className="w-full max-w-sm sm:max-w-4xl mx-auto rounded-xl p-4 mt-6 sm:mt-8">
          <SearchBox />
        </div>
      </div>

      {/* Service Categories Section */}
      <ServiceCategories />
    </div>
  );
};

export default Hero;
