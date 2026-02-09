module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
  // other configurations...
}

console.log("Tailwind CSS configured for dark mode and content paths.");