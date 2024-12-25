import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("nativewind/preset")], // Correct import for NativeWind preset
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        danger: "#e3342f",
      },
    },
  },
  plugins: [],
};

export default config;