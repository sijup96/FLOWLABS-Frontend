import React, { ReactNode } from 'react';

export const Select = ({
  value,
  onChange,
  children,
  className = '',
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`form-select mt-1 block w-full border-gray-300 rounded-md shadow-sm ${className}`}
    >
      {children}
    </select>
  );
};
// Select Component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode
}

export const Select2: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select
      {...props}
      className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      {children}
    </select>
  )
}