import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("userLoggedIn", "true");
      } else {
        setCurrentUser(null);
        localStorage.removeItem("userLoggedIn");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => {
    signOut(auth).then(() => {
      setCurrentUser(null);
      localStorage.removeItem("userLoggedIn");
    });
  };

  const value = {
    currentUser,
    userLoggedIn: !!currentUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
