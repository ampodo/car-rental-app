"use client";
import {
  Button,
  Card,
  Input,
  Checkbox,
  Typography,
} from "./MaterialTailwindComponents";
import Link from "next/link";

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false} className="-mt-10">
        <div className="text-center">
          <img
            src="./car-sign-up.jpg"
            alt="Registration-image"
            className="rounded-full object-cover w-36 h-36 mx-auto mb-2"
          />
          <Typography variant="h3" color="blue-gray">
            Sign Up
          </Typography>
          <Typography variant="h6" color="gray" className="mt-2 font-normal">
            Please register to start renting cars with us
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
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
            />
            <Input
              type="email"
              size="lg"
              label="Email"
              name="email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              required
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*\d]{8,}$"
              title="Password must contain at least 1 capital letter, 1 symbol, and be at least 8 characters long."
              required
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
