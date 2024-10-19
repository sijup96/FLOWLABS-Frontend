import { company } from "@/api/services/company.service";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { fieldValidation } from "@/utils/validation";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface DepartmentProps {
  _id: string;
  departmentName: string;
  description: string;
  status: "active" | "inactive";
}

const DepartmentEdit = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  const [newDepartment, setNewDepartment] = useState<DepartmentProps>({
    _id: "",
    departmentName: "",
    description: "",
    status: "active", // Set a default value to avoid `undefined`
  });

  const [error, setError] = useState({
    departmentNameError: "",
    descriptionError: "",
  });

  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchDepartmentInfo = async (id: string) => {
      try {
        const data = await company.getDepartmentInfo(id);
        const {departmentInfo}=data
        setNewDepartment(departmentInfo);
      } catch (error) {
        console.error("Failed to fetch department info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDepartmentInfo(id);
    } else {
      setLoading(false); 
    }
  }, [id]);

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

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error.departmentNameError !== "" || error.descriptionError !== "")
      return;
    try {
      await company.updateDepartment(newDepartment._id, newDepartment);
      navigate(-1)
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

  if (loading) {
    return <LoadingSpinner/>
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center `}
    >
      <div className={`bg-slate-400 p-6 rounded-md shadow-lg w-full max-w-xl `}>
        <h2 className="text-lg font-bold mb-4">Edit Department</h2>
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
              value={newDepartment.departmentName || ""} 
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
              value={newDepartment.description || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
            {error.descriptionError && (
              <p className="text-red-600 pl-2">{error.descriptionError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={newDepartment.status || "active"} 
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="secondary" type="button" onClick={()=>navigate(-1)}>
              Cancel
            </Button>
            <Button variant="destructive" type="submit">
              Update Department
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentEdit;
