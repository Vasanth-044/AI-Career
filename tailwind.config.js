/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mono-black': 'var(--mono-black)',
        'mono-white': 'var(--mono-white)',
        'mono-grey': {
          50: 'var(--mono-grey-50)',
          100: 'var(--mono-grey-100)',
          200: 'var(--mono-grey-200)',
          300: 'var(--mono-grey-300)',
          400: 'var(--mono-grey-400)',
          500: 'var(--mono-grey-500)',
          600: 'var(--mono-grey-600)',
          700: 'var(--mono-grey-700)',
          800: 'var(--mono-grey-800)',
          900: 'var(--mono-grey-900)',
        }
      },
      boxShadow: {
        'mono-sm': 'var(--shadow-sm)',
        'mono-md': 'var(--shadow-md)',
        'mono-lg': 'var(--shadow-lg)',
        'mono-xl': 'var(--shadow-xl)',
        'mono-2xl': 'var(--shadow-2xl)',
      }
    },
  },
  plugins: [],
}

