import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#F4F7F5",
        panel: "#FFFFFF",
        ink: "#16232B",
        "ink-soft": "#4C5B63",
        accent: "#168A91",
        "accent-deep": "#087078",
        brass: "#E49A49",
        coral: "#E46C5B",
        mint: "#DDF1E8",
        "sky-soft": "#DDEFF4",
        line: "#C9D9D5"
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)"],
        body: ["var(--font-work-sans)"]
      }
    }
  },
  plugins: []
};

export default config;
