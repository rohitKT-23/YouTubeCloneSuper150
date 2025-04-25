/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'youtube-red': '#FF0000',
        'youtube-dark': '#0F0F0F',
        'youtube-black': '#282828',
        'youtube-light-black': '#1F1F1F',
        'youtube-gray': '#717171',
        'youtube-light-gray': '#AAAAAA',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fadeIn': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'youtube': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'youtube-hover': '0 2px 8px rgba(0, 0, 0, 0.2)',
      },
      transitionTimingFunction: {
        'youtube': 'cubic-bezier(0.1, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};