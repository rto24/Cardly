import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { AuthContextType } from "../types/types";
import { saveAccessToken, saveRefreshToken, clearRefreshToken } from "../services/secureStorage";
import { refreshTokenFlow } from "../services/authService";
import { Text } from "react-native";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        console.log("Initializing authentication...");
        const { userId } = await refreshTokenFlow(); 

        if (userId) {
          setUser(userId);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error during authentication bootstrap:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  const login = async (accessToken: string, refreshToken: string, userId: string) => {
    try {
      await saveAccessToken(accessToken);
      await saveRefreshToken(refreshToken);
      setUser(userId);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await clearRefreshToken();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, login, logout }}>
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