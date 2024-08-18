import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {
  enableOrDisableProduct,
  getAllProduct,
} from "../../service/watchService";
import Spinner from "../../components/Spinner";

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  qoh: number;
  image: string;
  isActive: boolean;
  gender: string;
  approved: boolean;
}

export default function Watch() {
  const navigate = useNavigate();
  const [items, setData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  function init() {
    setLoading(true);
    getAllProduct()
      .then((response) => {
        console.table(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
    {loading ? <Spinner /> : null}
      <div className="p-5 flex">
        <h1 className="text-2xl font-semibold">Watches</h1>
        <button
          onClick={() => navigate("/admin-home/watch-save")}
          className="ml-auto bg-blue-500 text-white p-1 shadow-sm rounded-md"
        >
          Add Watch
        </button>
      </div>
      <div className="overflow-x-auto p-10">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                QoH
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover"
                    />
                  )}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.description ? item.description : "No Description"}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.price}.Rs
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.qoh > 0 ? item.qoh : "Out of Stock"}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.gender}
                </td>
                <td className="px-6 flex py-4 border-b border-gray-300">
                  <button
                    onClick={() => {
                      navigate("/admin-home/watch-save/" + item.name);
                    }}
                    className="bg-blue-500 text-white p-2 shadow-sm rounded-md me-5"
                  >
                    <CiEdit />
                  </button>

                  <label className="flex flex-row flex-nowrap items-center cursor-pointer">
                    <input
                      onClick={() => {
                        enableOrDisableProduct(!item.isActive, item.name);
                        window.location.reload();
                      }}
                      checked={item.isActive}
                      type="checkbox"
                      className="sr-only peer"
                    ></input>
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
