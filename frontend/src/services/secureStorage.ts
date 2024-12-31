import * as SecureStorage from "expo-secure-store";

export const saveRefreshToken = async (token: string) => {
  try {
    await SecureStorage.setItemAsync("refreshToken", token);
  } catch (error) {
    console.error("Error saving token", error);
  }
};

export const getRefreshToken = async () => {
  try {
    return await SecureStorage.getItemAsync("refreshToken");
  } catch (error) {
    console.error("Error retrieving token", error);
    return null;
  }
};

export const clearRefreshToken = async () => {
  try {
    await SecureStorage.deleteItemAsync("refreshToken");
  } catch (error) {
    console.error("Error clearing token", error);
  }
};