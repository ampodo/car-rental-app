"use client";
import React from "react";
import { ThemeProvider } from '@material-tailwind/react';

function LayoutProvider({ children }) {
  return (
    <ThemeProvider>
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&display=swap"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
    </ThemeProvider>
  );
}

export default LayoutProvider;
