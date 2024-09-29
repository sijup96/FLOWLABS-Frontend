import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BrowseHeader = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/signUp");
  };

  return (
    <>
    <title>Flow Labs</title>
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <div
          className="text-gray-700 font-extrabold text-xl sm:text-2xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1>FLOW LABS</h1>
        </div>

        {/* Hamburger Icon for smaller screens */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`flex-col sm:flex-row sm:space-x-5 text-gray-700 ${
            isOpen ? "flex" : "hidden"
          } sm:flex`}
        >
          <h5 className="hover:text-indigo-600 cursor-pointer">Products</h5>
          <h5 className="hover:text-indigo-600 cursor-pointer">Pricing</h5>
          <h5 className="hover:text-indigo-600 cursor-pointer">About us</h5>
        </div>

        <div className="mt-4 sm:mt-0">
          <button
            className="bg-slate-600 text-white p-2 rounded-full border-none sm:border-8 hover:bg-slate-700 transition duration-300 ease-in-out"
            onClick={handleClick}
          >
            Get Free Trial
          </button>
        </div>
      </div>
    </>
  );
};

export default BrowseHeader;
