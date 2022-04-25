module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        indie: ['"Indie Flower"', 'cursive'],
      },
      colors: {
        'background': '#EFF0F3',
        'background2': '#FFFFFE',
        'text': '#0D0D0D',
        'accent': '#ff8e3c',
        'accent2': '#D9376E'
      },
    },
  },
  plugins: [],
}
