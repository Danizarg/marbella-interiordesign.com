import type { Config } from "tailwindcss";

const withAlpha = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: withAlpha("--color-canvas"),
        surface: withAlpha("--color-surface"),
        ink: withAlpha("--color-ink"),
        muted: withAlpha("--color-muted"),
        stone: withAlpha("--color-stone"),
        sand: withAlpha("--color-sand"),
        bronze: withAlpha("--color-bronze"),
        night: withAlpha("--color-night"),
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
      },
      letterSpacing: {
        display: "-0.03em",
        title: "-0.02em",
        eyebrow: "0.22em",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
        editorial: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      maxWidth: {
        page: "1440px",
        reading: "68ch",
      },
    },
  },
  plugins: [],
};
export default config;
