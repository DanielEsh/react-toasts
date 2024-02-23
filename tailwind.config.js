/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        surface: 'var(--colors-bg-surface)',
        background: 'var(--colors-background-default)',
        foreground: 'var(--colors-foreground-default)',
        subtle: 'var(--colors-border-subtle)',
      },
    },
  },
  plugins: [],
}
