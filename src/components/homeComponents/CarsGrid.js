"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function CarsGrid({ cars }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 mb-10">
          {cars?.map((car) => (
            <div key={car._id}>
              <Card className="w-86">
                <CardHeader shadow={false} floated={false} className="h-86">
                  <img src={car.image} alt="" />
                </CardHeader>
                <CardBody>
                  <div className="mb-2 flex items-center justify-between">
                    <Typography variant="small" className="font-bold">
                      {car.name}
                    </Typography>
                    <Typography variant="small" className="text-blue-600">
                      {`${car.price} € / h`}
                    </Typography>
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    onClick={() => router.push(`/cars/${car._id}`)}
                  >
                    EXPLORE
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarsGrid;
