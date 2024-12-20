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
        success: "#5AE048",
        second_001: "#FFD9E4",
        second_002: "#F39AB3",
        bg_blur_white: "rgba(255,255,255,0.4)",
        bg_blur_black: "rgba(0,0,0,0.2)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        fadeIn: "fadeIn 1s ease-out",
        upward: "upward 2s ease-out 1",
        rightward: "rightward 2s ease-out 1",
        leftward: "leftward 2s ease-out 1",
        appear: "appear .5s ease-out 1",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100vh)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        upward: {
          "0%": { margin: "30px 0px 0px 0px" },
          "100%": { margin: "0px" },
        },
        rightward: {
          "0%": { margin: "0px 0px 0px 30px" },
          "100%": { margin: "0px" },
        },
        leftward: {
          "0%": { margin: "0px 30px 0px 0px" },
          "100%": { margin: "0px" },
        },
        appear: {
          "0%": { opacity: "0" },
          "100%": { margin: "1" },
        },
      },
    },
  },
};
