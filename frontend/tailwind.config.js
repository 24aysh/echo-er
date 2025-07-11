/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        blue:{
          200:"#8094ad",
          500:"#19406a",
          600:"#0088FE",
          700:"#002b4b"
        },
        green:{
          400:"#36c6c0"
        },
        gray:{
          500:"#E9E8EE"
        }
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

