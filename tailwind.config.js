/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        runRight: {
          '0%': { transform: 'translateX(100vw)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        runRight: 'runRight 15s linear infinite',
        ticker: 'ticker 15s linear infinite',
      }
    },
  },
  plugins: [],
};
