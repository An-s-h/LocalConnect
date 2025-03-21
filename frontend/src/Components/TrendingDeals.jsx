import React from "react";
import { Star, AlertTriangle, Clock } from "lucide-react";

const trendingServices = [
  {
    title: "Family Restaurant Feast Deal",
    description: "Explore family-friendly dining at top local eateries.",
    imgUrl: "https://www.ohindia.co.uk/storage/ckeditor/early-bird-offer-ohindia.jpeg",
  },
  {
    title: "Salon & Spa Package",
    description: "Premium salon and spa packages available nearby.",
    imgUrl: "https://pbs.twimg.com/media/DWNlCcSU0AEP1xr?format=jpg&name=4096x4096",
  },
  {
    title: "Home Cleaning Special",
    description: "Deep cleaning services by trusted local providers.",
    imgUrl: "https://d168jcr2cillca.cloudfront.net/uploadimages/coupons/11099-Infinite_Xtensions_Pune_Coupon_1.jpg",
  },
  {
    title: "Fitness Center Pass",
    description: "Unlimited access to nearby gyms and fitness centers.",
    imgUrl: "https://i1.wp.com/www.scriberr.in/wp-content/uploads/2020/12/scriberr-app-banner-500-500.jpg?fit=500%2C500&",
  },
];

const TrendingDeals = () => {
  return (
    <section className="bg-white pb-12">
      {/* Info Banner */}
      <div className="bg-gray-100 py-3 mb-7">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <AlertTriangle className="h-4 w-4 text-gray-700" />
          <span className="text-gray-900">SUPPORT LOCAL BUSINESSES</span>
          <Clock className="h-4 w-4 text-gray-700" />
          <span className="text-gray-600">Explore trusted services in your area.</span>
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
          Top Local Services Near You
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover and engage with quality services from your neighborhood.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto">
        {trendingServices.map((service, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden rounded-t-xl">
              <img
                src={service.imgUrl}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>

              {/* Rating */}
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium text-sm text-gray-900">4.5</span>
                <span className="text-gray-500 text-sm ml-1">(15 reviews)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingDeals;
