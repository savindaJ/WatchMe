import React from "react";
import { FaBars } from "react-icons/fa";

const Topbar = ({ toggleSidebar }:any) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <button onClick={toggleSidebar}>
        <FaBars />
      </button>
      <h1 className="text-lg font-semibold">Watch.LK</h1>
    </div>
  );
};

export default Topbar;
