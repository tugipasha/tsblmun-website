/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        bg: "#0f2725",
        stage: "#15302e",
        paper: "#f3faf6",
        ink: "#0e342e",
        muted: "rgba(243, 250, 246, 0.68)",
        line: "rgba(243, 250, 246, 0.2)",
        gold: "#d9a656",
        goldDim: "rgba(217, 166, 86, 0.6)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
