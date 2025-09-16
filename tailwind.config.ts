import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Aeonik Pro', 'system-ui', 'sans-serif'],
        'aeonik-bold': ['AeonikProBold', 'sans-serif'],
        'aeonik-regular': ['Aeonik Pro Regular', 'sans-serif'],
        'ogg': ['Ogg', 'serif'],
      },
      letterSpacing: {
        'extra-wide': '0.1em',
      }
    },
  },
  plugins: [],
}

export default config 