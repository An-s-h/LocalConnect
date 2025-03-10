import React from "react";
import { Star, MapPin, Clock } from "lucide-react";

const businesses = [
  {
    name: "Café Greek Orchid",
    type: "Cafe",
    rating: 4.8,
    image:
      "https://imgmediagumlet.lbb.in/media/2018/12/5c0e8b8eeabd9b1ed3bfb6d2_1544457102822.jpg",
    address: "13 EC-Road , Dehradun",
    hours: "7AM - 9PM",
    link: "/bc",
  },
  {
    name: "UK BEST MOBILE STORE",
    type: "Mobile Phone Repair Shop",
    rating: 4.6,
    image:
      "https://content.jdmagicbox.com/comp/dehradun/g7/9999px135.x135.180721061821.s4g7/catalogue/doon-mobile-shop-dehradun-city-dehradun-mobile-phone-dealers-da8rg8iun5.jpg",
    address: "Kalidas Marg , Dehradun",
    hours: "9AM - 10PM",
    link: "#",
  },
  {
    name: "Sunrise Bakers",
    type: "Bakery",
    rating: 4.2,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/12/cd/21/7d/entrance.jpg",
    address: "Darshan Lal Chowk , Dehradun",
    hours: "7AM - 8PM",
    link: "#",
  },
  {
    name: "Banjara Food Truck",
    type: "Chinese Restaurant",
    rating: 4.7,
    image:
      "https://content3.jdmagicbox.com/comp/dehradun/n4/9999px135.x135.220126214124.c4n4/catalogue/banjara-food-truck-rajpur-road-dehradun-food-trucks-5gkkt0a3v1.jpg",
    address: "Hathibarkala Salwala, Dehradun",
    hours: "8AM - 10PM",
    link: "#",
  },
  {
    name: "Prince Plumber service",
    type: "Plumbing Service",
    rating: 3.9,
    image:
      "https://thearchitectsdiary.com/wp-content/uploads/2022/02/Guest-Article-1-scaled.jpg",
    address: "Paltan Bazaar, Dehradun",
    hours: "8AM - 10PM",
    link: "#",
  },
];

export default function FeaturedBusinesses() {
  return (
    <section className="bg-white py-12">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
          Featured Local Spots
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the best local businesses in your community.
        </p>
      </div>

      {/* Businesses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 px-6 [width:100rem] mx-auto">
        {businesses.map((business) => (
          <a
            key={business.name}
            href={business.link}
            target=""
            rel=""
            className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 block"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden rounded-t-xl">
              <img
                src={business.image}
                alt={business.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {business.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{business.type}</p>

              {/* Rating */}
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium text-sm text-gray-900">
                  {business.rating}
                </span>
              </div>

              {/* Address */}
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                <span>{business.address}</span>
              </div>

              {/* Hours */}
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                <span>{business.hours}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
