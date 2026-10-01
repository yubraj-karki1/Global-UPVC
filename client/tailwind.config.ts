import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#F3F6FA",
        panel: "#FFFFFF",
        ink: "#101820",
        "ink-soft": "#58677A",
        accent: "#3478C8",
        "accent-deep": "#1557A0",
        brass: "#70A7E8",
        coral: "#3478C8",
        mint: "#DCEBFA",
        "sky-soft": "#E6F0FC",
        line: "#D5DFEB"
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
