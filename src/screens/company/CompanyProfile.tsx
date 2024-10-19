import React, { useEffect, useState } from "react";
import { company } from "@/api/services/company.service";
import { Button } from "@/components/ui/button";
import { Input3 } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ConfirmationDialog from "@/components/company/ConfirmationDialog";
import toast, { Toaster } from "react-hot-toast";
import { fieldValidation } from "@/utils/validation";

export interface CompanyInfo {
  companyName: string;
  companySlug: string;
  industry: string;
  phone: string;
  email: string;
  logo: string;
  description: string;
  foundedDate: string;
  orderNo: string;
  orderDate: string;
  plan: string;
  serviceStatus: string;
  paymentId: string;
  createdAt: string;
  expiryDate: string;
}

const CompanyProfile = () => {
  const [info, setInfo] = useState<CompanyInfo>({
    companyName: "",
    companySlug: "",
    industry: "",
    phone: "",
    email: "",
    logo: "",
    description: "",
    foundedDate: "",
    orderNo: "",
    orderDate: "",
    plan: "",
    serviceStatus: "",
    paymentId: "",
    createdAt: "",
    expiryDate: "",
  });
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "Cancel",
    onConfirm: () => {},
  });
  const [initialInfo, setInitialInfo] = useState<CompanyInfo>(info);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [errors, setErrors] = useState({
    phoneError: "",
    foundedDateError: "",
    descriptionError: "",
  });

  const fetchCompanyInfo = async () => {
    try {
      const data = await company.getCompanyInfo();
      if (data && data.companyData) {
        setInfo(data.companyData);
        setInitialInfo(data.companyData); // Set the initial state
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetching company info:", error);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    let errorMessage = "";
    switch (name) {
      case "phone":
        errorMessage = fieldValidation.phone(value)
          ? ""
          : "Invalid phone number.";
        setErrors((prev) => ({ ...prev, phoneError: errorMessage }));
        break;
      case "foundedDate":
        errorMessage = fieldValidation.foundedDate(value)
          ? ""
          : "Date must be less than Today.";
        setErrors((prev) => ({ ...prev, foundedDateError: errorMessage }));
        break;
      case "description":
        errorMessage = fieldValidation.description(value)
          ? ""
          : "Description length between 3 to 10";
        setErrors((prev) => ({ ...prev, descriptionError: errorMessage }));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setInfo((prevInfo) => ({ ...prevInfo, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // Create an object to hold only the updated fields
    const updatedFields: Partial<CompanyInfo> = {};

    for (const key in info) {
      if (
        info[key as keyof CompanyInfo] !== initialInfo[key as keyof CompanyInfo]
      ) {
        updatedFields[key as keyof CompanyInfo] =
          info[key as keyof CompanyInfo];
      }
    }
    setDialogConfig({
      isOpen: true,
      title: "Are you sure?",
      message: "Are you sure, You want to update your profile?",
      confirmText: "Yes, approve it!",
      cancelText: "Cancel",
      onConfirm: async () => {
        if (Object.keys(updatedFields).length > 0) {
          console.log("Updating with the following fields:", updatedFields);
          try {
            await company.updateCompany(updatedFields);
            // Optionally, you can update the initialInfo state to reflect the changes
            setInitialInfo(info);
            toast.success("Updated successfully.");
          } catch (error) {
            toast.error("check your input values ");
            console.log("Error updating company info:", error);
          }
        } else {
          toast.error("No fields were changed.");
          console.log("No fields were changed.");
        }
      },
    });
  };
  const closeDialog = () => {
    setDialogConfig({ ...dialogConfig, isOpen: false });
  };
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("company_logo", selectedFile);
    toast.success("Updating... please wait.");
    await company.updateCompanyLogo(formData);
    toast.success("File uploaded successfully");
  };
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="min-h-screen bg-gray-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-slate-200 shadow-xl rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="relative">
              <img
                src={info.logo || "/placeholder.svg?height=128&width=128"}
                alt={info.companyName}
                className="w-32 h-32 rounded-full object-cover border-4 border-black"
              />
              <label
                htmlFor="logo-upload"
                className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                name="image"
                onChange={handleLogoChange}
                className="hidden"
              />
            </div>
            <Button onClick={handleUpload}>Upload</Button>
            <h1 className="text-3xl font-bold text-gray-800">
              {info.companyName}
            </h1>
            <p className="text-lg text-blue-600">@{info.companySlug}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Company Details</h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <Input3
                    id="phone"
                    name="phone"
                    value={info.phone}
                    onChange={handleChange}
                  />
                  <p className="text-red-600">{errors.phoneError}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 text-gray-900">{info.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <p className="mt-1 text-gray-900">{info.industry}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Founded Date
                  </label>
                  <div>
                    <input
                      type="date"
                      id="foundedDate"
                      name="foundedDate"
                      value={
                        info.foundedDate
                          ? new Date(info.foundedDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <p className="text-red-600">{errors.foundedDateError}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                Subscription Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Plan
                  </label>
                  <p className="mt-1 text-gray-900">{info.plan}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Status
                  </label>
                  <p className="mt-1 text-gray-900">{info.serviceStatus}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Order Number
                  </label>
                  <p className="mt-1 text-gray-900">
                    {info.orderNo || "XXXXXXXXX"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Order Date
                  </label>
                  <p className="mt-1 text-gray-900">
                    {new Date(info.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment ID
                  </label>
                  <p className="mt-1 text-gray-900">
                    {info.paymentId || "XXXXXXXXX"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <p className="mt-1 text-gray-900">
                    {new Date(info.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Company Description</h2>
            <Textarea
              name="description"
              value={info.description}
              onChange={handleChange}
              rows={6}
            />
            <p className="text-red-600">{errors.descriptionError}</p>
          </div>

          <div className="mt-8 flex justify-center">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
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
      <Toaster position="top-center" />
    </div>
  );
};

export default CompanyProfile;
