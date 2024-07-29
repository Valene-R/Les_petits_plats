/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // Small screens
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // Medium screens
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // Default
        '5xl': ['3rem', { lineHeight: '1' }], // Large screens
        title: ['2.75rem', { lineHeight: '4.125rem' }],
      },
      height: {
        '667px': '667px',
        '72px': '72px',
      },
      borderRadius: {
        radius10: '10px',
      },
      maxWidth: {
        954: '954px',
        890: '890px',
      },
      colors: {
        customYellow: '#FFDD57',
      },
      fontFamily: {
        display: ['Anton', { fontWeight: '400' }],
      },
      screens: {
        'between-lg': { min: '1430px', max: '1440px' },
      },
    },
  },
  plugins: [],
};
