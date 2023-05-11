/** @type {import('tailwindcss').Config} */
import tailwindcssSafeArea from "tailwindcss-safe-area";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssSafeArea],
};
