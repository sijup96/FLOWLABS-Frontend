import React, { useState } from 'react';
import DepartmentCard from '@/components/company/DepartmentCard';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DepartmentProps {
  id: number;
  name: string;
  description: string;
  departmentHead: string;
  status: 'active'|'inactive';
}

const Departments = () => {
  const [departments, setDepartments] = useState<DepartmentProps[]>([    {
    id: 1,
    name: 'Marketing',
    description: 'Handles all marketing activities.',
    status: 'active', // Correctly typed
    departmentHead: 'John Doe',
  },
  {
    id: 2,
    name: 'Development',
    description: 'Responsible for software development.',
    status: 'inactive', // Correctly typed
    departmentHead: 'Jane Smith',
  },]); // Specify the type here
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
    departmentHead: '',
    status: 'active',
  });

  // Toggle Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDepartment((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new department form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add the new department to the list

    toggleModal(); // Close modal after adding department
    // Clear form fields
    setNewDepartment({ name: '', description: '', departmentHead: '', status: 'active' });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center bg-gray-300 p-4 mb-4">
        <h1 className="text-xl font-bold">Departments</h1>
        <Button variant="destructive" onClick={toggleModal}>
          Add New Department
        </Button>
      </div>

      {/* Department List */}
      <div className="grid grid-cols-1 gap-4">
        {departments.map((department) => (
          <DepartmentCard key={department.id} department={department}>
            <Link to={`/departments/${department.id}/edit`}>
              <Button variant="secondary" className="ml-4 flex items-center">
                <PencilIcon className="h-5 w-5 mr-1" />
                Edit
              </Button>
            </Link>
          </DepartmentCard>
        ))}
      </div>

      {/* Modal for Adding Department */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Add New Department</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Department Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newDepartment.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="description">
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
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="departmentHead">
                  Department Head
                </label>
                <input
                  type="text"
                  id="departmentHead"
                  name="departmentHead"
                  value={newDepartment.departmentHead}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="status">
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
      )}
    </div>
  );
};

export default Departments;
