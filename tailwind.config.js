/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'brand-red': '#9F0D1A',
        'brand-yellow': '#FFD700',
        'brand-black': '#1a1a1a',
        'brand-bg': '#efeae2',
      },
    },
  },
  plugins: [],
}
