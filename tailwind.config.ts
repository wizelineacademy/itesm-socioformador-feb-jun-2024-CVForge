import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'whitefo': "#F0F0F0",       /* white used in background */
        'bg': "#F6FBFF",            /* light gray used in background */
        'editorgray': "#ECF1F4",    /* editor background */
        'gptgreen': "#74AA9C",      /* gpt green 74AA9C*/
        'aiblue': "#83BFEB",        /* blue used in gradient */
        'primarygray': "#222224",   /* dark gray text 1c1c1c 171717*/
        'secondarygray': "#7E7E7E", /* light gray text, used in descriptions */
        'outlinegray': "#D9D9D9",   /* used for borders */
        'acceptgreen': "#98C887",   /* green used in meter */
      },
      fontFamily: {
        koh_santepheap: ["Koh-Santepheap"],
        inter: ["Inter"],
        
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

//https://nerdcave.com/tailwind-cheat-sheet