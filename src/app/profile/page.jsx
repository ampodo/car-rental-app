"use client";
import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.users);

  return (
    <div>
      <h1 className="text-xl font-medium text-black">
        Welcome to your personal profile {currentUser?.name}
      </h1>
    </div>
  );
}

export default Profile;
