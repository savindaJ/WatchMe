import React, { useEffect, useState } from "react";
import { saveOrder } from "../service/orderService";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function WatchOrder({ cart, Total, removeItem, clear }: any) {
  const [watchNameList, setList] = useState<string[]>([]);
  const [qty, setQty] = useState(0);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const names = cart.map((item: any) => item.name);
    setList(names);
    const totalOfQty = cart.reduce(
      (acc: number, item: any) => acc + item.qty,
      0
    );
    setQty(totalOfQty);
  }, [cart]);

  function order() {
    if (cart.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Cart is Empty",
        text: "Add Items to Cart",
      });
      return;
    }

    if (sessionStorage.getItem("user") === null) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please Login to Place Order",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    setLoader(true);
    const orderJson = {
      watchList: watchNameList,
      quantity: qty,
      total: Total,
      email: email,
      address: address,
      phone: phone,
    };
    console.log(orderJson);
    saveOrder(orderJson)
      .then((res) => {
        console.log(res);
        setLoader(false);
        Swal.fire({
          icon: "success",
          title: "Order Placed Successfully",
          text: "Your Order will be delivered soon !",
        });
        clear();
        setAddress("");
        setEmail("");
        setPhone("");
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        Swal.fire({
          icon: "error",
          title: "Order Failed",
          text: "Something went wrong",
        });
      });
  }

  return (
    <>
      {loader ? <Spinner /> : null}
      <div className="mt-20 p-10">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Your Cart
        </h1>
        <div className="flex items-center justify-center mt-5 border-2 border-gray-300 p-5 rounded-lg">
          <div className="flex flex-col items-center justify-between mt-5">
            {cart.length === 0 ? (
              <h1 className="text-2xl font-bold">Cart is Empty</h1>
            ) : (
              <div className="flex flex-col items-center justify-center">
                {cart.map((item: any, index: number) => (
                  <div
                    style={{ width: "100%" }}
                    key={index}
                    className="flex items-center justify-between w-100 border-2 border-gray-300 p-2 rounded-lg mb-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="">{item.name}</h1>
                      <h1 className="">LKR : {item.price}</h1>
                      <small className="">{item.gender}</small>
                      <small className="">QTY : {item.qty}</small>
                    </div>
                    <button
                      onClick={() => removeItem(index, item)}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <h1 className="text-2xl font-bold mt-10">
                  Total: LKR : {Total}
                </h1>
              </div>
            )}
          </div>
          <div
            className="flex flex-col items-center justify-center w-100"
            style={{
              width: "50%",
              overflow: "auto",
            }}
          >
            <h3 className="text-2xl text-red-400">Cash On Dilevery</h3>
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptatibus.
            </p>
            <form
              className="flex flex-col p-10"
              style={{
                width: "90%",
              }}
            >
              <>
                <label htmlFor="address" className="text-lg font-bold">
                  Address
                </label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  type="text"
                  placeholder="Enter Your Address"
                  className="border-2 border-gray-300 p-1 rounded-lg w-100 mt-2"
                />
              </>
              <label htmlFor="phone" className="text-lg font-bold mt-10">
                Phone Number
              </label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="text"
                placeholder="Enter Your Phone Number"
                className="border-2 border-gray-300 p-1 rounded-lg w-100"
              />
              <label htmlFor="email" className="text-lg font-bold mt-10">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Enter Your Email"
                className="border-2 border-gray-300 p-1 rounded-lg w-100"
              />
            </form>
            <button
              onClick={order}
              style={{
                width: "70%",
              }}
              className="bg-green-500 text-white px-2 py-1 rounded-lg w-100"
            >
              Order Now
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-5">
          <p
            className="ms-10 mt-20"
            style={{
              textAlign: "center",
              width: "50%",
              marginTop: "40px",
            }}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
            accusamus labore facilis repudiandae accusantium facere nisi iure?
            Ipsum, molestias? Fuga quam alias dicta dolores consequatur nobis
            repellendus deleniti nam vel.
          </p>
        </div>
      </div>
    </>
  );
}
