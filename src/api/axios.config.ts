import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { tokenEndPoits } from "./endpoints";

const axiosReq = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
});

axiosReq.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData)
      config.headers["Content-Type"] = "multipart/form-data";
    else config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosReq.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to token expiration
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call the refresh token endpoint
        const { data } = await axiosReq.post(
          tokenEndPoits.refreshToken,
          {},
          { withCredentials: true }
        );

        // Set the new access token in headers for the original request
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;

        // Retry the original request with the new token
        return axiosReq(originalRequest);
      } catch (err) {
        console.error("Failed to refresh access token", err);
        // Optionally: Redirect to login page or show an error
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosReq;
