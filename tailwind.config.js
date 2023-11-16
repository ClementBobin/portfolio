/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'pingNoLoop': 'one_ping 1s cubic-bezier(0, 0, 0.2, 1) 3',
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        "black-100": "var(--black-100)",
        "black-200": "var(--black-200)",
        "white-100": "var(--white-100)",
        textColor: "var(--textColor)",
        acentuation: "var(--acentuation)",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "var(--hero-bg)",
      },
      keyframes: {
        one_ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0'
          }
        }
      },
    },
  },
  plugins: [],
};