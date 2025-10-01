/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#6366F1',
          secondary: '#22C55E',
          accent: '#F59E0B',
          neutral: '#111827',
          'base-100': '#ffffff',
        },
      },
      'dark',
    ],
  },
};

