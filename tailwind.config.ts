import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotateX(20deg) translateX(-8px)" },
          "50%": { transform: "rotateX(-20deg) translateX(8px)" },
        },
        walkX: {
          "0%, 100%": { transform: "translateX(0vw)" },
          "50%": { transform: "translateX(24vw)" },
          "75%": { transform: "translateX(12vw)" },
        },
        walkY: {
          "0%, 100%": { transform: "translateY(0vh)" },
          "50%": { transform: "translateY(20vh)" },
          "75%": { transform: "translateY(-4vh)" },
        },
        popIn: {
          "0%": { transform: "translateY(0em) scale(0.5)", opacity: "0.25" },
          "75%": { transform: "translateY(-1em) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-1em) scale(1)", opacity: "0" },
        },
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
        walkX: "walkX ease-in-out infinite",
        walkY: "walkY ease-in-out infinite",
        popIn: "popIn 600ms ease-out 1 forwards",
      },
      listStyleType: {
        square: "square",
      },
      colors: {
        "dialog-backdrop": "rgb(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
