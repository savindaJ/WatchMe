import React from "react";
import { FaTimes, FaHome, FaUser, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }:any) => {

  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out bg-white shadow-lg w-64 z-30`}
    >
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
        <button onClick={toggleSidebar}>
          <FaTimes />
        </button>
      </div>
      <nav className="mt-4">
        <a
        onClick={() => navigate("/admin-home")}
          href="#"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <FaHome className="mr-2" /> Home
        </a>
        <a
          onClick={() => navigate("/admin-home/watch")}
          href="#"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <FaUser className="mr-2" /> Watches
        </a>
        <a
          onClick={() => navigate("/admin-home/watch-orders")}
          href="#"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <FaCog className="mr-2" /> Orders
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
