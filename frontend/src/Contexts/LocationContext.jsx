import React, { createContext, useState, useEffect } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState("");
  const [isFetchingLocation, setIsFetchingLocation] = useState(false); // 👈 new

  useEffect(() => {
    const savedLocation = JSON.parse(localStorage.getItem("userLocation"));
    if (savedLocation?.location) {
      setLocation(savedLocation.location);
    } else {
      detectLocation();
    }
  }, []);

  const detectLocation = () => {
    if (navigator.geolocation) {
      setIsFetchingLocation(true); //  show loading

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=469c8c4c7af34d4580ffaf9690e2ffa0`
            );
            const data = await response.json();
            const locationInfo = data.features[0]?.properties;

            const suburb = locationInfo.suburb || locationInfo.city_district || locationInfo.neighbourhood || locationInfo.locality;
            const city = locationInfo.city || locationInfo.town || locationInfo.village;
            const state = locationInfo.state;
            const country = locationInfo.country;

            const detectedLocation = suburb || city || state || country || "your area";
            setLocation(detectedLocation);
            localStorage.setItem("userLocation", JSON.stringify({ location: detectedLocation }));
          } catch (error) {
            console.error("Error fetching location:", error);
          } finally {
            setIsFetchingLocation(false); //  hide loading
          }
        },
        (err) => {
          console.warn("Geolocation error:", err.message || err);
          setIsFetchingLocation(false); //  hide loading
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.warn("Geolocation not supported by your browser");
    }
  };

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem("userLocation", JSON.stringify({ location: newLocation }));
  };

  return (
    <LocationContext.Provider value={{ location, updateLocation, detectLocation, isFetchingLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
