module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens : {
      sm : '768px',
      md : '992px',
      lg : '1200px',
      xl : '1600px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
