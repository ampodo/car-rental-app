import Booking from "@/models/bookingModel";
import { connectDB } from "@/config/dbConfig";
import { NextResponse } from "next/server";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";

export async function POST(request) {
  try {
    let slotAvailable = true;
    const { fromSlot, toSlot, car } = await request.json();

    const bookings = await Booking.find({
      car: car,
      status: "approved",
      $or: [
        { fromSlot: { $gte: fromSlot, $lte: toSlot } },
        { toSlot: { $gte: fromSlot, $lte: toSlot } },
        { fromSlot: { $lte: fromSlot }, toSlot: { $gte: toSlot } },
        {
          toSlot: { $gte: fromSlot, $lte: toSlot },
          fromSlot: { $lte: fromSlot },
        },
      ],
    });

    if (bookings.length > 0) {
      slotAvailable = false;
    }

    return NextResponse.json({ success: slotAvailable, bookings });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
