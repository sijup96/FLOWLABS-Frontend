import axiosReq from "@/api/axios.config";
import { tokenEndPoits } from "@/api/endpoints";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const HrProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    await axiosReq.post(tokenEndPoits.getHrAccessToken);
    setIsAuthenticated(true);
    setIsLoading(false);
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return !isLoading && isAuthenticated ? <Outlet /> : <LoadingSpinner />;
};

export default HrProtectedRoute;
