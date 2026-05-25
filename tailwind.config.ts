import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FFFDFB",
          100: "#FBF4F1",
          200: "#F6EAE5",
        },
        rose: {
          50: "#FBEEEF",
          100: "#F7DFE2",
          200: "#F4D6D8",
          300: "#EFC1C5",
          400: "#E5A4AB",
          500: "#D88891",
          600: "#B86973",
          700: "#8A4D55",
        },
        gold: {
          400: "#D4A574",
          500: "#B88A5A",
          600: "#8F6A42",
        },
        ink: {
          900: "#3A2B2E",
          800: "#4F3D40",
          700: "#6B5559",
          500: "#8E7A7E",
          300: "#C4B5B8",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        script: ["var(--font-cormorant)", "Georgia", "serif"],
        heavy: ["var(--font-manrope)", "system-ui", "sans-serif"],
        passions: ["var(--font-passions)", "cursive"],
      },
      maxWidth: {
        site: "1440px",
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(184, 105, 115, 0.18)",
        petal: "0 20px 60px -20px rgba(184, 105, 115, 0.3)",
      },
      backgroundImage: {
        "rose-gradient":
          "linear-gradient(135deg, #FBF4F1 0%, #F7DFE2 50%, #F4D6D8 100%)",
        "petal-gradient":
          "radial-gradient(ellipse at top, #F7DFE2 0%, #FBF4F1 60%, #FFFDFB 100%)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 80s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
