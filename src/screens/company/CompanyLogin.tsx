import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { company } from "@/api/services/company.service";

const CompanyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { domainName } = useParams<{ domainName: string }>();
  const [error, setError] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!domainName) return;
    try {
     const response= await company.login({ email, password, domainName });

     if(response.isFirstTime)
      navigate(`/c/${domainName}/isFirstTime`)
    else
    navigate('/home')
    } catch (error) {
      console.log(error)
      setError('error');

    }


  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-800"
      >
        <h2 className="text-4xl font-bold text-gray-100 mb-6 text-center">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-gray-300 text-lg">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-300 text-lg">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="text-red-600 text-center">{error?'Ivalid Credentials':''}</div>
          <Button
            type="submit"
            className="w-full bg-gray-700 text-gray-100 hover:bg-gray-600 transition-all duration-300"
          >
            Sign In
          </Button>
        </form>
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-gray-400 hover:text-gray-300 hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <motion.div
          className="absolute -bottom-4 -right-4 w-24 h-24 bg-gray-700 rounded-full"
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            times: [0, 1, 1],
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
};

export default CompanyLogin;
