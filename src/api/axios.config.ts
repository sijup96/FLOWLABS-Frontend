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
    if (error.response.status === 403) {
      const pathSegments = window.location.pathname.split("/");
      const domainName = pathSegments[2];
      const currentPath = window.location.pathname;
      const loginPath = `/c/${domainName}/login`;
      if (currentPath !== loginPath) {
        if (error.response.data.message === "adminTokenError")
          window.location.href = "/admin/login";
        if (error.response.data.message === "hrTokenError") {
          window.location.href = loginPath;
        }
      }
    }
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      let errorMessage;
      let tokenPath = "";
      try {
        errorMessage = error.response.data.errors.message;

        // Set getToken path
        if (errorMessage === "adminAccessTokenError")
          tokenPath = tokenEndPoits.getAdminAccessToken;
        if (errorMessage === "hrAccessTokenError")
          tokenPath = tokenEndPoits.getHrAccessToken;
        if (errorMessage === "employeeAccessTokenError")
          tokenPath = tokenEndPoits.getEmployeeAccessToken;

        // Call the refresh token endpoint
        await axiosReq.post(tokenPath, {}, { withCredentials: true });
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
