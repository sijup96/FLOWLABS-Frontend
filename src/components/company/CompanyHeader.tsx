import { ICompanyProps } from "@/interface/company/I_company";
import { useAppSelector } from "@/redux/store";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Bell, Mail, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CompanyHeader = () => {
  const {data,loading}=useAppSelector((state)=>state.company)
  const [companyInfo,setCompanyInfo]=useState<ICompanyProps|null>()
  useEffect(()=>{
    setCompanyInfo(data)
  },[data])
  return (
    <div className=" w-full">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Menu className="mr-4" />
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="text-red-600 cursor-pointer" />
          <Mail className="text-red-600 cursor-pointer" />
          <Link to={`/c/${companyInfo?.companySlug}/profile`}>
            <div className="w-8 h-8 rounded-full cursor-pointer">
              {loading ? (
                <AvatarIcon className="w-8 h-8" />
              ) : (
                <img src={companyInfo?.logo} alt="" />
              )}
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default CompanyHeader;
