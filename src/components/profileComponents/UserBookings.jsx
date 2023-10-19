import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { Table } from "antd";
import { SetLoading } from "@/redux/loadersSlice";
import moment from "moment";

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/bookings?user=${currentUser._id}`);
      setBookings(response.data.data);
      console.log("Bookings Data:", response.data.data);
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Booking Id",
      dataIndex: "_id",
    },

    {
      title: "Car",
      dataIndex: "car",
      render: (car) => car.name,
    },

    {
      title: "Total Hours",
      dataIndex: "totalHours",
    },

    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (totalAmount) => {
        return `€ ${totalAmount}`; // Add the Euro sign to the totalAmount
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status) => status.toUpperCase()
    },

    {
      title: "From Slot",
      dataIndex: "fromSlot",
      render: (fromSlot) => moment(fromSlot).format("DD-MM-YYYY hh:mm A"),
    },

    {
      title: "To Slot",
      dataIndex: "toSlot",
      render: (toSlot) => moment(toSlot).format("DD-MM-YYYY hh:mm A"),
    },

    {
      title: "Action",
      render: (record) => (
           <div>{record.status === "approved" && <span  style={{ color: "red" }}>Cancel</span>}</div>
       ),
    },
  ];

  return <div>
           
           <Table dataSource={bookings} columns={columns} />

         </div>;
}

export default UserBookings;
