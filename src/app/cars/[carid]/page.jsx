import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import CarInformation from "@/components/information/CarInformation";

export async function getCar(carid) {

  const apiUrl = process.env.domain;

  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    const response = await axios.get(`${apiUrl}/api/cars/${carid}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export default async function CarInfo({ params }) {
  const car = await getCar(params?.carid);
  return (
    car && (
      <div className="p-5">
        <CarInformation car={car} />
      </div>
    )
  );
}

