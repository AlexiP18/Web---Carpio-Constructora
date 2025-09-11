/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'urbanist': ['Urbanist', 'sans-serif'],
        'heebo': ['Heebo', 'sans-serif'],
      },
      colors: {
        'neutral': {
          'darkest': '#0c0801',
          'lightest': '#f2f2f2',
          'lighter': '#dad9d8',
          'light': '#e5e5e5',
        },
        'forest-green': '#2d862d',
        'dodger-blue-lighter': '#d7e6fd',
        'beige': '#dad9d8',
      },
      fontSize: {
        'heading-1': ['84px', { lineHeight: '1.1', letterSpacing: '0.84px' }],
        'heading-2': ['60px', { lineHeight: '1.2', letterSpacing: '0.6px' }],
        'heading-3': ['48px', { lineHeight: '1.2', letterSpacing: '0.48px' }],
        'heading-4': ['40px', { lineHeight: '1.2', letterSpacing: '0.4px' }],
        'heading-5': ['32px', { lineHeight: '1.2', letterSpacing: '0.32px' }],
        'heading-6': ['26px', { lineHeight: '1.2', letterSpacing: '0.26px' }],
        'text-medium': ['20px', { lineHeight: '1.6' }],
        'text-regular': ['18px', { lineHeight: '1.6' }],
        'text-small': ['16px', { lineHeight: '1.6' }],
      },
      maxWidth: {
        'container-large': '1280px',
        'large': '768px',
        'small': '480px',
        'xsmall': '400px',
      },
      borderRadius: {
        'medium': '32px',
        'large': '40px',
      },
      padding: {
        'section-large': '112px',
        'section-medium': '80px',
        'global': '64px',
      }
    },
  },
  plugins: [],
}
