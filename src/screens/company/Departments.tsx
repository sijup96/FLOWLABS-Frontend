import React, { useEffect, useState } from "react";
import DepartmentCard from "@/components/company/DepartmentCard";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { fieldValidation } from "@/utils/validation";
import { company } from "@/api/services/company.service";
import { AxiosError } from "axios";
import { useDomain } from "@/hooks/useDomain";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface DepartmentProps {
  _id: string;
  departmentName: string;
  description: string;
  status: "active" | "inactive";
}

const Departments = () => {
  const [departments, setDepartments] = useState<DepartmentProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { domain, loading } = useDomain();
  const [newDepartment, setNewDepartment] = useState({
    departmentName: "",
    description: "",
    status: "active",
  });
  const [error, setError] = useState({
    departmentNameError: "",
    descriptionError: "",
  });

  // Fetch departments
  const fetchAlldepartments = async () => {
    const data = await company.getAllDepartments();
    setDepartments(data.departmentList);
  };
  useEffect(() => {
    fetchAlldepartments();
  }, []);
  // Toggle Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewDepartment((prev) => ({ ...prev, [name]: value }));
    let errorMessage = "";
    switch (name) {
      case "departmentName":
        errorMessage = fieldValidation.firstName(value)
          ? ""
          : "Invalid department name.";
        setError((prev) => ({ ...prev, departmentNameError: errorMessage }));
        break;
      case "description":
        errorMessage = fieldValidation.description(value)
          ? ""
          : "Need word count between 3 to 10";
        setError((prev) => ({ ...prev, descriptionError: errorMessage }));
        break;
    }
  };

  // Submit new department form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error.departmentNameError !== "" || error.descriptionError !== "")
      return;
    try {
      await company.addDepartment(newDepartment);
      toggleModal();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        const { errors } = error.response.data;
        setError({
          departmentNameError: errors.departmentNameError || "",
          descriptionError: errors.descriptionError || "",
        });
      }
    }
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center bg-gray-400 p-4 mb-4">
        <h1 className="text-xl font-bold">Departments</h1>
        <Button variant="destructive" onClick={toggleModal}>
          Add New Department
        </Button>
      </div>
      {/* Department List */}
      <div className="grid grid-cols-1 gap-4">
        {departments.map((department) => (
          <DepartmentCard key={department._id} department={department}>
            <Link to={`/c/${domain}/departments/${department._id}/edit`}>
              <Button variant="secondary" className="ml-4 flex items-center">
                <PencilIcon className="h-5 w-5 mr-1" />
                Edit
              </Button>
            </Link>
          </DepartmentCard>
        ))}
      </div>
      {/* Modal for Adding Department */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${
          isModalOpen ? "opacity-100 visible " : "opacity-0 invisible"
        }`}
      >
        <div
          className={`bg-slate-400 p-6 rounded-md shadow-lg w-full max-w-md transition-transform duration-500 transform ${
            isModalOpen ? "scale-100" : "scale-0"
          }`}
        >
          <h2 className="text-lg font-bold mb-4">Add New Department</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="departmentName"
              >
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                name="departmentName"
                value={newDepartment.departmentName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
              {error.departmentNameError && (
                <p className="text-red-600 pl-2">{error.departmentNameError}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newDepartment.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
              {error.descriptionError && (
                <p className="text-red-600 pl-2">{error.descriptionError}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="status"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={newDepartment.status}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="secondary" type="button" onClick={toggleModal}>
                Cancel
              </Button>
              <Button variant="destructive" type="submit">
                Add Department
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Departments;
