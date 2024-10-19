import React from 'react';

interface Department {
  _id: string;
  departmentName: string;
  description: string;
  status: 'active' | 'inactive'
}

interface DepartmentCardProps {
  department: Department;
  children?: React.ReactNode;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, children }) => {
  return (
    <div className="bg-slate-300 shadow-md p-4 rounded-md flex justify-between items-center"key={department._id}>
      <div>
        <h2 className="text-lg font-bold">{department.departmentName}</h2>
        <p>{department.description}</p>
        <p>
          <span className="font-semibold">Status: </span>
          {department.status}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DepartmentCard;
