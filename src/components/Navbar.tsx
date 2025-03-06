import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b-4 border-red-700 px-6 py-4 shadow-md flex justify-between items-center">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img
            src="/MatadorBoard.jpg"
            alt="Matador Board Logo"
            className="h-[80px] w-auto"
          />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex space-x-7">
        <Link
          to="/"
          className="rounded-md bg-gray-400 px-4 py-2 text-gray-800 hover:text-red-700"
        >
          Home
        </Link>
        <Link
          to="/kanban"
          className="rounded-md bg-gray-400 px-4 py-2 text-gray-800 hover:text-red-700"
        >
          Kanban Board
        </Link>
        <Link
          to="/documents"
          className="rounded-md bg-gray-400 px-4 py-2 text-gray-800 hover:text-red-700"
        >
          Documents
        </Link>
        <Link
          to="/profile"
          className="rounded-md bg-gray-400 px-4 py-2 text-gray-800 hover:text-red-700"
        >
          Profile
        </Link>
      </div>

      {/* Right: Login Button */}
      <div>
        <button className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
