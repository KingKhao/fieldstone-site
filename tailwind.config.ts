import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Fieldstone" palette: cool, professional neutrals with a deep
        // navy-blue accent (the brand's one saturated color, used sparingly
        // for CTAs and highlights) and a muted brass for high-end detailing.
        // Token names (clay/brass) are kept for minimal diff — values below
        // define the actual on-screen colors.
        paper: "#F7F8FA",
        stone: "#E9EDF2",
        "stone-line": "#D6DCE5",
        charcoal: "#111A26",
        // ~7:1 on paper — replacement for charcoal/NN opacity text.
        "charcoal-muted": "#4E5A68",
        clay: {
          DEFAULT: "#1F4E79",
          dark: "#163A5C",
          light: "#4A7CAD",
        },
        brass: {
          DEFAULT: "#9C8244",
          // ~4.6:1 on paper — use for brass text; DEFAULT is decorative-only.
          deep: "#7A6430",
        },
        error: "#B3261E",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
