import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Aeonik Pro', 'system-ui', 'sans-serif'],
<<<<<<< HEAD
        'aeonik-bold': ['AeonikProBold', 'sans-serif'],
        'aeonik-regular': ['Aeonik Pro Regular', 'sans-serif'],
      },
      letterSpacing: {
        'extra-wide': '0.1em',
      }
=======
      },
>>>>>>> 17f7ef69d1262517ee98cee7187a17bbce532328
    },
  },
  plugins: [],
}

export default config 