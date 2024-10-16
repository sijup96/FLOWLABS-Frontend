import { ReactNode } from "react";

// Tabs Component
interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string; // Add className here
}

export const Tabs: React.FC<TabsProps> = ({ children, className }) => {
  return <div className={`tabs ${className}`}>{children}</div>; 
};

export const TabsList: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
    return <div className={`flex border-b ${className}`}>{children}</div>; 
  };
  
  interface TabsTriggerProps {
    value: string;
    onClick: () => void;
    isActive: boolean;
    children: ReactNode;
  }
  
  export const TabsTrigger: React.FC<TabsTriggerProps> = ({ onClick, isActive, children }) => {
    return (
      <button
        className={`px-4 py-2 ${
          isActive ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  

  interface TabsContentProps {
    value: string;
    activeValue: string; 
    className?: string;
    children: React.ReactNode;
  }
  
  export const TabsContent: React.FC<TabsContentProps> = ({ value, activeValue, className, children }) => {
    if (value !== activeValue) return null; // Compare value and activeValue to render
    return <div className={`p-4 ${className}`}>{children}</div>;
  };
  
