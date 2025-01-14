import * as SecureStorage from "expo-secure-store";
import { getRefreshToken, saveRefreshToken, saveAccessToken } from "./secureStorage";
import { ApiResponse } from "../types/api";

const BASE_URLS = {
  auth: "http://localhost:8080/api/auth",
  post: "http://localhost:8080/post",
};

export const fetchWithAuth = async <T = any>(
  endpoint: string,
  options: RequestInit,
  base: keyof typeof BASE_URLS = "auth"
): Promise<ApiResponse<T>> => {
  let accessToken = await SecureStorage.getItemAsync("accessToken");

  const refreshAccessToken = async () => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(`${BASE_URLS.auth}/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await response.json();

    await saveAccessToken(newAccessToken);
    await saveRefreshToken(newRefreshToken);

    return newAccessToken;
  };

  const sendRequest = async (token: string | null): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(`${BASE_URLS[base]}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.log("Access token expired. Attempting to refresh...");
        const newAccessToken = await refreshAccessToken();
        return sendRequest(newAccessToken); // Retry the request
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error in API request:", error);
      throw error;
    }
  };

  return sendRequest(accessToken);
};
