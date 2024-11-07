/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray_000: "#F8F8F8",
        gray_001: "#D7D7D7",
        gray_002: "#737373",
        gray_003: "#464646",
        gray_004: "#323232",
        gray_005: "#262626",
        gray_006: "#1F1F1F",
        primary: "#E09148",
        error: "#E04848",
        second_001: "#FFD9E4",
        second_002: "#F39AB3",
        bg_blur_white: "rgba(255,255,255,0.4)",
        bg_blur_black: "rgba(0,0,0,0.2)",
      },
    },
  },
};
