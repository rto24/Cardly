import { Servers } from "../types/types";
import { fetchWithAuth } from "./apiService";

export const getServers = async (): Promise<Servers[]> => {
  try {
    const response = await fetchWithAuth<Servers[]>('/available-servers', { method: "GET" }, "server");
    if (response.status === 200) {
      return response.data;
    };
    throw new Error("Failed to get available servers");
  } catch (error) {
    console.error("Failed to get servers:", error);
    return [];
  }
};