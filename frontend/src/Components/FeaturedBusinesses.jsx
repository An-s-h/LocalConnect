import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';

const businesses = [
  {
    name: "Smart & Style Unisex Saloon",
    type: "Saloon",
    rating: 4.8,
    image: "https://lh5.googleusercontent.com/p/AF1QipPXcehf5gSlv28ZhyDOIhrpey0YJkisStBgXav2=w408-h272-k-no",
    address: "Dalanwala , Dehradun",
    hours: "10AM - 8PM",
  },
  {
    name: "UK BEST MOBILE STORE",
    type: "Mobile Phone Repair Shop",
    rating: 4.6,
    image: "https://lh5.googleusercontent.com/p/AF1QipMpiPjDBkI9VTBYOSDe8nMip8MV1_cvMauhIc0K=w408-h306-k-no",
    address: "Kalidas Marg , Dehradun",
    hours: "9AM - 10PM",
  },
  {
    name: "Serene Spa",
    type: "Wellness Center",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=200",
    address: "789 Pine Blvd",
    hours: "9AM - 7PM",
  },
  {
    name: "Bookworm's Paradise",
    type: "Bookstore & Cafe",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=200",
    address: "101 Cedar Ln",
    hours: "8AM - 10PM",
  },
  {
    name: "Bookworm's Paradise",
    type: "Bookstore & Cafe",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=200",
    address: "101 Cedar Ln",
    hours: "8AM - 10PM",
  },
];

export default function FeaturedBusinesses() {
  return (
    <section className="bg-white py-10">
      <h2 className="text-3xl text-center mb-8 text-black font-extrabold">Featured Local Spots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-6 lg:mx-60">
        {businesses.map((business) => (
          <div
            key={business.name}
            className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden group bg-gray-300 rounded-lg"
          >
            <div className="relative h-28 overflow-hidden">
              <img
                src={business.image || "/placeholder.svg"}
                alt={business.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200 ease-in-out"
              />
            </div>
            <div className="p-3">
              <h3 className="text-lg font-semibold group-hover:text-teal-600 transition-colors duration-200">
                {business.name}
              </h3>
              <p className="text-gray-600 text-sm mb-1">{business.type}</p>
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-semibold text-sm">{business.rating}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{business.address}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{business.hours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
