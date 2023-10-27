"use client";
import React, { useState } from "react";
import { Button, Card, Input, Typography } from "./MaterialTailwindComponents";
import Link from "next/link";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
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

    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });

      message.success(response.data.message);
      router.push("/login");
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        color="transparent"
        className="mt-16 mb-16 sm:px-7 py-8 md:p-12 lg:p-14 shadow-2xl rounded"
      >
        <Image
          className="mx-auto"
          src="/car-logo1.png"
          width={240}
          height={75}
          alt="Picture of the brand"
        />

        <div className="text-center">
          <Typography
            className="mt-4 sm:text-xl md:text-2xl font-semibold"
            color="blue-gray"
          >
            Sign Up
          </Typography>
          <Typography
            color="gray"
            className="mt-2 font-normal sm:text-sm md:text-base"
          >
            Please register to start renting cars
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 sm:w-64 md:w-96 max-w-screen-lg ml-auto mr-auto"
        >
          <div className="mb-4 flex flex-col">
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

            <div style={{ marginTop: "20px" }}>
              <Input
                type="email"
                size="lg"
                label="Email"
                name="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                required
                onChange={handleChange}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
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
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Register
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-normal sm:text-sm md:text-base"
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-gray-900 sm:text-sm md:text-base"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Register;
