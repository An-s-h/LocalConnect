import React, { useState } from "react";
import {
  Shirt,
  Leaf,
  Heart,
  BellRing,
  Gift,
  Megaphone,
  Truck,
  Wrench,
  DollarSign,
  Volleyball,
  Apple,
} from "lucide-react";
import NavBar from "../Components/NavBar";

const categories = [
  { id: 1, name: "Clothing & Accessories", icon: Shirt, background: 'url("https://t3.ftcdn.net/jpg/05/97/94/02/360_F_597940292_dmaVD664ccNHMDJqi0Wv0SCSexklLyhO.jpg")' },
  { id: 2, name: "Local Eateries", icon: Apple, background: 'url("https://static.vecteezy.com/system/resources/previews/008/660/558/non_2x/organic-food-background-hand-drawn-concept-free-vector.jpg")' },
  { id: 3, name: "Salon & Spa", icon: Leaf, background: 'url("https://static.vecteezy.com/system/resources/previews/052/247/538/non_2x/spa-spa-background-with-white-orchid-flowers-and-leaves-on-blue-background-photo.jpeg")' },
  { id: 4, name: "Tutoring & Education", icon: BellRing, background: 'url("https://img.freepik.com/free-vector/hand-drawn-back-school-background_23-2149464866.jpg?semt=ais_hybrid")' },
  { id: 5, name: "Healthcare & Wellness", icon: Heart, background: 'url("https://img.freepik.com/free-vector/watercolor-medical-background_52683-162142.jpg")' },
  { id: 6, name: "Event Planning", icon: BellRing, background: 'url("https://media.istockphoto.com/id/479977238/photo/table-setting-for-an-event-party-or-wedding-reception.jpg?s=612x612&w=0&k=20&c=yIKLzW7wMydqmuItTTtUGS5cYTmrRGy0rXk81AltdTA=")' },
  { id: 7, name: "IT Services", icon: Megaphone, background: 'url("https://thumbs.dreamstime.com/b/computer-repair-engineer-pc-electronic-hardware-shop-performing-laptop-maintenance-developer-fixing-components-technology-145668303.jpg")' },
  { id: 8, name: "Home & Renovation", icon: Gift, background: 'url("https://thumbs.dreamstime.com/b/wooden-house-construction-tools-stone-pattern-background-copy-space-home-repair-concept-maintenance-renovation-161857121.jpg")' },
  { id: 9, name: "Travel & Tourism", icon: Truck, background: 'url("https://img.freepik.com/free-vector/realistic-travel-background-with-elements_52683-77784.jpg")' },
  { id: 10, name: "Automobile Services", icon: Wrench, background: 'url("https://img.freepik.com/premium-vector/auto-repair-shop-background-flat-design_98292-21181.jpg")' },
  { id: 11, name: "Financial Consulting", icon: DollarSign, background: 'url("https://img.freepik.com/free-photo/top-view-office-desk-with-growth-chart-coins_23-2148780621.jpg")' },
  { id: 12, name: "Fitness & Sports", icon: Volleyball, background: 'url("https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg")' },
  { id: 13, name: "New Category", icon: Heart, background: 'url("https://via.placeholder.com/400")' },
  { id: 14, name: "Another Category", icon: Wrench, background: 'url("https://via.placeholder.com/400")' },
  // Add more categories here
];

const itemsPerPage = 12; // Adjust based on desired grid size

const CategoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const visibleCategories = categories.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      
      {/* Promotional Banner */}
      <div className="bg-black text-white py-3 px-4 text-center text-sm font-medium pt-20 lg:pt-15">
        🚀 Discover new categories every week! Explore now ➔
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-16 py-7">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center">
          Explore Categories
        </h1>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="relative h-48 rounded-xl overflow-hidden group transition-transform duration-300 hover:scale-105 shadow-lg"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: category.background }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-4">
                  <div className="mb-3 p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white text-center">
                    {category.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-15">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`w-6 h-6 mx-1 rounded-full ${
                currentPage === index + 1 ? "bg-black" : "bg-gray-300"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
