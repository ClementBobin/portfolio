export default {
  plugins: {
    'postcss-import': {},
    
     // We're using the postcss-nesting plugin to allow for nested CSS syntax, like what's provided by the tailwindcss plugin
     'tailwindcss/nesting': 'postcss-nesting',
     
     // This is the tailwindcss plugin. It generates a large amount of CSS utility classes that make it easy to design a consistent and attractive user interface.
     tailwindcss: {},
     
     // The autoprefixer plugin is used to parse CSS and add vendor prefixes to rules that require them. This ensures compatibility across browsers.
     autoprefixer: {},
  },
}