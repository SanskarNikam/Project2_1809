import React, { createContext, useState, useEffect } from "react";
import { auth } from "../backend/firebase"; // Firebase auth
import { onAuthStateChanged } from "firebase/auth";

// Create the context
const AuthContext = createContext();

// AuthProvider component to provide auth state and functions
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Current user
  const [loading, setLoading] = useState(true); // Loading state

  // Monitor the auth state and set user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user when the auth state changes
      setLoading(false); // Stop loading when the auth state is known
    });

    return unsubscribe; // Clean up the listener when component unmounts
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context and provider
export { AuthContext, AuthProvider };
