import React from 'react';

interface Department {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive'
  departmentHead: string;
}

interface DepartmentCardProps {
  department: Department;
  children?: React.ReactNode;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, children }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md flex justify-between items-center">
      <div>
        <h2 className="text-lg font-bold">{department.name}</h2>
        <p>{department.description}</p>
        <p>
          <span className="font-semibold">Status: </span>
          {department.status}
        </p>
        <p>
          <span className="font-semibold">Department Head: </span>
          {department.departmentHead}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DepartmentCard;
