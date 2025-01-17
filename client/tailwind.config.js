/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary_bg: "#F5F6FA",
        light_text: "#323232",
        dark_text: "#232323",
        accent_color: "#F89A20",
      },
      fontFamily: {
        hg: ["Host Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
