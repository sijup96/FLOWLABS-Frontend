import CompanyLayout from "@/components/company/CompanyLayout";
import CompanyFirstLogin from "@/screens/company/CompanyFirstLogin";
import CompanyHome from "@/screens/company/CompanyHome";
import CompanyLogin from "@/screens/company/CompanyLogin";
import CompanyProfile from "@/screens/company/CompanyProfile";
import { Route, Routes } from "react-router-dom";
import HrProtectedRoute from "./HrProtectedRoute";
import NotFound from "@/screens/NotFound";
import Projects from "@/screens/company/Projects";
import CreateNewProject from "@/screens/company/CreateNewProject";
import DomainProvider from "@/context/DomainProvider";
import Departments from "@/screens/company/Departments";
import Employees from "@/screens/company/Employees";
import DepartmentEdit from "@/screens/company/DepartmentEdit";

const CompanyRoutes = () => {

  return(
    <DomainProvider>
      <Routes>
        <Route path="/login" element={<CompanyLogin />} />
        <Route path="/isFirstTime" element={<CompanyFirstLogin />} />
        <Route element={<CompanyLayout />}>
          <Route element={<HrProtectedRoute />}>
            <Route path="/home" element={<CompanyHome />} />
            <Route path="/profile" element={<CompanyProfile />} />

            <Route path="/projects" element={<Projects />} />
            <Route path="/project/create" element={<CreateNewProject />} />

            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:id/edit" element={<DepartmentEdit />} />
            <Route path="/employees" element={<Employees />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DomainProvider>
  );
};

export default CompanyRoutes;
