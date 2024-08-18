import React from "react";

export default function Filter() {
  return (
    <div
      className="translate-x-8 mt-12 p-4 border shadow-lg rounded"  
      style={{ width: "250px", height: "50vh",position:'sticky' , top:60 }}
    >
      <p className="p-5 text-center underline">Filter</p>

      <div className="flex items-center mb-4 mt-5">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium">
          Kids 
        </label>
      </div>
      <div className="flex items-center">
        <input
          id="checked-checkbox"
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium">
          Gents 
        </label>
      </div>
      <div className="flex items-center mt-4">
        <input
          id="checked-checkbox"
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium">
          Laides 
        </label>
      </div>
      {/* <div className="flex items-center mt-4 justify-center">
        <input
          id=""
          type="range"
          value="10"
          className=""
        />
        <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium">
          Price Lavel
        </label>
      </div> */}
    </div>
  );
}
