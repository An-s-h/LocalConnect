// src/contexts/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Your Firebase config
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth);
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!firebaseUser) {
        setMongoUser(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post('http://localhost:8000/api/users/sign-in', {
          firebaseID: firebaseUser.uid
        });
        setMongoUser(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
        setMongoUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [firebaseUser]);

  const value = {
    user: mongoUser,
    firebaseUser,
    loading: firebaseLoading || loading,
    error: firebaseError || error,
    isAuthenticated: !!firebaseUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};