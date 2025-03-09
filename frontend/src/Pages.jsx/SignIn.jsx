import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Store, AtSign, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import NavBar from '../Components/NavBar';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);
    
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;
      
      // Check if the user exists in MongoDB
      const response = await axios.post('http://localhost:8000/api/users/sign-in', {
        firebaseID: uid
      });

      if (response.data) {
        console.log('User signed in successfully:', response.data);
        setSuccess(true);
        // Instead of navigating, show success message
        // navigate('/dashboard');
      }
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Error signing in:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="bg-black">
      <NavBar/>
    </div>
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-lg px-4">
        {/* Logo and Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Store className="h-10 w-10 text-blue-500 mr-2" />
            <h1 className="text-4xl font-bold text-white">Sign<span className="text-blue-500">In</span></h1>
          </div>
          
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-900 border border-green-600 text-green-100 px-6 py-4 rounded-lg relative flex items-center">
            <CheckCircle className="h-5 w-5 mr-3 text-green-400" />
            <span>Logged in successfully! Welcome back to LocalConnect.</span>
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
          <div className="mb-6 bg-red-900 border border-red-600 text-red-100 px-6 py-4 rounded-lg relative flex items-center">
            <AlertTriangle className="h-5 w-5 mr-3 text-red-300" />
            <span>{error}</span>
            <button 
              onClick={() => setError('')} 
              className="absolute top-2 right-2 p-1 text-red-100"
            >
              &times;
            </button>
          </div>
        )}

        <form onSubmit={handleSignIn} className="  rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Welcome back! Sign in to your account</h2>
          
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
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800 text-white placeholder-gray-500 block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

           

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-150 ease-in-out flex items-center justify-center mt-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 text-lg"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>Sign In</>
              )}
            </button>
          </div>
        </form>
        <p className="text-center mt-6 text-gray-500 text-md">
          New Here? <a href="/signup" className="text-blue-500 hover:text-blue-400">Sign up</a>
        </p>
      
      </div>
    </div>
    </>
  );
};

export default SignIn;