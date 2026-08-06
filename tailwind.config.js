/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'], // puedes usar `sans` si quieres que sea predeterminado
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      fontSize: {
      '2xs': '0.625rem',   // 10px
      'xs': '0.75rem',     // 12px
      'sm': '0.875rem',    // 14px
      'base': '1rem',      // 16px
      'lg': '1.125rem',    // 18px
      'xl': '1.25rem',     // 20px
      '2xl': '1.5rem',     // 24px
      '3xl': '1.875rem',   // 30px
      '4xl': '2.25rem',    // 36px
      '5xl': '3rem',       // 48px
      },
      
      colors: {
        brand: {
          1: "#1089e0",
          2: "#143655",
          3: "#606565",
          4: "#43b2bc",
          5: "#37AC1A",
          6: "#fef0d5",
        },
      },
      container: {
        center: true,
        padding: "2rem",
      },
      screens: {
        sm: "640px",
        md: "689px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1280px",
      },
    },
  },
  plugins: [],
};
