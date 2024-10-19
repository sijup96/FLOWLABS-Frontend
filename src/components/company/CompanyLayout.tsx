import { Outlet } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";
import CompanySidebar from "./CompanySidebar";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { fetchCompanyData } from "@/redux/slices/companySlice";

// Sidebar
const CompanyLayout = () => {
  const dispatch=useAppDispatch()
  useEffect(() => {
    dispatch(fetchCompanyData());
  }, [dispatch]);
  return (
    <div className="flex">
      <CompanySidebar />
      <div className="w-full">
        <CompanyHeader />
        <menu className="bg-gray-600 min-h-screen">
          <Outlet />
        </menu>
      </div>
    </div>
  );
};

export default CompanyLayout;
