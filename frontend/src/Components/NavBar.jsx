import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Grid, PlusCircle, Mail, LogIn, LogOut } from "lucide-react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const DrawOutlineButton = ({ children, isScrolled, ...rest }) => {
  return (
    <button
      {...rest}
      className={`relative w-full font-medium py-3 px-6 overflow-hidden transition-all duration-300 disabled:opacity-50 group ${
        isScrolled ? "text-black" : "text-white"
      }`}
    >
      <span className="absolute inset-0 bg-gradient-to-r transition-all duration-300"></span>
      <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-all duration-700"></span>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-300 group-hover:duration-500" />
      <span className="absolute right-0 top-0 h-0 w-[2px] bg-white group-hover:h-full transition-all duration-300 group-hover:duration-500 delay-100" />
      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-300 group-hover:duration-500 delay-200" />
      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-white group-hover:h-full transition-all duration-300 group-hover:duration-500 delay-300" />
    </button>
  );
};

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/categories"
            className={`${
              isScrolled ? "text-black" : "text-white"
            } hover:text-blue-500 transition-colors font-medium`}
          >
            Categories
          </Link>
          <Link to="/add-business">
            <DrawOutlineButton isScrolled={isScrolled}>Add Business</DrawOutlineButton>
          </Link>
          <Link
            to="/contact"
            className={`${
              isScrolled ? "text-black" : "text-white"
            } hover:text-blue-500 transition-colors font-medium`}
          >
            Contact Us
          </Link>

          {user ? (
            <button onClick={handleLogout}>
              <DrawOutlineButton isScrolled={isScrolled}>Log Out</DrawOutlineButton>
            </button>
          ) : (
            <Link to="/signup">
              <DrawOutlineButton isScrolled={isScrolled}>Sign-Up</DrawOutlineButton>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden transition-all duration-300 ${
            isScrolled ? "text-black" : "text-white"
          } z-50 p-2 rounded-full ${isMenuOpen ? "bg-white/20" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? (
            <X size={28} className="transform transition-transform duration-300 rotate-180" />
          ) : (
            <Menu size={28} className="transform transition-transform duration-300" />
          )}
        </button>

        {/* Mobile Menu - Slides in from right */}
        <div
          className={`mobile-menu fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "opacity-100 visible translate-x-0"
              : "opacity-0 invisible translate-x-full"
          }`}
        >
          {/* Menu Content */}
          <div
            className={`absolute top-0 right-0 w-4/5 max-w-xs h-full bg-gradient-to-b from-gray-600 to-gray-200 shadow-xl transition-all duration-500 ease-in-out transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full flex flex-col p-6 overflow-y-auto">
              {/* Menu Items */}
              <nav className="flex-1 flex flex-col space-y-6 pt-8">
                <Link
                  to="/"
                  className="flex items-center text-white hover:text-indigo-200 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="mr-3" size={20} />
                  <span className="text-lg font-medium">Home</span>
                </Link>

                <Link
                  to="/categories"
                  className="flex items-center text-white hover:text-indigo-200 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Grid className="mr-3" size={20} />
                  <span className="text-lg font-medium">Categories</span>
                </Link>

                <Link
                  to="/add-business"
                  className="flex items-center text-white hover:text-indigo-200 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PlusCircle className="mr-3" size={20} />
                  <span className="text-lg font-medium">Add Business</span>
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center text-white hover:text-indigo-200 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Mail className="mr-3" size={20} />
                  <span className="text-lg font-medium">Contact Us</span>
                </Link>

                <div className="mt-8 pt-6 border-t border-white/20">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center text-white hover:text-red-200 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                    >
                      <LogOut className="mr-3" size={20} />
                      <span className="text-lg font-medium">Log Out</span>
                    </button>
                  ) : (
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center text-white hover:text-indigo-200 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="mr-3" size={20} />
                      <span className="text-lg font-medium">Sign Up</span>
                    </Link>
                  )}
                </div>
              </nav>

              {/* Footer */}
              <div className="mt-auto pt-6 text-center text-white/70 text-sm">
                © {new Date().getFullYear()} LocalConnect
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;