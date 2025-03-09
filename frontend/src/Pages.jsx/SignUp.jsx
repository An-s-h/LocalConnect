import React, { useState } from 'react';
import { auth } from '../firebase';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { MapPin, Store, CheckCircle, AtSign, Lock, User, Phone, Building } from 'lucide-react';
import NavBar from '../Components/NavBar';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Restaurants',
    'Groceries',
    'Healthcare',
    'Retail',
    'Education',
    'Fitness',
    'Entertainment',
    'Other'
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Send user data to backend
      await axios.post('http://localhost:8000/api/users/signup', {
        firebaseID: uid,
        username,
        email,
        password,
        phoneNumber,
        city,
        preferences
      });

      setSuccess(true);
      // Reset form
      setEmail('');
      setPassword('');
      setUsername('');
      setPhoneNumber('');
      setCity('');
      setPreferences([]);
    } catch (error) {
      setError(error.message || 'Error creating account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPreferences([...preferences, value]);
    } else {
      setPreferences(preferences.filter((category) => category !== value));
    }
  };

  return (
    <>
    <div className=" bg-black">
      <NavBar/>
    </div>
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center justify-center py-10">
      {/* Logo and Header */}
      <div className="w-full max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Store className="h-10 w-10 text-blue-500 mr-2" />
            <h1 className="text-4xl font-bold text-white">Sign<span className="text-blue-500">Up</span></h1>
          </div>
          
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-900 border border-green-600 text-green-100 px-6 py-4 rounded-lg relative flex items-center max-w-3xl mx-auto">
            <CheckCircle className="h-6 w-6 mr-3 text-green-400" />
            <span className="text-lg">User created successfully! You can now connect with local businesses.</span>
            <button 
              onClick={() => setSuccess(false)} 
              className="absolute top-2 right-2 p-1 text-green-100"
            >
              &times;
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-900 border border-red-600 text-red-100 px-6 py-4 rounded-lg relative max-w-3xl mx-auto">
            <span>{error}</span>
            <button 
              onClick={() => setError('')} 
              className="absolute top-2 right-2 p-1 text-red-100"
            >
              &times;
            </button>
          </div>
        )}

        <form onSubmit={handleSignUp} className="rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Create your account</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AtSign className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-800 text-white placeholder-gray-500 block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-800 text-white placeholder-gray-500 block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-gray-800 text-white placeholder-gray-500 block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Phone Number Field */}
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="bg-gray-800 text-white placeholder-gray-500 block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* City Field */}
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="city">City</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Building className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="city"
                    type="text"
                    placeholder="Your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="bg-gray-800 text-white placeholder-gray-500 block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Empty space to align with left column */}
              <div className="hidden md:block">
                {/* This div maintains alignment with the 3 fields on the left */}
              </div>
            </div>
          </div>

          {/* Categories Section - Full Width */}
          <div className="mt-8">
            <h3 className="text-md font-medium mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-500" />
              Select your interests
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                  <input
                    type="checkbox"
                    value={category}
                    onChange={handleCategoryChange}
                    checked={preferences.includes(category)}
                    className="h-4 w-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                  />
                  <span className="text-sm font-medium">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button - Centered */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-150 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 text-lg"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>Join LocalConnect</>
              )}
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-gray-500 text-md">
          Already have an account? <a href="/signin" className="text-blue-500 hover:text-blue-400">Sign in</a>
        </p>
      </div>
    </div>
    </>
  );
};

export default SignUp;