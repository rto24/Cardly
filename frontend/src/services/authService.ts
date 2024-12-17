const API_URL = "http://localhost:8080/api/auth";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (!response.ok) {
      throw new Error("Failed to log user in");
    }
    return response.json();
  } catch (error) {
    console.error("Failed to log user in:", error)
  }
};