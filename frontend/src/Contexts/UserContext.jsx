// Update your UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth);
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCheckLoading, setAdminCheckLoading] = useState(false);

  // In UserContext.jsx
  const checkAdminStatus = async (uid) => {
    try {
      setAdminCheckLoading(true);
      const response = await axios.post(
        "https://local-connect-one.vercel.app/api/users/check-admin",
        {
          firebaseID: uid,
        }
      );
      setIsAdmin(response.data.isAdmin); // Ensure we use the response data
    } catch (err) {
      setIsAdmin(false);
      if (err.response?.status !== 403) {
        console.error("Error checking admin status:", err);
      }
    } finally {
      setAdminCheckLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!firebaseUser) {
        setMongoUser(null);
        setLoading(false);
        setIsAdmin(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          "https://local-connect-one.vercel.app/api/users/sign-in",
          {
            firebaseID: firebaseUser.uid,
          }
        );
        setMongoUser(response.data);
        setError(null);

        // Check admin status after getting user data
        await checkAdminStatus(firebaseUser.uid);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
        setMongoUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [firebaseUser, isAdmin]);
  // In your UserContext value
  const value = {
    user: mongoUser,
    firebaseUser,
    loading: firebaseLoading || loading,
    adminCheckLoading,
    error: firebaseError || error,
    isAuthenticated: !!firebaseUser,
    isAdmin,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
