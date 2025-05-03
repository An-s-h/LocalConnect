import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LocationContext } from "../Contexts/LocationContext";
import { 
  Shirt, Leaf, Heart, BellRing, Truck, Gift, Megaphone, 
  Wrench, Plug, Car 
} from "lucide-react";

const categories = [
  { name: "Apparels", icon: Shirt },
  { name: "Café", icon: Heart },
  { name: "Salon", icon: Leaf },
  { name: "Education", icon: BellRing },
  { name: "Medical", icon: Heart },
  { name: "Events", icon: BellRing },
  { name: "Gym", icon: Megaphone },
  { name: "Stationaries", icon: Gift },
];

// ... (other imports and constants remain the same)

export default function ServiceCategories() {
  const { location } = useContext(LocationContext);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    let searchQuery = categoryName;
    if (categoryName === "Apparels") {
      searchQuery = "Clothing & Accessories";
    }
    const finalQuery = `${searchQuery} ${location || ""}`.trim();
    navigate(`/search?q=${encodeURIComponent(finalQuery)}`);
  };

  return (
    <section className="absolute bottom-0 left-0 w-full bg-black/50 z-10 py-8">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 text-center">
          {categories.map((category, index) => (
            <div 
              key={category.name} 
              className={`${index >= 4 ? 'hidden md:flex' : 'flex'} flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-105`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 border-2 border-yellow-400 rounded-full group-hover:shadow-yellow-400 group-hover:shadow-lg transition-shadow duration-300" />
                <div className="absolute inset-1 rounded-full bg-black/40 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors duration-300" />
                </div>
              </div>
              <span className="text-white text-[10px] sm:text-sm font-medium mt-2 group-hover:text-yellow-400 transition-colors duration-300">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
