// tailwind.config.js

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      
      backgroundColor: {
        'azul': '#081B29',
        'logo': '#FFBD59',
        'morado': '#5C469C'
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: ['@tailwindcss/forms', require('tailwindcss-animated')],
};
