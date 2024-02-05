import React, { createContext, useContext, useState } from "react";
import { IAuthContextType, IUser, TToken } from "./Interfaces";
import useAuthStore from "@/store/jwt-token";
import axios from "axios";
import { GET_USER_BY_USERNAME, REGISTER } from "@/server/REST_API_Const";

export const AuthContext = createContext<IAuthContextType | null>(null);

interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const { user, token, setToken, setUser, clearAuth } = useAuthStore();

  const register = async (userData: IUser) => {
    // Implement registration logic
    // On successful registration, set the user and token
    const body = userData;

    const response = await axios.post(REGISTER, body);
    console.log(response);
    if (response.data && response.data.token) {
      setToken(response.data.token);
      setUser(userData);
    }
  };

  const login = async (username: string, password: string) => {
    // Implement login logic
    // On successful login, set the user and token
    const body = {
      userName: username,
      password: password,
    };
    const response = await axios.post(REGISTER, body);
    console.log(response);
    if (response.data && response.data.token) {
      setToken(response.data.token);
      const user = await axios.get(GET_USER_BY_USERNAME + `${username}`);
      setUser(user.data);
    }
    // setUser(loggedInUser);
    // setToken(receivedToken);
  };

  const logout = () => {
    // Clear user and token on logout
    clearAuth();
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
