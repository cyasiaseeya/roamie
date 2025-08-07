/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#111827",
        tertiary: "#1F2937",
        quaternary: "#374151",
        quinary: "#4B5563",
      },
    },
  },
  plugins: [],
}