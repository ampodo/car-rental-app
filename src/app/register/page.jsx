"use client";
import React, { useState } from "react";
import { Button, Card, Input, Typography } from "./MaterialTailwindComponents";
import Link from "next/link";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";
import Image from "next/image";

function Register() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password } = formData;
    console.log("Form Data:", formData);

    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });

      message.success(response.data.message);
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
   
  return (
    <div className="flex justify-center items-center h-screen">
       <Card color="transparent" className="mt-6 mb-16 p-14 rounded card-with-shadow">
        <div className="text-center">
        <Image
                className="mx-auto"
                src="/car-logo1.png"
                width={250}
                height={75}
                alt="Picture of the brand"
              />

          <Typography className="mt-4" variant="h3" color="blue-gray">
            Sign Up
          </Typography>
          <Typography
            color="gray"
            className="mt-2 font-normal text-base lg:text-lg"
          >
            Please register to start renting cars with us
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ml-auto mr-auto"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              name="name"
              type="text"
              pattern="[A-Za-z]{3,}"
              title="Please enter at least 3 letters"
              required
              onChange={handleChange}
            />
            <Input
              type="email"
              size="lg"
              label="Email"
              name="email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              required
              onChange={handleChange}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*\d]{8,}$"
              title="Password must contain at least 1 capital letter, 1 symbol, and be at least 8 characters long."
              required
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Register;
