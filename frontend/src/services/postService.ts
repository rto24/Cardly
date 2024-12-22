const API_URL = "http://localhost:8080/post";

export const getUserPosts = async (userId: number) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to get user posts");
    };

    return data;
  } catch(error) {
    console.error("Failed to get user posts:", error);
  }
};

export const likePost = async (postId: number, userId: number) => {
  try {
    const response = await fetch(`${API_URL}/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        userId
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to like post");
    }
    return data;
  } catch (error) {
    console.error("Failed to like post:", error)
  }
};

export const commentOnPost = async (postId: number, userId: number, content: string) => {
  try {
    const response = await fetch(`${API_URL}/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        userId,
        content
      })
    });

    const data = response.json();
    
    if (!response.ok) {
      throw new Error("Failed to comment on post");
    }
    return data;
  } catch (error) {
    console.error("Failed to comment on post:", error);
  }
};
