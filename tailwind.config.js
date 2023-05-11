/** @type {import('tailwindcss').Config} */
import tailwindcssSafeArea from "tailwindcss-safe-area";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        oldPaper: "#dddbc7",
        blackov: "#000000",
      },
      fontFamily: {
        serif: ["Zilla Slab", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [tailwindcssSafeArea],
};
