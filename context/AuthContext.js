// src/context/AuthContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Simulate fetching the logged-in user (e.g., from a cookie or localStorage)
  useEffect(() => {
    // This is where you'd check if a user is already logged in
    // For now, let's simulate a user logging in
    const loggedInUser = { email: "" }; 
    setUser(loggedInUser);
  }, []);

  const login = (email) => setUser({ email });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};