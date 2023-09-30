"use client";
import { useState, useEffect } from "react";
import CarForm from "./CarForm";
import { useDispatch } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import { Table } from "antd";
import { Tooltip } from "@material-tailwind/react";

function Cars() {
  const [cars, setCars] = useState([]);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));

      const response = await axios.get("/api/cars");

      setCars(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Function to add a new car to the cars state

  const addCar = (newCar) => {
    setCars([...cars, newCar]);

    getData();
  };

  


  const columns = [
    {
      title: "Car image",

      dataIndex: "image",

      render: (image) => (
        <img
          src={image}
          alt="car"
          width="80"
          height="80"
          style={{ borderRadius: "10%" }}
        />
      ),
    },

    {
      title: "Car Name",

      dataIndex: "name",
    },

    {
      title: "Brand",

      dataIndex: "brand",
    },

    {
      title: "Fuel type",

      dataIndex: "fuelType",
    },

    {
      title: "Price per hour €",

      dataIndex: "price",
    },

    {
      title: "Action",

      dataIndex: "action",

      render: (_, record) => (
        <div className="flex gap-5">
           <Tooltip content="CUSTOMIZE" placement="left" className="custom-tooltip">
          <i className="ri-edit-line"style={{ fontSize: "18px", cursor: "pointer" }}></i>
          </Tooltip>

          <Tooltip content="DELETE" placement="right" className="custom-tooltip">
          <i className="ri-delete-bin-line" style={{ fontSize: "18px", cursor: "pointer" }}></i>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={cars} columns={columns} rowKey="_id" />
      <CarForm onCarAdded={addCar} />
    </div>
  );
}

export default Cars;
