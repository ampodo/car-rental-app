import { useState, useEffect } from "react";
import CarForm from "./CarForm";
import { useDispatch } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import { Table } from "antd";
import { Tooltip } from "@material-tailwind/react";
import { message } from "antd";

function Cars() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  // Function to display car items
  const addCar = (newCar) => {
    setCars([...cars, newCar]);
    getData();
  };

  // Delete car items from the table
  const deleteCar = async (carId) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.delete(`/api/cars/${carId}`);
      if (response.status === 200) {
        // Filter out the deleted car from the cars array
        const updatedCars = cars.filter((car) => car._id !== carId);
        setCars(updatedCars);
        message.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
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
          style={{ borderRadius: "5%" }}
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
          <Tooltip
            content="CUSTOMIZE"
            placement="left"
            className="custom-tooltip"
          >
            <i
              className="ri-edit-line"
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={() => {
                setSelectedCar(record);
                setShowModal(true);
              }}
            ></i>
          </Tooltip>

          <Tooltip
            content="DELETE"
            placement="right"
            className="custom-tooltip"
          >
            <i
              className="ri-delete-bin-line"
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={() => deleteCar(record._id)}
            ></i>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div className="table-container">
      <Table dataSource={cars} columns={columns} rowKey="_id" />
      <CarForm
        onCarAdded={addCar}
        showModal={showModal}
        setShowModal={setShowModal}
        selectedCar={selectedCar}
        reloadData={getData}
      />
    </div>
  );
}
export default Cars;
