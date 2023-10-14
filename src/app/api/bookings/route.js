import Booking from "@/models/bookingModel";
import { connectDB } from "@/config/dbConfig";
import { NextResponse } from "next/server";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";


connectDB();

export async function POST(request) {
    try {
        const userId = await validateTokenAndGetUserId(request);
        const reqBody = await request.json();
        await Booking.create(reqBody);
        return NextResponse.json({ message: "Booking added successfully"});
    } catch (error) {
       return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }

