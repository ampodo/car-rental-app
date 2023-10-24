import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import CarsGrid from "@/components/homeComponents/CarsGrid";

export async function getCars() {

  const apiUrl = process.env.domain;

  try {
    const cookeStore = cookies();
    const token = cookeStore.get("token").value;
    const response = await axios.get(`${apiUrl}/api/cars`, {
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
     <CarsGrid cars={cars} />
    </div>
  );
}
