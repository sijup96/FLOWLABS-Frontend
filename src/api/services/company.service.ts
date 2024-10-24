import axiosReq from "../axios.config";
import { companyEndPoints } from "../endpoints";
import { CompanyInfo } from "@/screens/company/CompanyProfile";

export const company = {
  login: async (body: {
    email: string;
    password: string;
    domainName: string;
  }) => {
    const response = await axiosReq.post(companyEndPoints.login, body);
    return response.data;
  },
  logout: async () => await axiosReq.post(companyEndPoints.logout),
  resetPassword: async (body: { password: string; domainName: string }) => {
    await axiosReq.put(companyEndPoints.resetPassword, body);
  },
  getDomainName: async (): Promise<string> => {
    const response = await axiosReq.get(companyEndPoints.getDomainName);
    return response.data.domainName;
  },
  getCompanyInfo: async () => {
    const response = await axiosReq.get(companyEndPoints.getCompanyInfo);
    return response.data;
  },
  updateCompany: async (body: Partial<CompanyInfo>) => {
    await axiosReq.put(companyEndPoints.updateCompany, body);
  },
  updateCompanyLogo: async (formData: FormData) => {
    await axiosReq.post(companyEndPoints.updateCompanylogo, formData);
  },
  addDepartment: async (body: object) => {
    await axiosReq.post(companyEndPoints.addDepartment, body);
  },
  getAllDepartments: async () => {
    const response = await axiosReq.get(companyEndPoints.getAllDepartmets);
    return response.data;
  },
  getDepartmentInfo: async (id: string) => {
    const response = await axiosReq.get(companyEndPoints.getDepartmentInfo, {
      params: { id },
    });
    return response.data;
  },
  updateDepartment: async (id: string, body: object) => {
    await axiosReq.put(companyEndPoints.updateDepartment, body, {
      params: { id },
    });
  },
};
