module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D3557',
        secondary: '#457B9D',
        accent: '#F1FAEE',
        accentGreen: '#43AA8B',
        highlight: '#FFD166',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
