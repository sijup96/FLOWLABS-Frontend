import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { company } from "@/api/services/company.service";
import { IDepartment } from "@/interface/company/I_company";
import companyProject from "@/api/services/company/project.service";
import { fieldValidation } from "@/utils/validation";

const CreateNewProject = () => {
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
    assignedTo: [] as IDepartment[],
    startDate: "",
    endDate: "",
    priority: "Low",
    status: "Pending",
  });

  const [errors, setErrors] = useState({
    nameError: "",
    descriptionError: "",
    assignedToError: "",
    startDateError: "",
    endDateError: "",
    priorityError: "",
    statusError: "",
  });

  // Fetch Departments
  const fetchDepartments = async () => {
    try {
      const data = await company.getAllDepartments();
      if (data && data.departmentList) {
        setProjectDetails((prev) => ({
          ...prev,
          assignedTo: data.departmentList,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Handle input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProjectDetails((prev) => ({ ...prev, [name]: value }));
    let errorMessage = "";
    switch (name) {
      case "name":
        errorMessage = fieldValidation.projectName(value)
          ? ""
          : "Invalid Project name.";
        setErrors((prev) => ({ ...prev, nameError: errorMessage }));
        break;
      case "description":
        errorMessage = fieldValidation.projectDescription(value)
          ? ""
          : "Invalid description";
        break;
      case "endDate": {
        const endDate = new Date(value);
        const startDate = new Date(projectDetails.startDate);
        if (!projectDetails.startDate) {
          errorMessage = "Select the start date";
          setErrors((prev) => ({ ...prev, startDateError: errorMessage }));
          break;
        }
        if (startDate > endDate) {
          errorMessage = "End date should be greater than start date";
          setErrors((prev) => ({ ...prev, endDateError: errorMessage }));
          break;
        }
        errorMessage = "";
        setErrors((prev) => ({ ...prev, startDateError: errorMessage }));
        break;
      }
      case "startDate": {
        if (!value) {
          errorMessage = "Select a valid start date";
          setErrors((prev) => ({ ...prev, startDateError: errorMessage }));
          break;
        }
        const startDate = new Date(value);
        const endDate = new Date(projectDetails.endDate);
        if (startDate > endDate) {
          errorMessage = "Start date should be less than end date.";
          setErrors((prev) => ({ ...prev, startDateError: errorMessage }));
          break;
        }
        errorMessage = "";
        setErrors((prev) => ({ ...prev, startDateError: errorMessage }));
      }
    }
  };

  // Validation function
  const validateFields = () => {
    const newErrors = {
      nameError: "",
      descriptionError: "",
      assignedToError: "",
      startDateError: "",
      endDateError: "",
      priorityError: "",
      statusError: "",
    };

    let isValid = true;

    if (!projectDetails.name.trim()) {
      newErrors.nameError = "Project name is required.";
      isValid = false;
    }

    if (!projectDetails.description.trim()) {
      newErrors.descriptionError = "Description is required.";
      isValid = false;
    }

    if (!projectDetails.assignedTo.some((resource) => resource.isChecked)) {
      newErrors.assignedToError = "At least one department must be assigned.";
      isValid = false;
    }

    if (!projectDetails.startDate) {
      newErrors.startDateError = "Start date is required.";
      isValid = false;
    }

    if (!projectDetails.endDate) {
      newErrors.endDateError = "End date is required.";
      isValid = false;
    }

    if (new Date(projectDetails.endDate) < new Date(projectDetails.startDate)) {
      newErrors.endDateError = "End date cannot be earlier than start date.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateFields()) {
      const selectedDepartments = projectDetails.assignedTo
        .filter((resource) => resource.isChecked)
        .map((x) => x._id);
        setProjectDetails((prev)=>({...prev,assignedTo:selectedDepartments}))
      try {
        // await companyProject.create({ ...projectDetails, selectedDepartments });
        alert("Project created successfully!");
      } catch (error) {
        console.error("Failed to create project:", error);
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          Create New Project
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Name */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-white mb-2">
                Project Name
              </label>
              <Input
                type="text"
                name="name"
                value={projectDetails.name}
                onChange={handleChange}
                placeholder="Enter project name"
                className="w-full bg-white bg-opacity-50 placeholder-gray-500 text-gray-900"
              />
              <p className="text-red-500 ml-2 font-medium">
                {errors.nameError}
              </p>
            </motion.div>

            {/* Departments */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-3">
                <label className="block text-md font-medium text-white mb-2">
                  Add Resources To
                </label>
                <div className="grid grid-cols-2 font-medium m-2">
                  {projectDetails.assignedTo.map((resource) => (
                    <div
                      key={resource._id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={resource._id}
                        checked={resource.isChecked || false}
                        onChange={() => {
                          const updatedResources =
                            projectDetails.assignedTo.map((item) =>
                              item._id === resource._id
                                ? { ...item, isChecked: !item.isChecked }
                                : item
                            );
                          setProjectDetails((prev) => ({
                            ...prev,
                            assignedTo: updatedResources,
                          }));
                          setErrors((prev) => ({
                            ...prev,
                            assignedToError: "", // Clear error if user selects a department
                          }));
                        }}
                      />
                      <label
                        htmlFor={resource._id}
                        className="text-md text-white"
                      >
                        {resource.departmentName}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-red-500 ml-2 font-medium">
                  {errors.assignedToError}
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="md:col-span-2"
            >
              <label className="block text-sm font-medium text-white mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={projectDetails.description}
                onChange={handleChange}
                placeholder="Enter project description"
                className="w-full mt-1 p-2 bg-white bg-opacity-50 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900"
                rows={4}
              />
              <p className="text-red-500 ml-2 font-medium">
                {errors.descriptionError}
              </p>
            </motion.div>

            {/* Start Date */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-white mb-2">
                Start Date
              </label>
              <Input
                type="date"
                name="startDate"
                value={projectDetails.startDate}
                onChange={handleChange}
                className="w-full bg-white bg-opacity-50 text-gray-900"
              />
              <p className="text-red-500 ml-2 font-medium">
                {errors.startDateError}
              </p>
            </motion.div>

            {/* End Date */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-white mb-2">
                End Date
              </label>
              <Input
                type="date"
                name="endDate"
                value={projectDetails.endDate}
                onChange={handleChange}
                className="w-full bg-white bg-opacity-50 text-gray-900"
              />
              <p className="text-red-500 ml-2 font-medium">
                {errors.endDateError}
              </p>
            </motion.div>

            {/* Priority */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-white mb-2">
                Priority
              </label>
              <Select
                value={projectDetails.priority}
                onChange={(e) => {
                  setProjectDetails((prev) => ({
                    ...prev,
                    priority: e.target.value,
                  }));
                }}
                className="w-full bg-white bg-opacity-50 text-gray-900"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
              <p className="text-red-500 ml-2 font-medium">
                {errors.priorityError}
              </p>
            </motion.div>

            {/* Status */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-white mb-2">
                Status
              </label>
              <Select
                value={projectDetails.status}
                onChange={(e) => {
                  setProjectDetails((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }));
                }}
                className="w-full bg-white bg-opacity-50 text-gray-900"
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </Select>
              <p className="text-red-500 ml-2 font-medium">
                {errors.statusError}
              </p>
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              type="submit"
              className="px-8 py-3 bg-white text-green-800 rounded-full hover:bg-opacity-95 transition-colors duration-300"
            >
              Create Project
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateNewProject;
