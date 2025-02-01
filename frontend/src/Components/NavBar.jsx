import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import hamburger and close icons

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "h-16 bg-white/80 shadow-md" : "h-20"
      }`}
    >
      <div className="container mx-auto px-6 md:px-40 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`font-bold transition-all duration-300 localconnect-font ${
            isScrolled ? "text-2xl text-black" : "text-3xl text-white"
          }`}
        >
          LocalConnect
        </Link>

        {/* Navigation Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`${
              isScrolled ? "text-black" : "text-white"
            } hover:text-blue-500 transition-colors font-medium`}
          >
            Home
          </Link>
          <Link
            to="/categories"
            className={`${
              isScrolled ? "text-black" : "text-white"
            } hover:text-blue-500 transition-colors font-medium`}
          >
            Categories
          </Link>
          <Link
            to="/add-business"
            className={`${
              isScrolled ? "text-black" : "text-white"
            } px-4 py-2 bg-transparent border border-blue-400 rounded-full hover:bg-blue-50 hover:border-blue-600 transition-all font-medium`}
          >
            Add Business
          </Link>
          <Link
            to="/contact"
            className={`${
              isScrolled ? "text-black" : "text-white"
            } hover:text-blue-500 transition-colors font-medium`}
          >
            Contact Us
          </Link>
        </div>

        {/* Hamburger Menu - Visible on Mobile */}
        <button
          className="md:hidden text-black z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Full-Screen Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-black/60 backdrop-blur-lg flex items-center justify-center transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsMenuOpen(false)} // Close when clicking outside
        >
          <div
            className="bg-white absolute z-100 w-4/5 max-w-sm rounded-lg shadow-lg flex flex-col items-center py-8 space-y-6 transition-transform duration-300 transform"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
          >
            <Link
              to="/"
              className="text-lg font-medium text-gray-800 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="text-lg font-medium text-gray-800 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/add-business"
              className="text-lg font-medium text-gray-800 px-4 py-2 border border-blue-400 rounded-full hover:bg-blue-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Add Business
            </Link>
            <Link
              to="/contact"
              className="text-lg font-medium text-gray-800 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;