module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: { 100: '#f03a47' },
        green: { 100: '#558b6e' },
        yellow: { 100: '#eca400' },
        purple: { 100: '#8a2be2' },
        lightPurple: { 100: '#c8a6e7' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
