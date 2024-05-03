/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      'light-green': '#ABC7BD',
      'green': '#016E46',
      'white': '#ffffff',
      'light-gray': '#F4F4F4',
      'gray': '#808080',
      'black': '#2F3830',
      'blue': '#007aff'
    },
  },
  plugins: [],
}

