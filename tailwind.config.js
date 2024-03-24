/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        gray: {
          100: 'var(--colors-gray-12)',
          200: 'var(--colors-gray-11)',
        },
        neutral: {
          100: 'var(--colors-neutral-1)',
          200: 'var(--colors-neutral-2)',
          300: 'var(--colors-neutral-3)',
          600: 'var(--colors-neutral-6)',
          900: 'var(--colors-neutral-12)',
        },
        white: 'var(--color-white)',

        surface: 'var(--colors-bg-surface)',
        background: 'var(--colors-background-default)',
        foreground: 'var(--colors-foreground-default)',
        subtle: 'var(--colors-border-subtle)',

        'success-1': 'var(--success-bg)',
        'success-2': 'var(--success-border)',
        'success-3': 'var(--success-text)',

        'info-1': 'var(--info-bg)',
        'info-2': 'var(--info-border)',
        'info-3': 'var(--info-text)',

        'warning-1': 'var(--warning-bg)',
        'warning-2': 'var(--warning-border)',
        'warning-3': 'var(--warning-text)',

        'error-1': 'var(--error-bg)',
        'error-2': 'var(--error-border)',
        'error-3': 'var(--error-text)',
      },
      spacing: {
        notification: '356px',
      },
    },
  },
  plugins: [],
}
