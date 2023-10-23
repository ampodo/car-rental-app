"use client";
import React from "react";
import { useRouter } from "next/navigation";

function CarsGrid({cars}) {
  
  const router = useRouter();

  if (!cars || cars.length === 0) {
    // Handle the case where the 'cars' array is not available or is empty
    return (
      <div className="text-center">
        <p>No cars available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 mb-10">
          {cars.map((car) => (
            <div key={car._id}>
              <img
                src={car.image}
                alt=""
                className="rounded cursor-pointer"
                onClick={() => router.push(`/cars/${car._id}`)}
              />
              <div
                className="py-3 px-2 cursor-pointer"
                onClick={() => router.push(`/cars/${car._id}`)}
              >
                <h1 className="text-lg md:text-base lg:text-sm hover:text-blue-500 transition-colors duration-300 ease-in-out">
                  {car.brand} {car.name}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarsGrid;

