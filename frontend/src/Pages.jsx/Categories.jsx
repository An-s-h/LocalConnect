import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LocationContext } from "../Contexts/LocationContext";
import {
  Utensils,
  Coffee,
  Shirt,
  ShoppingBag,
  Hotel,
  Scissors,
  Dumbbell,
  HeartPulse,
  Car,
  Home,
  PartyPopper,
  GraduationCap,
  Film,
  MoreHorizontal,
  PawPrint,
  Smartphone,
  Scale,
  Baby,
  Sparkles,
} from "lucide-react";
import NavBar from "../Components/NavBar";

const categories = [
  { id: 1, name: "Fast Food", icon: Utensils, background: 'url("https://www.partstown.com/about-us/wp-content/uploads/2023/11/what-is-considered-fast-food.jpg")' },
  { id: 2, name: "Restaurant", icon: Utensils, background: 'url("https://static.vecteezy.com/system/resources/previews/008/660/558/non_2x/organic-food-background-hand-drawn-concept-free-vector.jpg")' },
  { id: 3, name: "Café", icon: Coffee, background: 'url("https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/34/18/46/cafe-coffee-day.jpg?w=900&h=500&s=1")' },
  { id: 4, name: "Clothing & Accessories", icon: Shirt, background: 'url("https://img.freepik.com/premium-photo/clothing-accessories-men-women-ready-travel-life-style_11304-1404.jpg")' },
  { id: 5, name: "Retail", icon: ShoppingBag, background: 'url("https://swarajya.gumlet.io/swarajya/2016-08/6518ada3-39bc-4c4a-ab18-824609065e45/GettyImages-180360366.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true")' },
  { id: 6, name: "Hotel", icon: Hotel, background: 'url("https://img.freepik.com/free-photo/luxury-hotel-room_1150-10836.jpg")' },
  { id: 7, name: "Salon", icon: Scissors, background: 'url("https://static.vecteezy.com/system/resources/previews/052/247/538/non_2x/spa-spa-background-with-white-orchid-flowers-and-leaves-on-blue-background-photo.jpeg")' },
  { id: 8, name: "Gym", icon: Dumbbell, background: 'url("https://b3327586.smushcdn.com/3327586/wp-content/uploads/2024/05/gb-botanica-gym-link-spaces-slough-1024x683.jpg?lossy=0&strip=1&webp=1")' },
  { id: 9, name: "Medical", icon: HeartPulse, background: 'url("https://img.freepik.com/free-vector/watercolor-medical-background_52683-162142.jpg")' },
  { id: 10, name: "Automotive", icon: Car, background: 'url("https://img.freepik.com/premium-vector/auto-repair-shop-background-flat-design_98292-21181.jpg")' },
  { id: 11, name: "Home Services", icon: Home, background: 'url("https://thumbs.dreamstime.com/b/wooden-house-construction-tools-stone-pattern-background-copy-space-home-repair-concept-maintenance-renovation-161857121.jpg")' },
  { id: 12, name: "Amusement", icon: PartyPopper, background: 'url("https://wror.com/uploads/2023/05/GettyImages-1367393297.jpg?format=auto&optimize=high&width=1440")' },
  { id: 13, name: "Education", icon: GraduationCap, background: 'url("https://img.freepik.com/free-vector/hand-drawn-back-school-background_23-2149464866.jpg")' },
  { id: 14, name: "Entertainment", icon: Film, background: 'url("https://img.freepik.com/free-vector/cinema-realistic-poster-with-illuminated-bucket-popcorn-drink-3d-glasses-clapperboard-tickets-blue-background-with-tapes-vector-illustration_1284-77070.jpg")' },
  { id: 16, name: "Pet Services", icon: PawPrint, background: 'url("https://cdn-bcldb.nitrocdn.com/kLRdXZGeQymYELvyTfXVsQALHhzNRamH/assets/images/optimized/rev-73e9214/www.teamais.net/wp-content/uploads/2020/08/vet-min.jpg")' },
  { id: 17, name: "Electronics", icon: Smartphone, background: 'url("https://www.agsdevices.com/wp-content/uploads/2024/05/electronic_components_hero_image.jpg")' },
  { id: 18, name: "Real Estate", icon: Home, background: 'url("https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg")' },
  { id: 19, name: "Legal Services", icon: Scale, background: 'url("https://img.freepik.com/free-photo/lawyer-concept-with-balance_23-2148890956.jpg")' },
  { id: 20, name: "Child Care", icon: Baby, background: 'url("https://img.freepik.com/free-photo/children-playing-daycare-center_23-2148890953.jpg")' },
  { id: 21, name: "Cleaning Services", icon: Sparkles, background: 'url("https://cdn.prod.website-files.com/60ff934f6ded2d17563ab9dd/61392d693cf1ac14070ad5b8_starting-a-cleaning-business.jpeg")' },
  { id: 22, name: "Events", icon: PartyPopper, background: 'url("https://www.eventbookings.com/wp-content/uploads/2018/03/event-ideas-for-party-eventbookings.jpg")' },
  { id: 23, name: "Advertising", icon: MoreHorizontal, background: 'url("https://commerceiq.ai/wp-content/uploads/2020/07/How-to-Get-the-Biggest-Bang-for-Your-Ecommerce-Advertising-Buck.png")' },
  { id: 24, name: "Stationaries", icon: GraduationCap, background: 'url("https://img.freepik.com/premium-photo/top-view-office-desk-stationaries-arrangement_23-2148224203.jpg?w=360")' },
  { id: 25, name: "Photography Services", icon: Film, background: 'url("https://cdn.pixabay.com/photo/2023/05/20/19/58/woman-8007247_1280.jpg")' },
  { id: 26, name: "Financial Services", icon: Scale, background: 'url("https://www.salesforce.com/blog/wp-content/uploads/sites/2/2023/12/5-Things-Financial-Services-Customers-Should-Look-For-in-a-CRM_Opt_A.jpg")' },
  { id: 27, name: "Courier & Delivery", icon: Car, background: 'url("https://content.jdmagicbox.com/comp/service_catalogue/courier-services-attr-pallet-courier-services-cou6-2.jpg")' },
  { id: 28, name: "Tour & Travel", icon: Hotel, background: 'url("https://3.imimg.com/data3/BE/DV/MY-13222257/tours-and-travels-services.jpg")' },
  { id: 29, name: "Home Decor", icon: Home, background: 'url("https://www.marthastewart.com/thmb/LaYmyiA1c-J0kvd0ERCL5-30ch4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spanish-art-deco-home-tour-living-room-0120-2000-e206e51ef737424aaa6eab5f500f5b84.jpg")' },
  { id: 31, name: "Software Services", icon: Smartphone, background: 'url("https://eleks.com/wp-content/uploads/image-within-the-text-Guide-to-Types-of-Software-Development-Services3.jpg")' },
  { id: 32, name: "Bakeries", icon: Utensils, background: 'url("https://www.restroworks.com/blog/wp-content/uploads/2024/11/Storefront-Bakeries.png")' },
  { id: 33, name: "Florists", icon: Sparkles, background: 'url("https://icieducation.co.uk/blog/wp-content/uploads/2016/02/shutterstock_191314175.gif")' },
  { id: 35, name: "Jewelry & Accessories", icon: Shirt, background: 'url("https://bsmedia.business-standard.com/_media/bs/img/article/2024-05/09/full/1715241436-388.jpeg?im=FeatureCrop,size=(826,465)")' },
  { id: 36, name: "Sports & Fitness", icon: Dumbbell, background: 'url("https://static.wixstatic.com/media/e80c34_d59dfb85fdad4417b0daa3e65da41744~mv2.jpg/v1/fill/w_844,h_368,al_c,lg_1,q_80/e80c34_d59dfb85fdad4417b0daa3e65da41744~mv2.jpg")' },
];

