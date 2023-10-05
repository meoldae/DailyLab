import plugin from 'tailwindcss/plugin';
import { createThemes } from 'tw-colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      red: '#FA4949',
      orange: '#FF891A',
      yellow: '#FFC624',
      blue: '#208FFF',
      green: '#12AB47',
      gray: '#B2B2B2',
      white: '#FFFFFF',
    },
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
  plugins: [
    createThemes({
      light: {
        'primary': '#FFFFFF',
        'reverse-primary': '#000000',
        'secondary': '#F5F5F5',
        'text': '#000000',
      },
      dark: {
        'primary': '#000000',
        'reverse-primary': '#FFFFFF',
        'secondary': '#2A2A2A',
        'text': '#FFFFFF',
      },
    }),
    plugin(function({ matchVariant }) {
      matchVariant(
        'child',
        (value) => {return `& > ${value}`;}
      );
    }),
    function ({ addUtilities }) {
      addUtilities({
        '.webkit-tap-highlight-color': {
          WebkitTapHighlightColor: 'transparent !important',
        },
      }, ['responsive', 'hover'])
    },
  ],
}

