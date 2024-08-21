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
        radius14: '14px',
        radius21: '21px',
      },
      maxWidth: {
        954: '954px',
        890: '890px',
        '8xl': '90rem', // 1440px
      },
      colors: {
        customYellow: '#FFD15B',
        customLightGrey: '#EDEDED',
        customGrey: '#7A7A7A', //rgba(122, 122, 122, 1)
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        h3: ['Manrope', 'sans-serif'],
        list: ['Manrope', 'sans-serif'],
        li: ['Manrope', 'sans-serif'],
        search: ['Manrope', 'sans-serif'],
      },
      fontWeight: {
        display: '400',
        h3: '700',
        list: '500',
        li: '400',
        search: '400',
      },
      screens: {
        'between-lg': { min: '1430px', max: '1440px' },
        'xs-sm': { min: '320px', max: '1122px' },
        'xs-sm-col': { min: '320px', max: '1026px' },
      },
      boxShadow: {
        'custom-card': '0px 4px 34px 30px rgba(0, 0, 0, 0.04)',
      },
      keyframes: {
        'dropdown-open': {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        'dropdown-close': {
          '0%': { transform: 'scaleY(1)' },
          '100%': { transform: 'scaleY(0)' },
        },
      },
      animation: {
        'dropdown-open': 'dropdown-open 0.3s ease-out forwards',
        'dropdown-close': 'dropdown-close 0.3s ease-in forwards',
      },
    },
  },
  plugins: [],
};
