import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "Noto Sans JP",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        // Main colors
        white: "#FFFFFF",
        "light-grey": "#F5F7FA",
        "dark-blue": "#2C3E50",
        
        // Accent colors
        "sky-blue": "#3498DB",
        "mint-green": "#2ECC71",
        "soft-coral": "#E74C3C",
        "amber": "#F39C12",
        
        // Semantic colors (post types)
        "problem": "#9B59B6",
        "solution": "#27AE60",
        "verification": "#2980B9",
        "ethics": "#D35400",
        "problem-split": "#16A085",
        "supplement": "#8E44AD",
        "summary": "#34495E",
        "translation": "#1ABC9C",
        "estimation": "#F1C40F",
        "logical": "#2C3E50",
        
        // Dark mode
        "dark-grey": "#222831",
        "midnight-blue": "#393E46",
        "light-grey-text": "#EEEEEE",
        "light-sky-blue": "#5DADE2",
      },
      fontSize: {
        'h1': ['28px', {
          lineHeight: '1.2',
          fontWeight: '600',
        }],
        'h2': ['24px', {
          lineHeight: '1.3',
          fontWeight: '600',
        }],
        'h3': ['20px', {
          lineHeight: '1.4',
          fontWeight: '600',
        }],
        'body': ['16px', {
          lineHeight: '1.5',
          fontWeight: '400',
        }],
        'small': ['14px', {
          lineHeight: '1.5',
          fontWeight: '400',
        }],
        'xs': ['12px', {
          lineHeight: '1.5',
          fontWeight: '400',
        }],
      },
      fontWeight: {
        'regular': '400',
        'medium': '500',
        'semibold': '600',
      },
      boxShadow: {
        'light': '0 1px 4px rgba(0, 0, 0, 0.05)',
        'medium': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'heavy': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
    },
  },
  plugins: [],
} satisfies Config;
