import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Phone, CreditCard, Star, ArrowUpRight, CheckCircle } from "lucide-react";
import SwipeCarousel from "../Components/SwipeCarousel";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

function BusinessComponent() {
  const businessInfo = {
    name: "Café Greek Orchid",
    tagline: "Organic Eats & Artisan Coffee",
    description: "Award-winning farm-to-table dining experience with locally sourced ingredients and sustainable practices. Specializing in artisanal coffee blends and healthy breakfast/lunch options.",
    hours: "Mon-Sun: 7:00 AM - 9:00 PM",
    phone: "+91 8006027270",
    address: "Indian Oil Pump, 13, EC Road, opposite Hotel Lemarq, near Survey Chouk, Irrigation Colony, Karanpur, Dehradun, Uttarakhand 248001",
    paymentMethods: ["Cash","Visa", "Mastercard", "Swiggy Pay", "Zomato Pay"],
    amenities: ["Free WiFi", "Outdoor Seating", "Pet-Friendly", "Accessible"],
    specialties: ["Cold Brew Bar", "Vegetarian/Vegan Options", "Gluten-Free Bakery"]
  };

  return (
    <div className="flex flex-col bg-gray-50">
      <div className="pt-9 bg-black">
        <NavBar/>
      </div>
      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <SwipeCarousel />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-4">{businessInfo.name}</h1>
              <p className="text-xl text-white/90">{businessInfo.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Business Info Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Rating Badge */}
              <div className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-full">
                <Star className="h-5 w-5 text-gray-700 mr-2" />
                <span className="font-medium text-gray-700">4.9 (1.2k reviews)</span>
              </div>

              {/* Business Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-gray-700 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Hours</h3>
                    <p className="text-gray-600">{businessInfo.hours}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      Open Now
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-gray-700 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">{businessInfo.address}</p>
                    <a 
                      href="#map" 
                      className="inline-flex items-center mt-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <span>Get Directions</span>
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Contact Card */}
              <div className="bg-gray-100 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <Phone className="h-8 w-8 text-gray-700" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
                    <p className="text-2xl font-medium text-gray-900">{businessInfo.phone}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    Call Now
                  </button>
                  <button className="flex-1 bg-white border border-gray-900 text-gray-900 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    Message
                  </button>
                </div>
              </div>

              {/* Services Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">We Offer</h3>
                <div className="flex flex-wrap gap-2">
                  {businessInfo.specialties.map((item, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Sections */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Amenities Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Facilities</h3>
            <ul className="space-y-3">
              {businessInfo.amenities.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="h-5 w-5 text-gray-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Highlights */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Signature Offers</h3>
            <div className="space-y-4">
              <div className="pb-2 border-b border-gray-100">
                <h4 className="font-medium text-gray-900">Hazelnut Cold Brew</h4>
                <p className="text-sm text-gray-600">House specialty with organic cream</p>
              </div>
              <div className="pb-2 border-b border-gray-100">
                <h4 className="font-medium text-gray-900">Avocado Toast Trio</h4>
                <p className="text-sm text-gray-600">Sourdough with seasonal toppings</p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Payment Options</h3>
            <div className="flex flex-wrap gap-4">
              {businessInfo.paymentMethods.map((method, index) => (
                <div key={index} className="bg-gray-100 px-4 py-2 rounded-lg">
                  <span className="text-gray-700">{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <section id="map" className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Location</h2>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13774.303434969075!2d78.05378069684944!3d30.334579992914115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929d9291cd2a5%3A0xde89471977eaee44!2sCafe&#39;%20Greek%20Orchid!5e0!3m2!1sen!2sin!4v1739898153889!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="bg-gray-100"
            ></iframe>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Customer Experiences</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border border-gray-100 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-700 font-medium">JD</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">John Doe</p>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The best avocado toast I've ever had! The coffee is exceptional and the 
                  staff went above and beyond to accommodate our dietary needs."
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}

export default BusinessComponent;