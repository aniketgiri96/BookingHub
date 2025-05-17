/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#ffffff',
          100: '#ececec',
          200: '#d9d9d9',
          300: '#c5c5c5',
          400: '#a0a0a0',
          500: '#8e8e8e',
          600: '#6e6e6e',
          700: '#4a4a4a',
          800: '#2d2d2d',
          900: '#1a1a1a',
          950: '#000000',
        },
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      backgroundImage: {
        'gradient-spotlight': 'radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};