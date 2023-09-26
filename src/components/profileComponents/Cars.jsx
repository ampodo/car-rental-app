"use client";
import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import { message } from "antd";

function Cars() {
  const [showModal, setShowModal] = React.useState(false);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    fuelType: "",
    image: "",
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "fuelType") {
      setFormData({
        ...formData,
        fuelType: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, brand, price, image, fuelType } = formData;
    console.log("Form Data:", formData);

    try {
      dispatch(SetLoading(true));
      let response = null;

      response = await axios.post("/api/cars", {
        name,
        brand,
        price,
        fuelType,
        image,
      });

      message.success(response.data.message);
      setShowModal(false);
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <>
      <div className="flex justify-end mt-8">
        <Button variant="gradient" onClick={() => setShowModal(true)}>
          Add Car
        </Button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center px-28 py-6 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-normal  uppercase">
                    Add a new car
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 mx-4">
                  <form className="mt-4 mb-2" onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <Input
                        size="lg"
                        label="Car name"
                        name="name"
                        type="text"
                        pattern="[A-Za-z0-9-]{3,}"
                        minLength="3"
                        title="Please fill this field"
                        required
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4 flex space-x-4">
                      <div className="flex-1">
                        <Input
                          size="lg"
                          label="Brand"
                          name="brand"
                          type="text"
                          pattern="[A-Za-z0-9-]{3,}"
                          minLength="3"
                          title="Please fill this field"
                          required
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex-1">
                        <select
                          className="w-40"
                          name="fuelType"
                          onChange={handleChange}
                          value={formData.fuelType}
                          required
                        >
                          <option value="">Select fuel type</option>
                          <option value="Petrol">Petrol</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Electric">Electric</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Input
                        size="lg"
                        label="Price per hour"
                        name="price"
                        type="number"
                        min="5"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Input
                      size="lg"
                      label="Car image"
                      name="image"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleChange}
                      required
                    />

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                    {/*form ending*/}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Cars;
