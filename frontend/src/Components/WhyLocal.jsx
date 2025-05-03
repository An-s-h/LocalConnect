import { Building, ShieldCheck, Users } from "lucide-react";

export default function WhyLocal() {
  return (
    <div className="bg-gradient-to-b fgray-50rom- to-white pb-16 pt-5">
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 text-center">
        {/* Section Header */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Discover the benefits of choosing local businesses and supporting your community.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Local Expertise Card */}
          <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Local Expertise
            </h3>
            <p className="text-gray-600">
              We connect you with trusted local businesses in your community.
            </p>
          </div>

          {/* Verified Listings Card */}
          <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Verified Listings
            </h3>
            <p className="text-gray-600">
              Every business is vetted to ensure quality and reliability.
            </p>
          </div>

          {/* Community Focus Card */}
          <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Community Focus
            </h3>
            <p className="text-gray-600">
              Supporting local businesses to grow and thrive together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}