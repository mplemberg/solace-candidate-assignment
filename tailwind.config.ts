import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        solace: {
          primary: "#2C4BFF", // Blue color from Solace website
          secondary: "#3E7EFF", // Lighter blue for secondary elements
          accent: "#FF6B35", // Orange accent color
          light: "#F8F9FA", // Light background
          dark: "#1A1A2E", // Dark text color
          gray: "#6C757D", // Gray text color
          green: "#2A5C46", // Green from the Solace website
          gold: "#E7B75F", // Gold color for buttons
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
