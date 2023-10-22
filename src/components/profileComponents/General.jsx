import React, { useState } from "react";
import { Button, Card, Input } from "@material-tailwind/react";
import axios from "axios";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";
import { SetCurrentUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";

function General() {
  const { currentUser } = useSelector((state) => state.users);
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
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

    const { oldPassword, newPassword, confirmPassword } = formData;
    try {
      dispatch(SetLoading(true));

      const requestData = {
        oldPassword,
        newPassword,
      };

      if (newPassword === confirmPassword) {
        requestData.newPassword = newPassword;
      } else {
        message.error("Passwords do not match");
        return;
      }

      const response = await axios.put(
        `/api/users/${currentUser._id}`,
        requestData
      );

      dispatch(SetCurrentUser(response.data.data));
      message.success("Password updated successfully", 5);
      router.push("/");
    } catch (error) {
      message.error(error.response?.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" className="mb-20 p-10 rounded card-with-shadow">
        <form
          onSubmit={handleSubmit}
          className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96 ml-auto mr-auto"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              type="password"
              size="lg"
              label="Old Password"
              name="oldPassword"
              required
              value={formData.oldPassword}
              onChange={handleChange}
            />
            <Input
              type="password"
              size="lg"
              label="New Password"
              name="newPassword"
              pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*\d]{8,}$"
              title="Password must contain at least 1 capital letter, 1 symbol, and be at least 8 characters long."
              value={formData.newPassword}
              onChange={handleChange}
            />
            <Input
              type="password"
              size="lg"
              label="Confirm Password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Update password
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default General;
