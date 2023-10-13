"use client";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function CarInformation({ car }) {
  const [openAcc1, setOpenAcc1] = React.useState(true);
  const [openAcc2, setOpenAcc2] = React.useState(true);
  const [openAcc3, setOpenAcc3] = React.useState(true);

  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
  const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);

  return (
    <div className="mt-12">
      <img src={car?.image} className="mx-auto w-5/6 object-cover rounded" />

      <div className="grid justify-items-center mt-6">
        <h1 className="text-3xl font-bold mb-2">{car.brand}</h1>
        <h1 className="text-2xl text-slate-800 font-medium">{car.name}</h1>
        <div className="mt-6">
          <Accordion open={openAcc1}>
            <AccordionHeader
              className="sm:text-xl md:text-2xl"
              onClick={handleOpenAcc1}
            >
              Fuel type of this model
            </AccordionHeader>
            <AccordionBody className="text-base md:text-xl text-slate-800 font-semibold">
              {car.fuelType}
            </AccordionBody>
          </Accordion>

          <Accordion open={openAcc2}>
            <AccordionHeader
              className="sm:text-xl md:text-2xl"
              onClick={handleOpenAcc2}
            >
              Price per month including insurance
            </AccordionHeader>
            <AccordionBody className="text-base md:text-xl text-slate-800 font-semibold">
              {car.price} €
            </AccordionBody>
          </Accordion>

          <Accordion open={openAcc3}>
            <AccordionHeader
              className="sm:text-xl md:text-2xl"
              onClick={handleOpenAcc3}
            >
              Insurance policy
            </AccordionHeader>
            <AccordionBody className="text-base md:text-xl text-slate-800 font-semibold">
              Our insurance coverage applies when the client is not proven to be
              at fault. In cases where the client's fault is not established,
              the insurance will cover any damages to the rental vehicle.
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default CarInformation;
