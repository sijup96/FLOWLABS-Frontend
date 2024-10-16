import { employee } from "@/api/services/employee.service";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select2 } from "@/components/ui/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useDomain } from "@/hooks/useDomain";
import { fieldValidation } from "@/utils/validation";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { domain } = useDomain();
  const [activeTab, setActiveTab] = useState("employee-info");
  const [employeePhoto, setEmployeePhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    genderError: "",
    dobError: "",
    streetError: "",
    cityError: "",
    countryError: "",
    postalError: "",
    emailError: "",
    homePhoneError: "",
    workPhoneError: "",
    emergencyContactError: "",
    hireDateError: "",
    joiningDateError: "",
    salaryError: "",
    employeeTypeError: "",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    street: "",
    city: "",
    country: "",
    postal: "",
    email: "",
    homePhone: "",
    workPhone: "",
    emergencyContact: "",
    hireDate: "",
    joiningDate: "",
    salary: "",
    employeeType: "",
    department: "",
    designation: "",
    employeeId: "",
    status: "",
    role: "",
    shift: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    let errorMessage = "";
    switch (id) {
      case "firstName":
        errorMessage = fieldValidation.firstName(value)
          ? ""
          : "Invalid first name";
        setError((prev) => ({ ...prev, firstNameError: errorMessage }));
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployeePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  // Trigger file input on button click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await employee.add(formData);
    navigate(`/c/${domain}/employees`);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-700 rounded-lg overflow-hidden w-1/2">
            <div className="p-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">
                Add New Employee
              </h1>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
            <div className="flex">
              <div className="w-1/3 bg-slate-500 p-6">
                <div className="flex flex-col items-center">
                  <Avatar
                    className="w-44 h-44 mb-4"
                    src={employeePhoto || undefined}
                    alt="Employee photo"
                    fallback={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-24 w-24 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    }
                  />

                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <Button
                      variant="secondary"
                      className="mt-2"
                      onClick={triggerFileInput}
                    >
                      Choose file
                    </Button>
                  </Label>
                  <Button variant="default" className="mt-2">
                    Upload
                  </Button>
                </div>
              </div>
              <div className="w-2/3 bg-slate-400 p-6">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger
                      value="employee-info"
                      onClick={() => setActiveTab("employee-info")}
                      isActive={activeTab === "employee-info"}
                    >
                      Employee Info
                    </TabsTrigger>
                    <TabsTrigger
                      value="contact-info"
                      onClick={() => setActiveTab("contact-info")}
                      isActive={activeTab === "contact-info"}
                    >
                      Contact Info
                    </TabsTrigger>
                    <TabsTrigger
                      value="employment-info"
                      onClick={() => setActiveTab("employment-info")}
                      isActive={activeTab === "employment-info"}
                    >
                      Employment Info
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="employee-info"
                    activeValue={activeTab}
                    className="mt-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                        <p className="text-red-500 text-sm ml-2">
                          {error.firstNameError}
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                        {error.lastNameError && (
                          <span className="text-red-600 font-bold text-sm">
                            {error.lastNameError}
                          </span>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select2
                          id="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Select2>
                      </div>
                      <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={formData.dob}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          placeholder="Enter street address"
                          value={formData.street}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          placeholder="Enter country"
                          value={formData.country}
                          onChange={handleInputChange}
                        />{" "}
                      </div>
                      <div>
                        <Label htmlFor="postal">Postal Code</Label>
                        <Input
                          id="postal"
                          placeholder="Enter postal code"
                          value={formData.postal}
                          onChange={handleInputChange}
                        />{" "}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="contact-info"
                    activeValue={activeTab}
                    className="mt-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="homePhone">Home Phone</Label>
                        <Input
                          id="homePhone"
                          type="tel"
                          placeholder="Enter home phone"
                          value={formData.homePhone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="workPhone">Work Phone</Label>
                        <Input
                          id="workPhone"
                          type="tel"
                          placeholder="Enter work phone"
                          value={formData.workPhone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyContact">
                          Emergency Contact
                        </Label>
                        <Input
                          id="emergencyContact"
                          placeholder="Enter emergency contact"
                          value={formData.emergencyContact}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="employment-info"
                    activeValue={activeTab}
                    className="mt-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hireDate">Hire Date</Label>
                        <Input
                          id="hireDate"
                          type="date"
                          value={formData.hireDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="joiningDate">Joining Date</Label>
                        <Input
                          id="joiningDate"
                          type="date"
                          value={formData.joiningDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="salary">Salary</Label>
                        <Input
                          id="salary"
                          type="number"
                          placeholder="Enter salary"
                          value={formData.salary}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="employeeType">Employee Type</Label>
                        <Select2
                          id="employeeType"
                          value={formData.employeeType}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Type</option>
                          <option value="full-time">Full Time</option>
                          <option value="part-time">Part Time</option>
                          <option value="contract">Contract</option>
                        </Select2>
                      </div>
                      {/* Add more form fields as necessary */}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Button onClick={handleSubmit}>Add new Employee</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Employees = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openAddEmployee = () => {
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="font-extrabold text-white">Employees List</h1>
        <Button onClick={openAddEmployee}>Add Employee</Button>
      </div>

      <div className="min-h-screen bg-slate-600 p-6">
        {/* This can be your Employees list table component */}
        <div className="max-w-6xl mx-auto bg-slate-700 rounded-lg overflow-hidden">
          {/* Your Employees list table goes here */}
        </div>

        <AddEmployeeModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Employees;
