import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import CarsGrid from "@/components/homeComponents/CarsGrid";

export async function getCars() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    const response = await axios.get(`${process.env.domain}/api/cars`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export default async function Home() {
  const cars = await getCars();

  return (
    <div className="mt-12 ml-8 mr-8">
      {Array.isArray(cars) && cars.length > 0 ? (
        <CarsGrid cars={cars} />
      ) : (
        <div>No cars available.</div>
      )}
    </div>
  );
}
