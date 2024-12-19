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