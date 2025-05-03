import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Store, AtSign, Lock, AlertTriangle, CheckCircle } from "lucide-react";
import NavBar from "../Components/NavBar";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle redirect after successful login
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid } = userCredential.user;

      // Check if the user exists in MongoDB
      const response = await axios.post(
        "https://local-connect-one.vercel.app/api/users/sign-in",
        {
          firebaseID: uid,
        }
      );

      if (response.data) {
        console.log("User signed in successfully:", response.data);
        setSuccess(true);
      }
    } catch (error) {
      setError("Failed to sign in. Please check your credentials.");
      console.error("Error signing in:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="p-10 bg-black">
          <NavBar />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-25">
        <div className="w-full max-w-md px-4">
          {/* Logo and Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Store className="h-10 w-10 text-black mr-2" />
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome<span className="text-indigo-600">Back</span>
              </h1>
            </div>
            <p className="text-gray-600 mt-2">
              Sign in to continue your local journey
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center animate-fade-in">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              <span>Logged in successfully! Redirecting...</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center animate-fade-in">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={handleSignIn}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Account Login
            </h2>

            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
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
                    Signing In...
                  </>
                ) : (
                  "Sign In->"
                )}
              </button>
            </div>
          </form>

          <p className="text-center mt-6 text-gray-600 text-sm">
            New Here?{" "}
            <a
              href="/signup"
              className="text-indigo-600 hover:text-indigo-400 font-medium"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
