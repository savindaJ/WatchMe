import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  confiermDeliver,
  getPrnndingOrders,
  setDate,
} from "../../service/orderService";
import Spinner from "../../components/Spinner";
import Swal from "sweetalert2";

interface IProduct {
  _id: string;
  address: string;
  date: string;
  deliveryDate: string;
  email: number;
  phone: number;
  status: string;
  total: boolean;
  approve: boolean;
  isActive: boolean;
}

export default function Order() {
  const navigate = useNavigate();

  const [items, setData] = useState<IProduct[]>([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [id, setId] = useState("");

  const [date, setCurDate] = useState("");

  useState(() => {
    init();
  });

  function init() {
    setLoading(true);
    getPrnndingOrders()
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deliverd(id: string, date: string) {
    setLoading(true);
    if (date == undefined) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please set delivery date",
      });
      setLoading(false);
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You want to deliver this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        confiermDeliver(id)
          .then((response) => {
            console.log(response);
            init();
            setLoading(false);
            Swal.fire("Success", "Order deliverd", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  const setDateOrderDate = (id: string, date: string) => {
    setLoading(true);
    setDate(id, date)
      .then((response) => {
        console.log(response);
        init();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {loading ? <Spinner /> : null}
      <div className="overflow-x-auto p-10">
        {/* <button onClick={() => navigate("/admin")} className="bg-blue-500 text-white p-2 shadow-sm rounded-md mb-6">Deliverd</button> */}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                Dilivery Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                Approve
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.address}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <a href={`mailto:${item.email}`}>{item.email}</a>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <a href={`tel:${item.phone}`}>{item.phone}</a>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.status}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.total}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.deliveryDate ? (
                    item.deliveryDate
                  ) : (
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setId(item._id);
                      }}
                      className="bg-green-500 text-white p-1 shadow-sm rounded-md"
                    >
                      Set&nbsp;Date
                    </button>
                  )}
                </td>
                <td className="px-6 flex py-4 border-b border-gray-300">
                  <button
                    onClick={() => {
                      deliverd(item._id, item.deliveryDate);
                    }}
                    className="bg-blue-500 text-white p-1 shadow-sm rounded-md"
                  >
                    Deliverd
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div
                className="relative w-auto my-6 mx-auto max-w-4xl"
                style={{
                  width: "600px",
                }}
              >
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h4 className="text-2xl font-semibold">
                      Set Dilevery Date
                    </h4>
                  </div>
                  {/*body*/}
                  <div className="relative p-6">
                    <label htmlFor="date">Dilevery Date:</label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="border border-gray-300 p-2 w-full"
                      onChange={(e) => setCurDate(e.target.value)}
                    />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        console.log(date);
                        setDateOrderDate(id, date);
                      }}
                    >
                      Set Date
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
}
