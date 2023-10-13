"use client";
import React, { useState } from "react";
import { Button, Card, Input, Typography } from "./MaterialTailwindComponents";
import Link from "next/link";
import axios from "axios";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
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

    const { email, password } = formData;
    console.log("Form Data:", formData);

    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });

      message.success(response.data.message);
      router.push("/");
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false} className="-mt-10">
        <div className="text-center">
          <img
            className="mx-auto w-2/3"
            src="./car-logo1.png"
            alt="Car-image"
          />
          <Typography className="mt-4" variant="h3" color="blue-gray">
            Sign In
          </Typography>
          <Typography
            color="gray"
            className="mt-2 font-normal text-base lg:text-lg"
          >
            Enter your credentials and start renting cars
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ml-auto mr-auto"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              type="email"
              size="lg"
              label="Email"
              name="email"
              pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
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
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-gray-900">
              Register
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Login;
