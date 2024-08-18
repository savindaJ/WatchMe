import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Filter from "../components/Filter";
import axios from "axios";
import Spinner from "../components/Spinner";

export default function DashBourd(parentProp: any) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProduct();
  }, []);

  async function getAllProduct() {
    setLoading(true);
    await axios
      .get("http://localhost:4000/products/all-active?page=1&limit=10")
      .then((response) => {
        console.table(response.data);
        setData(response.data.data);
        setPage(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const cartItem: any = [];

  return (
    <div className="bg-white m-auto mt-20">
      {loading ? <Spinner /> : null}
      <section className="container m-auto">
        <img
          src="https://cdn.buyabans.com/media/catalog/category/New_dfvgbhhui9_1.png"
          alt=""
        />
      </section>
      <small className="ms-20 mt-5">Home / Watches .</small>
      <section className="flex flex-col">
        {/* <h1 className="text-4xl font-semibold p-4 text-gray-800">Welcome !</h1> */}
      </section>
      <section className="flex flex-nowrap">
        <section>
          <h3 className="text-2xl font-semibold p-4 text-gray-800 text-center">
            Products
          </h3>
          <Filter />
        </section>
        <div className="flex gap-5 flex-wrap justify-center mt-4 items-center mx-auto">
          {data === null ? (
            <h1>No One</h1>
          ) : (
            data.map((product, index) => (
              <Card
                key={index}
                product={product}
                func={(prop: any) => {
                  parentProp.func(prop);
                }}
              />
            ))
          )}
        </div>
      </section>
      <section className="flex justify-end mt-10 p-5">
        <nav aria-label="Page navigation example" className="w-100">
          <ul className="inline-flex -space-x-px text-sm">
            {Array.from({ length: page }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => {
                    setLoading(true);
                    axios
                      .get(
                        `http://localhost:4000/products/all-active?page=${
                          i + 1
                        }&limit=10`
                      )
                      .then((response) => {
                        console.table(response.data);
                        setData(response.data.data);
                        window.scrollTo(0, 0);
                        setLoading(false);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                  className="bg-white border-gray-300 text-gray-800 hover:bg-gray-50 px-3 py-2 border text-sm font-medium"
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </div>
  );
}
