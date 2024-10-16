import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Fallback component to display when an error occurs
const ErrorFallback = ({
  handleBackButton,
}: {
  handleBackButton: () => void;
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-4xl font-semibold text-gray-600 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mt-4 mb-8">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-100 text-gray-500">
                What would you like to do?
              </span>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Button onClick={handleBackButton}>
              <Home className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Functional ErrorBoundary component wrapping ReactErrorBoundary
const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleBackButton = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={() => <ErrorFallback handleBackButton={handleBackButton} />}
      onReset={() => navigate(0)} // This will reset the error boundary and reload the app when navigating back
      resetKeys={[location.pathname]} // This will reset the error boundary if the location changes
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
