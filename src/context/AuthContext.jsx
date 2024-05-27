import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// Create an AuthContext to share authentication data
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component that will wrap other components to provide them with authentication data
export const AuthProvider = ({ children }) => {
  // State to hold the current user
  const [currentUser, setCurrentUser] = useState(null);
  // State to keep track of whether the authentication status is loading
  const [loading, setLoading] = useState(true);

  // useEffect to set up a subscription to authentication changes
  useEffect(() => {
    // Subscribe to authentication changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is logged in, update currentUser and set in localStorage
        setCurrentUser(user);
        localStorage.setItem("userLoggedIn", "true");
      } else {
        // If no user is logged in, reset currentUser and remove from localStorage
        setCurrentUser(null);
        localStorage.removeItem("userLoggedIn");
      }
      // Set loading to false when the authentication status has loaded
      setLoading(false);
    });

    // Return the unsubscribe function to deregister when the component unmounts
    return unsubscribe;
  }, []);

  // Function to log out the user
  const logout = () => {
    signOut(auth).then(() => {
      // Reset currentUser and remove from localStorage when the user logs out
      setCurrentUser(null);
      localStorage.removeItem("userLoggedIn");
    });
  };

  // Values to be shared with all components that use AuthContext
  const value = {
    currentUser, // The currently logged-in user
    userLoggedIn: !!currentUser, // Boolean indicating if a user is logged in
    logout, // Function to log out the user
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children only when the authentication status has loaded */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
