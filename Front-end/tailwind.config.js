/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        rood: '#FF0101',
        Wit: '#FFFFFF',
        Grijs: '#474747',
        Lichtgrijs: '#BDBDBD',
        Groen:'#E5FFAE',
      }
    },
  },
  plugins: [],
}