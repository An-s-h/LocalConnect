import React from "react";
import { Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6 sm:px-12 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Website Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold localconnect-font">LocalConnect</h2>
          <p className="text-gray-400 text-sm">
            Connecting Communities, Empowering Local Businesses
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">List Your Business</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Contact</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>support@localconnect.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>123 Local Street, Community City</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+1 (800) 555-0192</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-6"></div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} LocalConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;