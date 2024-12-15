/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Container markazda bo'ladi
        padding: {
          DEFAULT: '20px', // Default padding
          sm: '1rem',      // Kichik ekranlar uchun padding
          md: '2rem',      // O'rta ekranlar uchun padding
          lg: '4rem',      // Katta ekranlar uchun padding
          xl: '5rem',      // Juda katta ekranlar uchun padding
        },
      },
    },
  },
  plugins: [],
};
