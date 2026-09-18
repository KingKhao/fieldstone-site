import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Fieldstone" palette: warm quarried-stone neutrals, a burnt-clay
        // accent (the brand's one saturated color, used sparingly for CTAs
        // and highlights), and a muted brass for small decorative details.
        paper: "#F7F4EF",
        stone: "#EDE7DD",
        "stone-line": "#DCD3C2",
        charcoal: "#23201B",
        // ~6.8:1 on paper — replacement for charcoal/NN opacity text.
        "charcoal-muted": "#5C554A",
        clay: {
          DEFAULT: "#A0492A",
          dark: "#7E3A21",
          light: "#C97A54",
        },
        brass: {
          DEFAULT: "#9C7A3C",
          // ~4.6:1 on paper — use for brass text; DEFAULT is decorative-only.
          deep: "#7A5E2C",
        },
        error: "#8C3A2B",
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
