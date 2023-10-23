import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import { message } from "antd";

function CarForm(props) {
  const { showModal, setShowModal, reloadData, selectedCar } = props;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: selectedCar ? selectedCar.name : "",
    brand: selectedCar ? selectedCar.brand : "",
    price: selectedCar ? selectedCar.price : "",
    fuelType: selectedCar ? selectedCar.fuelType : "",
    image: selectedCar ? selectedCar.image : "",
  });

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (name === "fuelType") {
      setFormData({
        ...formData,
        fuelType: value,
      });
    } else if (type === "file" && files[0]) {
      // Handle file upload
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setFormData({
          ...formData,
          [name]: reader.result, // Store the data URL in formData
        });
      };
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData({
          ...formData,
          image: reader.result, // Store the data URL in formData
        });
      };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, brand, price, image, fuelType } = formData;
    try {
      dispatch(SetLoading(true));

      let response = null;

      if (selectedCar) {
        formData._id = selectedCar._id;
        response = await axios.put(`/api/cars/${selectedCar._id}`, formData);
      } else {
        response = await axios.post("/api/cars", formData);
      }

      message.success(response.data.message);
      setShowModal(false);

      // Call the onCarAdded function to update the car data in the parent component
      if (props.onCarAdded) {
        props.onCarAdded(response.data.data);
      }

      if (reloadData) {
        reloadData();
      }
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
  <div className="relative sm:w-3/4 md:w-auto my-6 mx-auto max-w-4xl">
    {/* Content */}
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
      {/* Header */}
      <div className="flex items-center justify-center p-4 md:p-6 border-b border-solid border-slate-200 rounded-t">
        <h3 className="text-xl md:text-2xl font-normal uppercase">
          {selectedCar ? "Edit Car" : "Add a new car"}
        </h3>
      </div>
      {/* Body */}
      <div className="relative p-4 md:p-6">
        <form className="mt-2 md:mt-4 mb-2" onSubmit={handleSubmit}>
          <div className="mb-2 md:mb-4">
            <Input
              size="md"
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
          <div className="mb-2 md:mb-4 flex flex-col md:flex-row">
            <div className="mb-2 md:mb-0 md:flex-1">
              <Input
                size="md"
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
            <div className="w-full md:w-40 md:ml-2">
              <select
                className="w-full"
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
          <div className="mb-2 md:mb-4">
            <Input
              size="md"
              label="Price per hour"
              name="price"
              type="number"
              min="5"
              onChange={handleChange}
              required
            />
          </div>
          <label className="hidden" htmlFor="file-upload">
            Image
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".jpg, .jpeg, .png"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <img src="/80icon.png" alt="Upload Icon" />
          </label>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-end p-4 md:p-6 border-t border-solid border-slate-200 rounded-b mt-2">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-4 py-2 text-xs md:text-sm md:px-6 md:py-3 outline-none focus:outline-none mr-2 md:mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-xs md:text-sm md:px-6 md:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-2 md:mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Save Changes
            </button>
          </div>
          {/* Form ending */}
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
export default CarForm;
