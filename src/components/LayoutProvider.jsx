"use client";
import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { NavbarSimple } from "./Navbar";


function LayoutProvider({ children }) {
  return (
    <ThemeProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&display=swap"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
            rel="stylesheet"
          ></link>
        </head>
        <body className="font-sans">
          <div className="header">
            <NavbarSimple />
          </div>

          <div>{children}</div>
        </body>
      </html>
    </ThemeProvider>
  );
}

export default LayoutProvider;
