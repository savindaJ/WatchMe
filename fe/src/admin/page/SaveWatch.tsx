import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  findByName,
  saveProduct,
  updateProduct,
} from "../../service/watchService";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";

interface IItem {
  id: number;
  name: string;
  description: string;
  price: number;
  qoh: number;
  image: string;
}

const ItemForm = () => {
  const { item } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    if (item) {
      setLoading(true);
      findByName(item.trim())
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

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prevData) => ({
          ...prevData,
          [name]: files ? base64String : base64String,
        }));
        console.log(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    console.log(formData);
  };

  const handleSubmit = async (e: any) => {
    if (
      !formData.image ||
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.qoh ||
      !formData
    ) {
      alert("Please fill all the fields");
      return;
    }

    if (item) {
      setLoading(true);
      await updateProduct(formData);
      successAlert();
      navigate("/admin-home/watch");
      setLoading(false);
      return;
    } else {
      setLoading(true);
      await saveProduct(formData);
      successAlert();
      navigate("/admin-home/watch");
      setLoading(false);
    }
  };

  function successAlert() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Item Added Successfully !",
    });
  }

  return (
    <>
    {loading ? <Spinner /> : null}
    <form
      // onSubmit={handleSubmit}
      className="mx-auto p-4 bg-white shadow-md rounded-md mt-5"
    >
      <section className="flex justify-center">
        <div className="mb-4 w-1/2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="w-1/2 avatar m-auto ms-20">
          <img
            src={
              formData.image
                ? formData.image
                : "data:image/png;base64,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"
            }
            alt="Item"
            className="w-32 h-32 rounded-md"
          />
        </div>
      </section>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name"> 
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter item name"
          required
        />
      </div>

      <section className="flex justify-between">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter item price"
            required
          />
        </div>

        <div className="mb-4 ms-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="qoh">
            Quantity on Hand (QoH)
          </label>
          <input
            type="number"
            id="qoh"
            name="qoh"
            value={formData.qoh}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter quantity on hand"
            required
          />
        </div>

        <div className="mb-4 ms-2">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="gender"
          >
            Gender
          </label>
          <div className="relative h-10 w-72 min-w-[200px]">
            <select
              onChange={(event) => {
                formData.gender = event.target.value;
              }}
              className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            >
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
              <option value="KIDS">KIDS</option>
            </select>
          </div>
        </div>
      </section>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter item description"
          required
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {item ? "Update" : "Save"}
      </button>
    </form></>
  );
};

export default ItemForm;
