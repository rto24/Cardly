import { Comment, Posts, Like } from "../types/types";
import { fetchWithAuth } from "./apiService";

export const getUserPosts = async (userId: number): Promise<Posts[]> => {
  try {
    const response = await fetchWithAuth<Posts[]>(`/${userId}`, { method: "GET"}, "post");
    if (response.status === 200) {
      return response.data;
    };
    throw new Error("Failed to get user posts");
  } catch (error) {
    console.error("Failed to get user posts:", error);
    return [];
  }
};

export const getLikesOnPost = async (postId: number): Promise<Like[]> => {
  try {
    const response = await fetchWithAuth<Like[]>(`/${postId}/like`, { method: "GET"}, "post");
    if (response.status === 200) {
      return response.data;
    };
    throw new Error("Failed to get likes on post");
  } catch (error) {
    console.error("Failed to get likes on post:", error);
    return [];
  }
};

export const getCommentsOnPost = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await fetchWithAuth<Comment[]>(`/${postId}/comment`, { method: "GET"}, "post");
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get comments on post");
  } catch (error) {
    console.error("Failed to get comments on post:", error);
    return [];
  }
}

export const likePost = async (postId: number, userId: number): Promise<Like> => {
  try {
    const response = await fetchWithAuth<Like>(
      `/${postId}/like`,
      { 
        method: "POST", 
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ postId, userId })
      }, 
      "post"
    );
    if (response.status === 200) {
      return response.data;
    };
    throw new Error("Failed to like post");
  } catch (error) {
    console.error("Failed to like post:", error);
    throw error;
  }
};

export const commentOnPost = async (postId: number, userId: number, content: string): Promise<Comment> => {
  try {
    const response = await fetchWithAuth<Comment>(
      `/${postId}/comment`,
      { 
        method: "POST", 
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ postId, userId, content })
      }, 
      "post"
    );
    if (response.status === 200) {
      return response.data;
    };
    throw new Error("Failed to comment on post");
  } catch (error) {
    console.error("Failed to comment on post:", error);
    throw error;
  }
};