const itemsPerPage = 12;

const Categories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { location } = useContext(LocationContext);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    const finalQuery = `${categoryName} ${location || ""}`.trim();
    navigate(`/search?q=${encodeURIComponent(finalQuery)}`);
  };

  // Calculate pagination
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const visibleCategories = categories.slice(startIdx, startIdx + itemsPerPage);

  // Handle page navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate visible page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftBound = Math.max(2, currentPage - 1);
      const rightBound = Math.min(totalPages - 1, currentPage + 1);
      
      pages.push(1);
      
      if (leftBound > 2) {
        pages.push('...');
      }
      
      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
      }
      
      if (rightBound < totalPages - 1) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="min-h-[95vh] flex flex-col">
      <NavBar />
  
      {/* Promotional Banner */}
      <div className="bg-black text-white py-3 px-4 text-center text-sm font-medium pt-20 lg:pt-15">
        🚀 Discover new categories every week! Explore now ➔
      </div>
  
      {/* Main content */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-16 py-7 flex-1">
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
                onClick={() => handleCategoryClick(category.name)}
                className="relative h-48 rounded-xl overflow-hidden group transition-transform duration-300 hover:scale-105 shadow-lg cursor-pointer"
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
      </div>
  
      {/* Enhanced Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center py-6  gap-1">
          {/* Previous Button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md mx-1 ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-black hover:bg-gray-200'
            }`}
          >
            &larr; Prev
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-2">...</span>
              ) : (
                <button
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full mx-1 ${
                    currentPage === page
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}

          {/* Next Button */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md mx-1 ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-black hover:bg-gray-200'
            }`}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default Categories;