import { useState } from "react";
import { Button2 } from "@/components/ui/button";
import { Input2 } from "@/components/ui/Input";
import { Label2 } from "@/components/ui/Label";
import React from "react";
import { fieldValidation } from "@/utils/validation";
import { company } from "@/api/services/company.service";
import { useParams } from "react-router-dom";

const CompanyFirstLogin = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { domainName } = useParams<{ domainName: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password === "error") {
      throw new Error("Intentional error to test ErrorBoundary!");
    }
    const isValid = fieldValidation.password(password);
    if (!isValid) {
      setError("Password must match the criteria");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await company.resetPassword({
      password: password,
      domainName: domainName || "",
    });
    console.log(response);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-300 rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Set New Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label2 htmlFor="password">New Password</Label2>
            <Input2
              id="password"
              type="password"
              value={password}
              className=""
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label2 htmlFor="confirmPassword">Confirm New Password</Label2>
            <Input2
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <span className="text-red-600 flex justify-center font-semibold">
              {error}
            </span>
          )}
          <div className="text-sm text-gray-600">
            <p>Password must:</p>
            <ul className="list-disc list-inside">
              <li>Be at least 8 characters long</li>
              <li>Include at least one uppercase letter</li>
              <li>Include at least one lowercase letter</li>
              <li>Include at least one number</li>
              <li>Include at least one special character (!@#$%^&*)</li>
            </ul>
          </div>
          <Button2 type="submit" className="w-full">
            Set New Password
          </Button2>
        </form>
      </div>
    </div>
  );
};

export default CompanyFirstLogin;
