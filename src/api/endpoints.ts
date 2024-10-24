export const tokenEndPoits = {
  getAdminAccessToken: "/getAdminAccessToken",
  getHrAccessToken: "/getHrAccessToken",
  getEmployeeAccessToken: "/getEmployeeAccessToken",
};
export const userEndPoints = {
  verifyEmail: "/otp",
  signUp: "signUp",
  googleAuth: "googleAuth",
};
export const adminEndpoints = {
  login: "admin/login",
  logout: "admin/logout",
  userRequests: "admin/userRequests",
  approvelRequests: "admin/approvelRequest",
};
export const isLoggedIn = "/isLoggedIn";

export const companyEndPoints = {
  login: "company/login",
  logout:"company/logout",
  isLoggedIn: "/company/isLoggedIn",
  resetPassword: "/company/resetPassword",
  getDomainName: "/getDomainName",
  getCompanyInfo: "/company/getCompanyInfo",
  updateCompany: "/company/updateCompany",
  updateCompanylogo: "/company/updateLogo",
  addDepartment: "/company/addDepartment",
  getAllDepartmets: "company/getAllDepartments",
  getDepartmentInfo: "company/getDepartmentInfo",
  updateDepartment: "/company/updateDepartment",
};
export const companyProjectEndPoints={
  create:'/company/project/create'
}
export const employeeEndPoints = {
  add: "employee/add",
};
