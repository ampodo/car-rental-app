"use client";
import React, { useEffect } from "react";
import moment from "moment";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { DatePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import StripeCheckout from "react-stripe-checkout";

const { RangePicker } = DatePicker;

function CarInformation({ car }) {
  const [isSlotAvailable, setIsSlotAvailable] = React.useState(false);
  const [fromSlot, setFromSlot] = React.useState(null);
  const [toSlot, setToSlot] = React.useState(null);
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [openAcc1, setOpenAcc1] = React.useState(true);
  const [openAcc2, setOpenAcc2] = React.useState(true);
  const [openAcc3, setOpenAcc3] = React.useState(true);

  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
  const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);

  const bookNow = async (token) => {
    const payload = {
      car: car._id,
      user: currentUser._id,
      fromSlot,
      toSlot,
      totalHours: moment(toSlot).diff(moment(fromSlot), "hours"),
      totalAmount: moment(toSlot).diff(moment(fromSlot), "hours") * car?.price,
      token,
    };

    try {
      dispatch(SetLoading(true));
      await axios.post("/api/bookings", payload);
      message.success("Booking added successfully");
      router.push("/profile");
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/checkAvailability", {
        car: car._id,
        fromSlot,
        toSlot,
      });
      if (response.data.success) {
        message.success("Slot Available");
        setIsSlotAvailable(true);
      } else {
        throw new Error("Slot Not Available");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    setIsSlotAvailable(false);
  }, [fromSlot, toSlot]);

  return (
    <div className="mt-16">
      <img src={car?.image} className="mx-auto w-5/6 object-cover rounded" />

      <div className="grid justify-items-center mt-6">
        <h1 className="text-3xl font-bold mb-2">{car.brand}</h1>
        <h1 className="text-2xl text-slate-800 font-medium">{car.name}</h1>
        {/* Buttons group */}

        <div className="mt-8 flex justify-center gap-5">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            style={{ width: "300px", height: "50px" }}
            onChange={(value) => {
              setFromSlot(value[0].toDate());
              setToSlot(value[1].toDate());
            }}
            disabledDate={(current) => {
              return current && current < moment().endOf("day");
            }}
          />

          <Button
            variant="gradient"
            size="sm"
            disabled={!fromSlot || !toSlot}
            onClick={checkAvailability}
          >
            Check Availability
          </Button>
        </div>

        <div className="mt-12 flex justify-start gap-5">
          <Button
            variant="outlined"
            onClick={() => {
              router.back();
            }}
          >
            Go Back
          </Button>

          <StripeCheckout
            stripeKey="pk_test_51MikCLIYIDFW18nrUFirIoc6zkHDn6gkXK6ldBc7pf2tOAL51C9UCRaweV0EyCulz1XnzGTDhJ6Lh9HmgKDUu4Rf00RvLHIuZI"
            token={bookNow}
            currency="EUR"
            key={process.env.stripe_publishable_key}
            amount={
              moment(toSlot).diff(moment(fromSlot), "hours") * car?.price * 100
            }
            shippingAddress
          >
            <Button
              variant="gradient"
              disabled={!fromSlot || !toSlot || !isSlotAvailable}
            >
              Book now
            </Button>
          </StripeCheckout>
        </div>
        {fromSlot && toSlot && (
          <>
            <div className="mt-6 flex flex-col justify-between gap-2">
              <h1 className="text-base font-semibold text-slate-800">
                Total Hours : {moment(toSlot).diff(moment(fromSlot), "hours")}
              </h1>

              <h1 className="text-base font-semibold text-slate-800">
                Total Amount :{" "}
                {moment(toSlot).diff(moment(fromSlot), "hours") * car?.price} €
              </h1>
            </div>
          </>
        )}

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
              Price per hour including insurance
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
