import React, { useState } from 'react';
import NavBar from '../Components/NavBar';

const LoginSignupSlider = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [animating, setAnimating] = useState(false);
  
  const toggleForm = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsLoginActive(!isLoginActive);
      setAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <NavBar/>
      <div className="w-full max-w-5xl bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-800 relative z-10 mt-20">
        <div className="flex flex-col md:flex-row relative">
          {/* Left side - Form container */}
          <div className="w-full md:w-1/2 bg-black text-white p-8 md:p-12 z-10 relative">
            <div className="mb-10">
              <div className="inline-flex rounded-full bg-white/10 p-1 backdrop-blur-sm mb-2">
                <button
                  onClick={() => !animating && setIsLoginActive(true)}
                  className={`relative px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isLoginActive 
                      ? 'bg-white text-black shadow-lg' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => !animating && setIsLoginActive(false)}
                  className={`relative px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    !isLoginActive 
                      ? 'bg-white text-black shadow-lg' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>
            
            {/* Login Form */}
            <div className={`transition-all duration-500 transform ${
              isLoginActive 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-full opacity-0 absolute pointer-events-none'
            }`}>
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-gray-400 mb-8">Connect with your local community.</p>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-black border-b-2 border-gray-700 focus:border-white transition-colors duration-300 outline-none text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                    <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-3 bg-black border-b-2 border-gray-700 focus:border-white transition-colors duration-300 outline-none text-white"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 bg-black border-2 border-white focus:ring-white"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="group relative w-full py-3 px-4 border border-white rounded-full overflow-hidden bg-black hover:bg-white transition-all duration-300 text-white hover:text-black font-medium"
                >
                  <span className="absolute right-0 top-0 h-full w-12 translate-x-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:translate-x-0"></span>
                  Sign in
                </button>
              </form>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-800 rounded-full text-sm font-medium text-white hover:bg-white/5 transition-colors">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                    Google
                  </button>
                  
                  <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-800 rounded-full text-sm font-medium text-white hover:bg-white/5 transition-colors">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C17.139 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </button>
                </div>
              </div>
            </div>
            
            {/* SignUp Form */}
            <div className={`transition-all duration-500 transform ${
              !isLoginActive 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-full opacity-0 absolute pointer-events-none '
            }`}>
              <h2 className="text-3xl font-bold mb-2">Join LocalConnect</h2>
              <p className="text-gray-400 mb-8">Discover your neighborhood's hidden gems.</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-300">First name</label>
                    <input
                      type="text"
                      id="first-name"
                      className="w-full px-4 py-3 bg-black border-b-2 border-gray-700 focus:border-white transition-colors duration-300 outline-none text-white"
                      placeholder="John"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-300">Last name</label>
                    <input
                      type="text"
                      id="last-name"
                      className="w-full px-4 py-3 bg-black border-b-2 border-gray-700 focus:border-white transition-colors duration-300 outline-none text-white"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    id="signup-email"
                    className="w-full px-4 py-3 bg-black border-b-2 border-gray-700 focus:border-white transition-colors duration-300 outline-none text-white"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-300">Your neighborhood</label>
                  <input
                    type="text"
                    id="location"
                    className="w-full px-4 py-3 bg-black border-b-2 border-gray-700 focus:border-white transition-colors duration-300 outline-none text-white"
                    placeholder="Downtown, Westside, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300">Password</label>
                  <input
                    type="password"
                    id="signup-password"
                    className="w-full px-4 py-3 bg-black border-b-2 border-gray-700 focus:border-white transition-colors duration-300 outline-none text-white"
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">I'm interested in:</label>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex-1">
                      <button type="button" className="w-full border border-gray-800 rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors">
                        Restaurants
                      </button>
                    </div>
                    <div className="flex-1">
                      <button type="button" className="w-full border border-gray-800 rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors">
                        Shopping
                      </button>
                    </div>
                    <div className="flex-1">
                      <button type="button" className="w-full border border-gray-800 rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors">
                        Events
                      </button>
                    </div>
                    <div className="flex-1">
                      <button type="button" className="w-full border border-gray-800 rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors">
                        Services
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 bg-black border-2 border-white focus:ring-white"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                    I agree to the <a href="#" className="text-white hover:underline">Terms</a> and <a href="#" className="text-white hover:underline">Privacy Policy</a>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="group relative w-full py-3 px-4 border border-white rounded-full overflow-hidden bg-black hover:bg-white transition-all duration-300 text-white hover:text-black font-medium"
                >
                  <span className="absolute right-0 top-0 h-full w-12 translate-x-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:translate-x-0"></span>
                  Create account
                </button>
              </form>
            </div>
          </div>
          
          {/* Right side - Animated illustration/graphic */}
          <div className="w-full md:w-1/2 bg-black p-8 md:p-12 flex flex-col justify-center items-center relative overflow-hidden">
            {/* Logo and name */}
            
            
            {/* Animated graphic */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* City outline illustration */}
              <div className="relative">
                {/* Circle background */}
                <div className="w-64 h-64 rounded-full bg-white/5 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-white/5 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/5"></div>
                  </div>
                </div>
                
                {/* City skyline */}
                <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center">
                  
                  <div className="h-20 w-6 bg-white/10 mx-1 rounded-t-lg"></div>
                  <div className="h-28 w-8 bg-white/10 mx-1 rounded-t-lg"></div>
                  <div className="h-32 w-10 bg-white/10 mx-1 rounded-t-lg"></div>
                  <div className="h-16 w-8 bg-white/10 mx-1 rounded-t-lg"></div>
                  <div className="h-24 w-6 bg-white/10 mx-1 rounded-t-lg"></div>
                </div>
                
                {/* Animated dot/connection lines to suggest connection */}
              
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupSlider;