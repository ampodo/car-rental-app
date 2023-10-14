/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        slate: {
          100: '#f0f4f8',
          200: '#d9e2ec',
          300: '#b7c4d1',
          400: '#8b9fb5',
          500: '#647e99',
          600: '#4d6a81',
          700: '#405a6e',
          800: '#354c5d',
          900: '#2c3e4d',
        },
        sky: { // Use "sky" instead of "cyan"
          100: '#E0FFFF',
          200: '#B0E0E6',
          300: '#87CEEB',
          400: '#00BFFF',
          500: '#1E90FF',
          600: '#4682B4',
          700: '#5F9EA0',
          800: '#00CED1',
          900: '#20B2AA',
        },
        // Add more color variations as needed
      },
    },
  },
  plugins: [],
});