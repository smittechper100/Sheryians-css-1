/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom SkyMart brand colors so we can reuse them everywhere
        // as "sky-navy", "sky-blue" etc. instead of typing hex codes.
        "sky-navy": "#0B1B33",     // main dark background
        "sky-navy-light": "#122A4A", // card background
        "sky-blue": "#38BDF8",     // primary accent (buttons, links)
        "sky-blue-dark": "#0EA5E9",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}

