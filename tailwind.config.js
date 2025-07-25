// tailwind.config.js


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation:{
                marquee: 'marquee var(--duration, 30s) linear infinite'
      },
      keyframes: {
       marquee: {
          to: { transform: 'translateX(-50%)' }
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};