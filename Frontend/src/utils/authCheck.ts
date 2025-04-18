import axios from "axios";
  const API_URL = process.env.REACT_APP_URL;

export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/protected-route`,
      { withCredentials: true }
    );
    if (response.status === 200) {
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.log("User is not authenticated. Redirecting to login...");
      } else {
        console.error("Unexpected Axios Error:", error.message);
      }
    } else {
      console.error("Unknown Error:", error);
    }
  }

  // Ensure function always returns a boolean
  localStorage.setItem("isAuthenticated", "false");
  return false;
};
