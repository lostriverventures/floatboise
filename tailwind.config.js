/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './map/index.html'],
  theme: {
    extend: {
      colors: {
        river: { DEFAULT: '#0A4D68', dark: '#073B50', light: '#E8F1F5' },
        leaf: { DEFAULT: '#15803d', light: '#ECFDF3' },
        sand: '#EADFC6',
        cream: '#FDFBF7',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(7,59,80,0.04), 0 8px 24px -12px rgba(7,59,80,0.18)',
        lift: '0 12px 32px -12px rgba(7,59,80,0.30)',
      },
    },
  },
};
