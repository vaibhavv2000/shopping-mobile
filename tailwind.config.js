/** @type {import('tailwindcss').Config} */
module.exports={
 darkMode: "class",
 content: ["./App.{js,jsx,ts,tsx}","./src/**/*.{js,jsx,ts,tsx}"],
 theme: {
  extend: {
   fontFamily: {
    "inter/100": ["Inter_100Thin"],
    "inter/200": ["Inter_200ExtraLight"],
    "inter/300": ["Inter_300Light"],
    "inter/400": ["Inter_400Regular"],
    "inter/500": ["Inter_500Medium"],
    "inter/600": ["Inter_600SemiBold"],
    "inter/700": ["Inter_700Bold"],
    "inter/800": ["Inter_800ExtraBold"],
    "inter/900": ["Inter_900Black"],
   },
   colors: {
    "primary": "dodgerblue",
    "darkSecondary": "#121212"
   }
  },
 },
 plugins: [],
};