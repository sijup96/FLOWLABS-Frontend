import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CompanySidebar = ({domain}:{domain:string}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [domainName,setDomainName]=useState(domain)
  useEffect(()=>{
    setDomainName(domain)
  },[domain])

  const menuItems = [
    { name: "Home", path: `/c/${domainName}/home` },
    { name: "Announcements", path: `/c/${domainName}/announcements` },
    { name: "Projects", path: `/c/${domainName}/projects` },
    { name: "Departments", path: `/c/${domainName}/departments` },
    { name: "Attendance", path: `/c/${domainName}/attendance` },
    { name: "Employees", path: `/c/${domainName}/employees` },
    { name: "My Payroll", path: `/c/${domainName}/payroll` },
    { name: "Leave Management", path: `/c/${domainName}/leave-management` },
    { name: "Credit", path: `/c/${domainName}/credit` },
    { name: "Recruitment", path: `/c/${domainName}/recruitment` },
    { name: "Assets", path: `/c/${domainName}/assets` },
    { name: "Schedule Meeting", path: `/c/${domainName}/schedule-meeting` },
    { name: "Complaints", path: `/c/${domainName}/complaints` },
  ];

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8 text-2xl font-bold">COMPANY LOGO</div>
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`py-2 px-4 hover:bg-gray-700 cursor-pointer rounded ${
            isActive(item.path) ? "bg-gray-300 text-black" : ""
          }`}
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default CompanySidebar;
