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

    const data = response.json();

    if (!response.ok) {
      throw new Error("Failed to log user in");
    }
    return data;
  } catch (error) {
    console.error("Failed to log user in:", error)
  }
};

export const registerUser = async (email: string, username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("Failed to sign up user:", error);
  }
};