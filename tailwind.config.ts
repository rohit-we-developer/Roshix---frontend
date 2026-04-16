import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          400: "#ff8533",
          500: "#ff6600",
          600: "#e55c00",
          700: "#cc5200",
        },
        roshix: {
          orange: "#FF6B00",
          "orange-light": "#FF8C33",
          dark: "#0A0A0A",
          "dark-2": "#111111",
          "dark-3": "#1A1A1A",
          gray: "#888888",
          "gray-light": "#CCCCCC",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "scroll-left": "scrollLeft 30s linear infinite",
        "scroll-right": "scrollRight 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-orange": "pulseOrange 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseOrange: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 107, 0, 0.4)" },
          "50%": { boxShadow: "0 0 0 20px rgba(255, 107, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
