import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Mail, User, MessageSquare, ShieldCheck, Building, Users, Star, CheckCircle } from "lucide-react";
import NavBar from "../Components/NavBar";
import SupportCard from "../Components/SupportCard";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .send(
        "service_diw6cex", 
        "template_g1s7v94",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "APnZ7aVLjXOKkLFP9"
      )
      .then(
        () => {
          setSuccess(true);
          setFormData({ name: "", email: "", message: "" });
        },
        () => setSuccess(false)
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* NavBar */}
      <div className="bg-black pt-20 w-full">
        <NavBar />
      </div>
      
      {/* Contact Section */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 py-12">
        <h1 className="text-6xl font-extrabold text-center mb-8 text-black">
          Contact Us
        </h1>

        <p className="text-center text-gray-400 max-w-lg mx-auto mb-10">
          Have a question or need help? Fill out the form below, and we'll get
          back to you soon.
        </p>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          {/* Form */}
          <form onSubmit={sendEmail} className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              />
            </div>

            {/* Message Field */}
            <div className="relative">
              <MessageSquare className="absolute left-4 top-5 text-gray-400" />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-70"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>

            {/* Status Message */}
            {success !== null && (
              <p className={`text-center mt-4 text-sm ${
                success ? "text-gray-600" : "text-gray-600"
              }`}>
                {success 
                  ? "✓ Message sent! We'll connect you shortly."
                  : "! Please try again or contact support@localconnect.com"}
              </p>
            )}
          </form>
        </div>
        <SupportCard/>
      </div>
    </div>
  );
};

export default ContactUs;