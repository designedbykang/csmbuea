/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'brand-red': '#9F0D1A',      // Deep Crimson (Primary)
        'brand-yellow': '#FFD700',   // Golden Yellow (Accent)
        'brand-black': '#1a1a1a',    // Dark input backgrounds
        'brand-bg': '#efeae2',       // WhatsApp-style bg
      },
    },
  },
  plugins: [],
}
