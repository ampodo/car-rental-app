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
      screens: {
        'sm': '375px',
        'md': '768px',
        'lg': '1024px',
        
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
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#87CEEB',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2196f3',
          700: '#1d4ed8',
          800: '#1e40af',
        },
        zinc: { // Add the "zinc" color palette
          100: '#F5F5F5',
          200: '#E0E0E0',
          300: '#C0C0C0',
          400: '#A9A9A9',
          500: '#808080',
          600: '#696969',
          700: '#555555',
          800: '#333333',
          900: '#1A1A1A',
        },
        'gray-50': 'rgb(249 250 251)',
        'gray-100': 'rgb(243 244 246)',
        'gray-200': 'rgb(229 231 235)',
        'gray-300': 'rgb(209 213 219)',
      },
    },
  },
  plugins: [],
});