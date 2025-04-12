import React from "react";

const ResultCard = ({ place }) => {
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">
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
        {renderMapEmbed(place.gps_coordinates)}
      </div>
    </div>
  );
};

export default ResultCard;