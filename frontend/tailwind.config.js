/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cv: {
          blue: {
            DEFAULT: '#1677FF',
            hover: '#0958D9',
            subtle: '#E6F4FF',
            border: '#BAE0FF',
            50: '#F0F7FF',
            100: '#E0EFFF',
            500: '#1677FF',
            600: '#0958D9',
            700: '#003EB3',
          },
          dark: '#0B0F19',
          yellow: '#FADB14',
          slate: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Newsreader"', '"Source Serif 4"', 'Georgia', 'serif'],
        clean: ['"Public Sans"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'float': '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
        'modal': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
      },
      screens: {
        'print': { 'raw': 'print' },
      }
    },
  },
  plugins: [],
};
