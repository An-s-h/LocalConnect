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
      <div className="bg-white">
        <div className='p-10 bg-black'>
        <NavBar/>
        </div>
      </div>
      <div className="py-15 bg-gray-50 flex flex-col items-center justify-center ">
        {/* Logo and Header */}
        <div className="w-full max-w-2xl px-4">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Store className="h-10 w-10 text-black mr-2" />
              <h1 className="text-4xl font-bold text-gray-900">Join<span className="text-indigo-600">Local</span></h1>
            </div>
            <p className="text-gray-600">Create your account to connect with local businesses</p>
          </div>

          {/* Success Message */}
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

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg relative max-w-3xl mx-auto">
              <span>{error}</span>
              <button 
                onClick={() => setError('')} 
                className="absolute top-3 right-3 p-1 text-red-700 hover:text-red-900"
              >
                &times;
              </button>
            </div>
          )}

          <form onSubmit={handleSignUp} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Create Account</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
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

              {/* Right Column */}
              <div className="space-y-4">
                {/* Username Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
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

                {/* Phone Number Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
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

            {/* Location Section */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
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

            {/* Interests Section */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-black" />
                Preferred Categories
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">
                    <input
                      type="checkbox"
                      value={category}
                      onChange={handleCategoryChange}
                      checked={preferences.includes(category)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-gray-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Get Started'
                )}
              </button>
            </div>
          </form>

          <p className="text-center mt-6 text-gray-600 text-sm">
            Already have an account?{' '}
            <a href="/signin" className="text-indigo-600 hover:text-indigo-300 font-medium">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;