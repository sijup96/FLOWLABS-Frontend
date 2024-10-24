export interface IProjectProps {
  name: string;
  slug: string;
  description: string;
  assignedTo: object;
  startDate: Date;
  endDate: Date;
  priority: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ICompanyProps {
  companyName: string;
  companySlug: string;
  industry: string;
  phone: string;
  email: string;
  password: string;
  logo?: string;
  description?: string;
  foundedDate?: Date;
  orderNo?: string;
  orderDate?: Date;
  plan?: string;
  serviceStatus?: string;
  paymentId?: string;
  isApproved?: string;
  createdAt?: Date;
  expiryDate?: Date;
  updatedAt?: Date;
}
export interface IDepartment {
  departmentName: string;
  slug: string;
  description: string;
  status: string;
  updatedAt?: Date;
  createdAt?: Date;
  _id?: string;
  isChecked?: boolean;
}
