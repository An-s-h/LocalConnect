import React from "react";
import { ShoppingBag, Star, ShieldCheck ,AlertTriangle ,Clock} from "lucide-react";

const trendingDeals = [
  {
    title: "Family Restaurant Feast Deal",
    description: "20% off on family combos at local favorite eateries",
    imgUrl: "https://www.ohindia.co.uk/storage/ckeditor/early-bird-offer-ohindia.jpeg",
    link: "#",
    badge: "",
  },
  {
    title: "Salon & Spa Package",
    description: "Haircut + facial combo at premium local salons",
    imgUrl: "https://pbs.twimg.com/media/DWNlCcSU0AEP1xr?format=jpg&name=4096x4096",
    link: "#",
    badge: "",
  },
  {
    title: "Home Cleaning Special",
    description: "3hr deep cleaning session with trusted local services",
    imgUrl: "https://d168jcr2cillca.cloudfront.net/uploadimages/coupons/11099-Infinite_Xtensions_Pune_Coupon_1.jpg",
    link: "#",
    badge: "",
  },
  {
    title: "Fitness Center Pass",
    description: "1-month unlimited access to top-rated local gyms",
    imgUrl: "https://i1.wp.com/www.scriberr.in/wp-content/uploads/2020/12/scriberr-app-banner-500-500.jpg?fit=500%2C500&",
    link: "#",
    badge: "",
  },
];

const TrendingDeals = () => {
  return (
    <section className="bg-white pb-12">
       <div className="bg-gray-100 py-3   mb-7">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <AlertTriangle className="h-4 w-4 text-gray-700" />
          <span className="text-gray-900">LIMITED-TIME LOCAL OFFERS</span>
          <Clock className="h-4 w-4 text-gray-700" />
          <span className="text-gray-600">Shop now to support your community businesses!</span>
        </div>
      </div>
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
          Community Business Highlights
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover exclusive deals from trusted local businesses in your community.
        </p>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto">
        {trendingDeals.map((deal, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            {/* Badge */}
            {deal.badge && (
              <div className="absolute top-2 right-2 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                {deal.badge}
              </div>
            )}

            {/* Image */}
            <div className="relative h-48 overflow-hidden rounded-t-xl">
              <img
                src={deal.imgUrl}
                alt={deal.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {deal.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{deal.description}</p>

              {/* Rating and CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium text-sm text-gray-900">4.1</span>
                  <span className="text-gray-500 text-sm ml-1">(10)</span>
                </div>
                <a
                  href={deal.link}
                  className="flex items-center text-gray-900 hover:text-gray-700 transition-colors"
                >
                  <span className="text-sm font-medium mr-2">Claim Offer</span>
                  <ShoppingBag className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
     
      {/* Trust Badges */}
    </section>
  );
};

export default TrendingDeals;