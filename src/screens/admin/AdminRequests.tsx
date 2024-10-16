import { useEffect, useState } from "react";
import admin from "@/api/services/admin.service";
import fallbackImage from "../../public/assets/icons/20823959.jpg";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/company/ConfirmationDialog";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<AxiosError | null>();
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "Cancel",
    onConfirm: () => {},
  });

  const fetchCompanyRequests = async () => {
    setLoading(true);
    try {
      const data = await admin.userRequests();
      setCompany(data);
    } catch (error) {
      console.log(error)
      // if (error instanceof AxiosError && error.status===403){
      //    setError(error);
      // }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyRequests();
  }, []);

  // if (error) throw error;
  const handleApproval = (isApproved: boolean, companySlug: string) => {
    setDialogConfig({
      isOpen: true,
      title: "Are you sure?",
      message: isApproved
        ? "You are about to approve this company. This action cannot be undone."
        : "You are about to decline this company.",
      confirmText: isApproved ? "Yes, approve it!" : "Yes, decline it!",
      cancelText: "Cancel",
      onConfirm: async () => {
        await admin.approvelRequest({ isApproved, companySlug });
        fetchCompanyRequests(); // Refresh the company list after approval/decline
      },
    });
  };

  const closeDialog = () => {
    setDialogConfig({ ...dialogConfig, isOpen: false });
  };

  return (
    <div className="w-full p-6 bg-slate-400">
      <div className="flex justify-center items-center mb-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
          <p className="text-sm text-gray-900 mt-1">
            A list of all the companies in your account including their name,
            industry, created by, and status.
          </p>
        </div>
      </div>

      {/* Table Wrapper */}
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-300">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Company Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Industry
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created By
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Plan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Approval
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-100 divide-y divide-gray-200">
            {loading ? ( // Conditional rendering based on loading state
              <tr>
                <td colSpan={5} className="text-center py-4">
                  <LoadingSpinner /> {/* Your loading spinner or component */}
                </td>
              </tr>
            ) : (
              company &&
              Object.keys(company).map((key) => {
                const companyData = company[key][0];
                return (
                  <tr key={companyData._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <div className="ml-4 flex text-center items-center align-middle p-1">
                          <img
                            src={companyData.logo || fallbackImage}
                            alt="Company Logo"
                            className="w-14 h-14 object-contain rounded-full"
                          />
                          <div className="text-sm font-medium text-gray-900 ml-3">
                            {companyData.companyName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900">
                        {companyData.industry}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900">
                        {companyData.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-500">
                        {companyData.plan}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          className="bg-green-600 text-white hover:bg-green-400"
                          onClick={() =>
                            handleApproval(true, companyData.companySlug)
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          className="bg-red-700 text-white hover:bg-red-500"
                          onClick={() =>
                            handleApproval(false, companyData.companySlug)
                          }
                        >
                          Decline
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Dialog component for confirmation */}
      <ConfirmationDialog
        isOpen={dialogConfig.isOpen}
        onClose={closeDialog}
        onConfirm={dialogConfig.onConfirm}
        title={dialogConfig.title}
        message={dialogConfig.message}
        confirmText={dialogConfig.confirmText}
        cancelText={dialogConfig.cancelText}
      />
    </div>
  );
};

export default AdminRequests;
