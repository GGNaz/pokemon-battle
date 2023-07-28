/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // grass: "#A6C88C",
        // normal: "#D9D9D9",
        // flying: "#FBF4CA",
        // poison: "#A899B6",
        // ground: "#B6ACAB",
        // rock: "#4B485D",
        // bug: "#AFB0B4",
        // ghost: "#A9A3BD",
        // steel: "#8697AB",
        // fire: "#EBA4A2",
        // water: "#D2DAE5",
        // electric: "#F4EFB2",
        grass: "#A6C88C",
        normal: "#D9D9D9",
        flying: "#FBF4CA",
        poison: "#A899B6",
        ground: "#B6ACAB",
        rock: "#4B485D",
        bug: "#AFB0B4",
        ghost: "#A9A3BD",
        steel: "#8697AB",
        fire: "#EBA4A2",
        water: "#D2DAE5",
        electric: "#F4EFB2",
        // fighting: ""
        // psychic:
        // ice:
        // dragon:
        // dark:
        // fairy:
        // unknown:
        // shadow:
      },
    },
  },
  plugins: [],
};
