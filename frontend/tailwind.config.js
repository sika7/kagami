/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // メインカラー
        white: '#FFFFFF',
        'light-grey': '#F5F7FA',
        'dark-blue': '#2C3E50',
        
        // アクセントカラー
        'sky-blue': '#3498DB',
        'mint-green': '#2ECC71',
        'soft-coral': '#E74C3C',
        'amber': '#F39C12',
        
        // セマンティックカラー (投稿タイプ)
        problem: '#9B59B6',
        solution: '#27AE60',
        verification: '#2980B9',
        ethics: '#D35400',
        'problem-split': '#16A085',
        supplement: '#8E44AD',
        summary: '#34495E',
        translation: '#1ABC9C',
        estimation: '#F1C40F',
        'logical-text': '#2C3E50',
        
        // ダークモード
        'dark-bg': '#222831',
        'dark-element': '#393E46',
        'dark-text': '#EEEEEE',
        'dark-accent': '#5DADE2',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
      },
      fontSize: {
        'h1': '28px',
        'h2': '24px',
        'h3': '20px',
        'body': '16px',
        'small': '14px',
        'xs': '12px',
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
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      boxShadow: {
        'light': '0 1px 4px rgba(0, 0, 0, 0.05)',
        'medium': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'heavy': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      screens: {
        'mobile': '375px',
        'tablet': '768px',
        'desktop': '1024px',
        'wide': '1440px',
      },
    },
  },
  plugins: [],
};