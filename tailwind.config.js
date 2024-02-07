/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"], // Indicates where the CSS purging utility will look for class names.
  mode: "jit", // Enables Just-In-Time mode for better performance.
  darkMode: 'class', // Specifies the mode for the dark mode feature.
  theme: {
     extend: {
       animation: {
         // Adds a custom animation named 'pingNoLoop'.
         'pingNoLoop': 'one_ping 1s cubic-bezier(0, 0, 0.2, 1) 3',
       },
       colors: {
         // Extends the color palette with custom values.
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
         // Adds a custom box shadow.
         card: "0px 35px 120px -15px #211e35",
       },
       screens: {
         // Extends the breakpoints with a custom 'xs' breakpoint.
         xs: "450px",
       },
       backgroundImage: {
         // Adds a custom background image.
         "hero-pattern": "var(--hero-bg)",
       },
       keyframes: {
         // Adds a custom keyframe animation.
         one_ping: {
           '75%, 100%': {
             transform: 'scale(2)',
             opacity: '0'
           }
         }
       },
     },
  },
  plugins: [], // No plugins are being used in this configuration.
 };