import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle logout or redirect to login
      console.error("Unauthorized, logging out...");
    }
    // Show error message
    return Promise.reject(error);
  },
);

export default axiosInstance;
