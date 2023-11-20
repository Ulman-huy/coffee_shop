/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff3b5c",
        yellow: "#f88630",
        black: "rgb(18, 18, 18)",
        error: "#ff4d4f",
        "yellow-10": "rgba(255, 186, 48, 0.1);",
      },
      backgroundColor: {
        grey: "#1b1b1b",
        header: "rgba(18, 18, 18, 0.9)",
      },
      maxWidth: {
        default: "1200px",
      },
      borderColor: {
        grey: "rgb(154, 154, 154)",
        yellow: "#f88630 !important",
      },
      padding: {
        15: "60px",
      },
      fontFamily: {
        pacifico: "'Pacifico', cursive",
      },
      boxShadowColor: {
        yellow: "#f88630",
      },
      textColor: {
        yellow: "#f88630",
        grey: "rgb(154, 154, 154)",
      },
      boxShadow: {
        search: "0 0 6px #f88630",
      },
      gridTemplateColumns: {
        discover: "42% auto",
        "discover-reverse": "auto 42%",
      },
    },
  },
  plugins: [],
};
