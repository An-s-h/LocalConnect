import React, { useState } from "react";
import { auth } from "../firebase";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  MapPin,
  Store,
  CheckCircle,
  AtSign,
  Lock,
  User,
  Phone,
  Building,
  ChevronDown,
  X,
} from "lucide-react";
import NavBar from "../Components/NavBar";

const businessCategories = [
  "Fast Food",
  "Restaurant",
  "Café",
  "Clothing & Accessories",
  "Retail",
  "Hotel",
  "Salon",
  "Gym",
  "Medical",
  "Automotive",
  "Home Services",
  "Amusement",
  "Education",
  "Entertainment",
  "Other",
  "Pet Services",
  "Electronics",
  "Real Estate",
  "Legal Services",
  "Child Care",
  "Cleaning Services",
  "Events",
  "Advertising",
  "Stationaries",
  "Photography Services",
  "Financial Services",
  "Courier & Delivery",
  "Tour & Travel",
  "Home Decor",
  "Health & Wellness",
  "Software Services",
  "Bakeries",
  "Florists",
  "Furniture",
  "Jewelry & Accessories",
  "Sports & Fitness",
  "Grocery Stores",
];

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid } = userCredential.user;

      await axios.post("https://local-connect-pi.vercel.app/api/users/signup", {
        firebaseID: uid,
        username,
        email,
        password,
        phoneNumber,
        city,
        preferences,
      });

      setSuccess(true);
      setEmail("");
      setPassword("");
      setUsername("");
      setPhoneNumber("");
      setCity("");
      setPreferences([]);
    } catch (error) {
      setError(error.message || "Error creating account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = (category) => {
    if (preferences.includes(category)) {
      setPreferences(preferences.filter((c) => c !== category));
    } else {
      setPreferences([...preferences, category]);
    }
  };

  const removeCategory = (category) => {
    setPreferences(preferences.filter((c) => c !== category));
  };

  const filteredCategories = businessCategories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-white">
        <div className="p-10 bg-black">
          <NavBar />
        </div>
      </div>
      <div className="py-15 bg-gray-50 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl px-4">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Store className="h-10 w-10 text-black mr-2" />
              <h1 className="text-4xl font-bold text-gray-900">
                Join<span className="text-indigo-600">Local</span>
              </h1>
            </div>
            <p className="text-gray-600">
              Create your account to connect with local businesses
            </p>
          </div>

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg relative flex items-center max-w-3xl mx-auto">
              <CheckCircle className="h-6 w-6 mr-3 text-green-500" />
              <span className="text-base">Account created successfully!</span>
              <button
                onClick={() => setSuccess(false)}
                className="absolute top-3 right-3 p-1 text-green-700 hover:text-green-900"
              >
                &times;
              </button>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg relative max-w-3xl mx-auto">
              <span>{error}</span>
              <button
                onClick={() => setError("")}
                className="absolute top-3 right-3 p-1 text-red-700 hover:text-red-900"
              >
                &times;
              </button>
            </div>
          )}

          <form
            onSubmit={handleSignUp}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Create Account
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <AtSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      placeholder="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Choose username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Enhanced Categories Selection */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-black" />
                Preferred Categories
              </h3>

              {/* Selected Categories Chips */}
              {preferences.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {preferences.map((category) => (
                    <div
                      key={category}
                      className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCategory(category)}
                        className="ml-2 text-indigo-500 hover:text-indigo-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Multi-select Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-left bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <span className="text-gray-700">
                    {preferences.length > 0
                      ? `${preferences.length} selected`
                      : "Select categories"}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      isDropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-60 overflow-auto">
                    <div className="sticky top-0 bg-white p-2 border-b">
                      <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="py-1">
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                          <label
                            key={category}
                            className={`flex items-center px-4 py-2 hover:bg-indigo-50 cursor-pointer ${
                              preferences.includes(category)
                                ? "bg-indigo-50"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={preferences.includes(category)}
                              onChange={() => handleCategoryChange(category)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-3"
                            />
                            <span className="text-sm text-gray-700">
                              {category}
                            </span>
                          </label>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          No categories found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Select categories you're interested in
              </p>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-gray-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  "Get Started"
                )}
              </button>
            </div>
          </form>

          <p className="text-center mt-6 text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-indigo-600 hover:text-indigo-300 font-medium"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
