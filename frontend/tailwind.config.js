/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",        // expo-router 쓰는 경우
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",    // screens 폴더 있을 때
    
  ],
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