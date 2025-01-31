import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        isScrolled ? "h-16 bg-white/80" : "h-20"
      }`}
    >
      <div className="container mx-auto px-40 h-full flex items-center justify-between">
        {/* Logo with Pacifico Font */}
        <Link
          to="/"
          className={`font-bold transition-all duration-300 localconnect-font ${
            isScrolled ? "text-2xl text-black" : "text-3xl text-white"
          }`}
        >
          LocalConnect
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className=
             {`${
        isScrolled ? "text-black" : "text-white"}
             hover:text-blue-500 transition-colors font-medium`}
          >
            Home
          </Link>
          <Link
            to="/categories"
            className={`${
              isScrolled ? "text-black" : "text-white"}
                   hover:text-blue-500 transition-colors font-medium`}
          >
            Categories
          </Link>
          <Link
            to="/add-business"
            className={`${
              isScrolled ? "text-black" : "text-white"} px-4 py-2 bg-transparent border border-blue-400  rounded-full hover:bg-blue-50 hover:border-blue-600 transition-all font-medium`}
          >
            Add Business
          </Link>
          <Link
            to="/contact"
            className={`${
              isScrolled ? "text-black" : "text-white"}
                   hover:text-blue-500 transition-colors font-medium`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
