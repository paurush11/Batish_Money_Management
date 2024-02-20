import useAuthStore from "@/store/jwt-token";
import axios from "axios";
import React, { createContext } from "react";
import { IAuthContextType, ILogin, IUser, TcustomError } from "./Interfaces";

const defaultContextValue: IAuthContextType = {
  user: null, // or a default user object
  token: null, // or a default token
  register: async () => {
    // Default no-op implementation
  },
  login: async () => {
    // Default no-op implementation
  },
  logout: async () => {
    // Default no-op implementation
  },
};
export const AuthContext = createContext<IAuthContextType>(defaultContextValue);

interface IAuthProvider {
  children: React.ReactNode;
}

const sameUserError: TcustomError = {
  message: "User exists already",
};
const noUserError: TcustomError = {
  message: "No Such User exists",
};

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const { user, token, setToken, setUser, clearAuth } = useAuthStore();
  const register = async (userData: IUser) => {
    const body = userData;
    const response = await axios.post("/api/register", body);
    if (response.data && response.data.token) {
      setToken(response.data.token);
      setUser(userData);
      if (response.data.existedBefore) {
        return sameUserError;
      }
    }
    return null;
  };

  const login = async (userData: ILogin) => {
    const body = userData;
    try {
      const response = await axios.post("/api/login", body);
      // Post to your API route
      if (response.data) {
        // Assuming the API returns user data on successful login
        setUser(response.data.user);
        setToken(response.data.token);
        // For security reasons, don't set HttpOnly tokens in client-side JS
        // You just maintain application state as needed
      } else {
        return noUserError;
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (e.g., display an error message)
    }

    return null; // Or indicate success/failure as needed
  };
  const logout = async () => {
    // Clear user and token on logout
    try {
      await axios.post("/api/logout");
      clearAuth();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
