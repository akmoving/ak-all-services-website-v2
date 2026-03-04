/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0F0F10",
          panel: "#1A1A1C",
          panel2: "#141416",
          text: "#F5F5F5",
          muted: "#A1A1AA",
          line: "#2A2A2E",
          gold: "#C6A75E",
          gold2: "#E0C27A",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.35)",
      },
    },
  },
  plugins: [],
};