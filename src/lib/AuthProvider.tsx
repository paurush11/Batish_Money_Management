import React, { createContext, useContext, useState } from "react";
import {
  IAuthContextType,
  ILogin,
  IUser,
  TToken,
  TcustomError,
} from "./Interfaces";
import useAuthStore from "@/store/jwt-token";
import axios from "axios";
import { AUTHENTICATE, GET_USER_BY_USERNAME, REGISTER } from "@/server/REST_API_Const";
import { useRouter } from "next/router";

const defaultContextValue: IAuthContextType = {
  user: null, // or a default user object
  token: null, // or a default token
  register: async () => {
    // Default no-op implementation
  },
  login: async () => {
    // Default no-op implementation
  },
  logout: () => {
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
    // Implement registration logic
    // On successful registration, set the user and token
    const body = userData;
    const response = await axios.post(REGISTER, body);
    if (response.data && response.data.token) {
      setToken(response.data.token);
      setUser(userData);
    }
    console.log(response);
    if (response.data && response.data.existedBefore) {
      // do something
      return sameUserError;
    }
    return null;
  };

  const login = async (userData: ILogin) => {
    // Implement login logic
    // On successful login, set the user and token
    const body = userData;
    const response = await axios.post(AUTHENTICATE, body);
    console.log(response);
    if (response.data && response.data.token) {
      setToken(response.data.token);
      const user = await axios.get(
        GET_USER_BY_USERNAME + `/${userData.userName}`,
        {
          headers: {
            Authorization: `Bearer ${response.data.token}`
          }
        }
      );
      setUser(user.data);
    }

    if (response.data && !response.data.existedBefore) {
      // do something
      return noUserError;
    }

    return null;
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
