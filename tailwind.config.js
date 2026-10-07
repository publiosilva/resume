/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        win95: ['"MS Sans Serif"', 'Tahoma', 'Geneva', 'sans-serif'],
      },
      colors: {
        win: {
          gray: '#c0c0c0',
          dark: '#808080',
          darker: '#404040',
          teal: '#008080',
          navy: '#000080',
          black: '#000000',
          white: '#ffffff',
        },
      },
      boxShadow: {
        'win-out': 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
        'win-in': 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080',
      },
    },
  },
  plugins: [],
}
