/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        surface: 'var(--colors-bg-surface)',
        foreground: 'var(--colors-foreground-default)',
      },
    },
  },
  plugins: [],
}
