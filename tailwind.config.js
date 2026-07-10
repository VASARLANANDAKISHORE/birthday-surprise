/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        script: ['Dancing Script', 'cursive'],
        body: ['Poppins', 'sans-serif'],
      },
      colors: {
        night: {
          900: '#0a0420',
          800: '#150830',
          700: '#1f0d45',
          600: '#2a1255',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        rose: {
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        blush: {
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(251, 191, 36, 0.4)',
        'glow-lg': '0 0 60px rgba(251, 191, 36, 0.5)',
        'glow-rose': '0 0 40px rgba(244, 63, 94, 0.4)',
      },
      backgroundImage: {
        'night-gradient':
          'radial-gradient(ellipse at top, #2a1255 0%, #150830 45%, #0a0420 100%)',
        'gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      },
    },
  },
  plugins: [],
};
