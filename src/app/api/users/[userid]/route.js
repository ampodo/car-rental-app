import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import bcrypt from "bcrypt"; // Import the bcrypt library for password hashing

connectDB();

export async function PUT(request, { params }) {
  try {
    const userId = await validateTokenAndGetUserId(request);
    const reqBody = await request.json();

    const user = await User.findById(params.userid);

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (reqBody.hasOwnProperty("isActive")) {
      // Admin action: activate or deactivate the user
      // Check if the user is an admin (you can customize the check)
      const adminUser = await User.findById(userId);
      if (!adminUser || !adminUser.isAdmin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      await User.findByIdAndUpdate(params.userid, { isActive: reqBody.isActive }, { new: true });

      return NextResponse.json({ message: `User ${reqBody.isActive ? "activated" : "deactivated"} successfully` });
    } else if (reqBody.hasOwnProperty("newPassword")) {
      // Regular user action: update their password
      const passwordMatch = await bcrypt.compare(reqBody.oldPassword, user.password);
      if (!passwordMatch) {
        return NextResponse.json({ message: "Old password is incorrect" }, { status: 400 });
      }

      // Hash the new password before saving it
      const newPasswordHash = await bcrypt.hash(reqBody.newPassword, 10);
      await User.findByIdAndUpdate(params.userid, { password: newPasswordHash }, { new: true });

      return NextResponse.json({ message: "Password updated successfully" });
    } else {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}







