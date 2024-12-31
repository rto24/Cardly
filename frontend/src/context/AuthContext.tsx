import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import * as SecureStorage from "expo-secure-store";
import { fetchWithAuth } from "../services/apiService";
import { AuthContextType } from "../types/types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const refreshToken = await SecureStorage.getItemAsync("refreshToken");
        if (refreshToken) {
          const response = await fetchWithAuth<{ id: string }>("/refresh", {
            method: "POST",
            body: JSON.stringify({ refreshToken }),
            headers: { "Content-Type": "application/json" },
          });
          if (response.status === 200 && response.data) {
            setUser({ id: response.data.id });
            setIsAuthenticated(true);
          } else {
            logout();
          }
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        logout();
      }
    };
    bootstrapAuth();
  }, []);

  const logout = async () => {
    try {
      await SecureStorage.deleteItemAsync("refreshToken");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  console.log("Context:", context)
  return context;
}