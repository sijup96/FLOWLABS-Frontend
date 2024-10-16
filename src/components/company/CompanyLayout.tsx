import { Outlet } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";
import CompanySidebar from "./CompanySidebar";
import { useEffect, useState } from "react";
import { company } from "@/api/services/company.service";

// Sidebar
const CompanyLayout = () => {
    const [domain,setDomain]=useState('')

    const fetchDomainName=async()=>{
        const data= await company.getDomainName()
        setDomain(data)
    }
    useEffect(()=>{
        fetchDomainName()
        
    },[])
  return (
    <div className="flex">
      <CompanySidebar domain={domain}/>
      <div className="w-full"><CompanyHeader domain={domain}/>
      <menu className="bg-gray-600 min-h-screen">
        <Outlet />
      </menu></div>
    </div>
  );
};

export default CompanyLayout;
