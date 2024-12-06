import React, { createContext, useState } from "react";
import axios from "axios"; // Import axios

export const AuthContext = createContext(); // Named export

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password }); // Ensure the correct API endpoint
      localStorage.setItem("token", res.data.token); // Store the token in localStorage
      setUser(res.data.user); // Set the user data from the response
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
      // You can handle errors by adding more detailed feedback here
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear the user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
