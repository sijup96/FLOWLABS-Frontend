import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BellIcon,
  FileTextIcon,
  PersonIcon,
  CalendarIcon,
  GearIcon,
  ArchiveIcon,
  ChatBubbleIcon,
  CrumpledPaperIcon,
  CookieIcon,
} from "@radix-ui/react-icons";
import { useAppSelector } from "@/redux/store";

const CompanySidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [domainName,setDomainName]=useState<string>()
  const {data}=useAppSelector((state)=>state.company)
  
useEffect(()=>{
  setDomainName(data?.companySlug)
},[data])
  const menuItems = [
    {
      name: "Home",
      path: `/c/${domainName}/home`,
      icon: <HomeIcon className=" text-red-500 w-8 h-8" />,
    },
    {
      name: "Announcements",
      path: `/c/${domainName}/announcements`,
      icon: <BellIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Projects",
      path: `/c/${domainName}/projects`,
      icon: <FileTextIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Departments",
      path: `/c/${domainName}/departments`,
      icon: <PersonIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Attendance",
      path: `/c/${domainName}/attendance`,
      icon: <CalendarIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Employees",
      path: `/c/${domainName}/employees`,
      icon: <PersonIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "My Payroll",
      path: `/c/${domainName}/payroll`,
      icon: <CrumpledPaperIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Leave Management",
      path: `/c/${domainName}/leave-management`,
      icon: <CalendarIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Credit",
      path: `/c/${domainName}/credit`,
      icon: <CookieIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Assets",
      path: `/c/${domainName}/assets`,
      icon: <ArchiveIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Schedule Meeting",
      path: `/c/${domainName}/schedule-meeting`,
      icon: <GearIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Complaints",
      path: `/c/${domainName}/complaints`,
      icon: <ChatBubbleIcon className="text-red-500 w-8 h-8" />,
    },
  ];

  const isActive = (path: string) => {
    
    const name=path.split('/')
   const uri= location.pathname.split('/');
   return uri.includes(name[3])
  }

  return (
    <div className="w-72 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8 text-2xl font-bold">COMPANY LOGO</div>
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`py-2 px-4 hover:bg-gray-700 hover:text-red-600 cursor-pointer rounded flex items-center gap-x-2 transition-colors duration-200 border-y border-yellow-900  ${
            isActive(item.path) ? "bg-gray-300 text-black" : ""
          }`}
          onClick={() => navigate(item.path)}
        >
          <div className="flex items-center gap-x-2">
            {item.icon}
            <span className="font-bold">{item.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanySidebar;
