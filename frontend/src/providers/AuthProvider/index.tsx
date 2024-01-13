import React, { useState, createContext, useContext } from "react";
import { AuthProviderProps, AuthContextType } from "../../model";

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userType, setUserType] = useState("guest");

  const login = () => {
    setUserType("student");
  };

  const register = () => {
    setUserType("student");
  };

  const logout = () => {
    setUserType("guest");
  };

  return (
    <AuthContext.Provider value={{ userType, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
