import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findByName } from "../service/watchService";
import Spinner from "../components/Spinner";

export default function ViewProduct({ addCart }: any) {
  const { name } = useParams();

  const [count, setCount] = useState<number>(1);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (name) {
      findByName(name.trim())
        .then((response) => {
          console.log(response.data);
          setFormData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const [formData, setFormData] = useState({
    image: null,
    name: "",
    description: "",
    price: "",
    qoh: "",
    gender: "",
  });

  return (
    <>
    {loading ? <Spinner /> : null}
      <div className="mt-20 p-10">
        <section className="relative ">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
              <div className="img">
                <div className="img-box h-100 max-lg:mx-auto flex justify-center items-center">
                  <img
                    style={{
                      height: "300px",
                      width: "300px",
                    }}
                    src={
                      formData.image
                        ? formData.image
                        : "data:image/png;base64,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"
                    }
                    alt={formData.name}
                    className="object-cover mt-10"
                  />
                </div>
              </div>
              <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                <div className="data w-full max-w-xl">
                  <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">
                    Watch&nbsp; /&nbsp; {formData.gender}
                  </p>
                  <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                    {formData.name}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                    <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                      LKR {formData.price}
                    </h6>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_12029_1640)">
                            <path
                              d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                              fill="#FBBF24"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12029_1640">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_12029_1640)">
                            <path
                              d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                              fill="#FBBF24"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12029_1640">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_12029_1640)">
                            <path
                              d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                              fill="#FBBF24"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12029_1640">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_12029_1640)">
                            <path
                              d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                              fill="#FBBF24"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12029_1640">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_8480_66029)">
                            <path
                              d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                              fill="#F3F4F6"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_8480_66029">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">
                        1624 review
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-base font-normal mb-5">
                    {formData.description}
                  </p>
                  {/* <ul className="grid gap-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="26" height="26" rx="13" fill="#4F46E5" />
                      <path
                        d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span className="font-normal text-base text-gray-900 ">
                      Branded shirt
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="26" height="26" rx="13" fill="#4F46E5" />
                      <path
                        d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span className="font-normal text-base text-gray-900 ">
                      3 color shirt
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="26" height="26" rx="13" fill="#4F46E5" />
                      <path
                        d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span className="font-normal text-base text-gray-900 ">
                      Pure Cotton Shirt with 60% as 40%
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="26" height="26" rx="13" fill="#4F46E5" />
                      <path
                        d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span className="font-normal text-base text-gray-900 ">
                      all size is available
                    </span>
                  </li>
                </ul> */}
                  {/* <p className="text-gray-900 text-lg leading-8 font-medium mb-4">
                  Size
                </p>
                <div className="w-full pb-8 border-b border-gray-100 flex-wrap">
                  <div className="grid grid-cols-3 min-[400px]:grid-cols-5 gap-3 max-w-md">
                    <button className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                      S
                    </button>
                    <button className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                      M
                    </button>
                    <button className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                      L
                    </button>
                    <button className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                      XL
                    </button>
                    <button className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                      XXL
                    </button>
                  </div>
                </div> */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
                    <div className="flex sm:items-center sm:justify-center w-full">
                      <button
                        onClick={() => {
                          if (count > 1) {
                            setCount(count - 1);
                          }
                        }}
                        className="group py-2 px-3 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                      >
                        <svg
                          className="stroke-gray-900 group-hover:stroke-black"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                      <input
                        value={count}
                        type="text"
                        className="font-semibold text-gray-900 cursor-pointer text-lg py-[6px] px-3 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50"
                        placeholder="1"
                      />
                      <button
                        onClick={() => {
                          if (count < parseInt(formData.qoh)) {
                            setCount(count + 1);
                          }
                        }}
                        className="group py-2 px-3 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                      >
                        <svg
                          className="stroke-gray-900 group-hover:stroke-black"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke="#9CA3AF"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke="black"
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke="black"
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        addCart(formData);
                        // swal.fire({
                        //   icon: "success",
                        //   title: "Item added to cart",
                        //   showConfirmButton: false,
                        //   timer: 1500,
                        // });
                      }}
                      className="group py-3 px-3 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-100"
                    >
                      <svg
                        className="stroke-indigo-600 "
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                          stroke=""
                          stroke-width="1.6"
                          stroke-linecap="round"
                        />
                      </svg>
                      Add to cart
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 26 26"
                        fill="none"
                      >
                        <path
                          d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                          stroke="#4F46E5"
                          stroke-width="1.6"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                    onClick={()=>{
                      addCart(formData)
                      navigate("/order-watch");
                    }}
                    className="text-center w-full px-2 py-2 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
