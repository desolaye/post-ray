/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['raleway', 'sans-serif'],
      },
      boxShadow: {
        'z-light': '0 0 .625rem -.1875rem #00000021',
      },
      borderColor: {
        'z-light': '1px solid #e9e9f2',
      },
    },
  },
  plugins: [],
}
