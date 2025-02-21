import React, { createContext, useContext, useState } from "react";

type UserType = "patient" | "doctor";

interface AuthContextType {
  isAuthenticated: boolean;
  userType: UserType;
  login: (email: string, password: string) => void;
  logout: () => void;
  setUserType: (type: UserType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType>("patient");

  const login = (email: string, password: string) => {
    // For demo purposes, accept any non-empty credentials
    if (email && password) {
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userType,
        login,
        logout,
        setUserType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
