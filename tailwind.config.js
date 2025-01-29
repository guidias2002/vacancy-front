/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      },
      colors: {
        'sub-title': '#636362',
        'color-gray': '#f9f9f9',
        'color-table-row': 'rgba(193, 224, 166, 0.07)'
      }
    },
  },
  plugins: [],
}

