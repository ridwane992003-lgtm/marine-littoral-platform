/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        marine: '#0f4c5c',
        sand: '#e9d8a6',
        algae: '#2a9d8f',
        foam: '#f8fafc',
      },
    },
  },
  plugins: [],
}
