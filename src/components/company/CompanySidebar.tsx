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
import { ShimmerSidebar } from "../ui/Shimmer";

const CompanySidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [domainName, setDomainName] = useState<string>("");
  const { data, loading } = useAppSelector((state) => state.company);

  // Set domainName when data is available
  useEffect(() => {
    if (data?.companySlug) {
      setDomainName(data.companySlug);
    }
  }, [data]);

  const menuItems = [
    {
      name: "Home",
      path: `/c/${domainName || "default"}/home`, // Fallback to 'default' if domainName is empty
      icon: <HomeIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Announcements",
      path: `/c/${domainName || "default"}/announcements`,
      icon: <BellIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Projects",
      path: `/c/${domainName || "default"}/projects`,
      icon: <FileTextIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Departments",
      path: `/c/${domainName || "default"}/departments`,
      icon: <PersonIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Attendance",
      path: `/c/${domainName || "default"}/attendance`,
      icon: <CalendarIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Employees",
      path: `/c/${domainName || "default"}/employees`,
      icon: <PersonIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "My Payroll",
      path: `/c/${domainName || "default"}/payroll`,
      icon: <CrumpledPaperIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Leave Management",
      path: `/c/${domainName || "default"}/leave-management`,
      icon: <CalendarIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Credit",
      path: `/c/${domainName || "default"}/credit`,
      icon: <CookieIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Assets",
      path: `/c/${domainName || "default"}/assets`,
      icon: <ArchiveIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Schedule Meeting",
      path: `/c/${domainName || "default"}/schedule-meeting`,
      icon: <GearIcon className="text-red-500 w-8 h-8" />,
    },
    {
      name: "Complaints",
      path: `/c/${domainName || "default"}/complaints`,
      icon: <ChatBubbleIcon className="text-red-500 w-8 h-8" />,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-72 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8 text-2xl font-bold">COMPANY LOGO</div>
      {loading ? (
        <ShimmerSidebar />
      ) : (
        <div>
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`py-2 px-4 hover:bg-gray-700 hover:text-red-600 cursor-pointer rounded flex items-center gap-x-2 transition-colors duration-200 border-y border-yellow-900 ${
                isActive(item.path) ? "bg-gray-300 text-black" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-center gap-x-2">
                {item.icon}
                <span className="font-bold">{item.name}</span>
              </div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default CompanySidebar;
