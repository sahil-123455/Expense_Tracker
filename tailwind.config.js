/** @type {import('tailwindcss').Config} */
export default {
  // IMPORTANT: this enables the Dark Mode feature using the 'class' strategy.
  darkMode: 'class', 
  
  // it tells tailwind which files to scan for classes.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}