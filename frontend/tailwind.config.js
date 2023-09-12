/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens : {
      sm : '768px',
      md : '992px',
      lg : '1200px',
      xl : '1600px',
    },
    extend : {
      fontSize : {
        '0' : '0px'
      },
      lineHeight : {
        '0' : '0px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

