import React from "react";
import { Typography } from "@material-tailwind/react";

export function SimpleFooter() {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-16 text-center md:justify-between my-6">
      <Typography color="blue-gray" className="font-normal ml-4">
        &copy; {currentYear} Car Rentals
      </Typography>
    </footer>
  );
}



