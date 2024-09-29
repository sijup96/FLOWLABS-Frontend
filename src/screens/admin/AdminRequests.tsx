import admin from "@/api/services/admin.service";
import React, { useEffect, useState } from "react";
import fallbackImage from "../../public/assets/icons/20823959.jpg";
import { Button } from "@/components/ui/button";

interface Company {
  [key: string]: [
    {
      _id: string;
      logo: string;
      companyName: string;
      companySlug: string;
      industry: string;
      email: string;
      createdAt: string;
      isApproved: boolean;
      plan: string;
      serviceStatus: string;
    }
  ];
}
const AdminRequests = () => {
  const [company, setCompany] = useState<Company>({});
  const fetchCompanyRequests = async () => {
    try {
      const data = await admin.userRequests();
      setCompany(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCompanyRequests();
  }, []);
  const handleApprovel = async (isApproved: boolean, companySlug: string) => {
    if (isApproved) {
      console.log(isApproved);
      await admin.approvelRequest({ isApproved, companySlug });
    } else {
      console.log("notApproved", isApproved);
      await admin.approvelRequest({ isApproved, companySlug });
    }
  };
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
          <p className="text-sm text-gray-500 mt-1">
            A list of all the companies in your account including their name,
            industry, created by, and status.
          </p>
        </div>
        {/* <Button>Add Company</Button> */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50 ">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Company Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Industry
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created By
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Plan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
              >
                Approvel
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {company &&
              Object.keys(company).map((key) => {
                const companyData = company[key][0]; // Get the first object from each company array
                return (
                  <tr key={companyData._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4 flex text-center items-center align-middle p-1">
                          <div className="text-sm text-gray-500">
                            <img
                              src={
                                companyData.logo
                                  ? companyData.logo
                                  : fallbackImage
                              }
                              alt="Company Logo"
                              className="w-14 h-14 object-contain rounded-full"
                            />
                          </div>
                          <div className="text-sm font-medium text-gray-900 ml-3">
                            {companyData.companyName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {companyData.industry}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {companyData.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {companyData.plan}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        className="bg-green-600 text-white hover:bg-green-400"
                        onClick={() =>
                          handleApprovel(true, companyData.companySlug)
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        className="bg-red-700 text-white ml-2 hover:bg-red-500"
                        onClick={() =>
                          handleApprovel(false, companyData.companySlug)
                        }
                      >
                        Decline
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRequests;
