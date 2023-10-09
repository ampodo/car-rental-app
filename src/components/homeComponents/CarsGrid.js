"use client";
import { Col, Row } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

function CarsGrid({ cars }) {
  const router = useRouter();
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {cars.map((car) => (
        <Col key={car._id} span={6}>
          <div
            className="card cursor-pointer"
            onClick={() => router.push(`/cars/${car._id}`)}
          >
            <img
              src={car.image}
              alt=""
              height="260"
              width="260"
              style={{ borderRadius: "5%" }}
            />

            <div className="flex justify-center items-center py-3 px-2">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                {car.name} {car.brand}
              </h1>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default CarsGrid;
