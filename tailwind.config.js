module.exports = {
  /** @type {import('tailwindcss').Config} */
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#B81005',
          'red-dark': '#940D05',
          'red-light': '#D61003',
          orange: '#FC542B',
          'orange-alt': '#FB6441',
        },
        site: {
          bg: '#F6F6F7',
          container: '#FFFFFF',
          footer: '#1A1A1A',
          'footer-text': '#A3A3A3',
          'footer-title': '#F5F5F5',
          'heading-gray': '#666666',
          'text-dark': '#333333',
          'text-heading': '#111111',
          'credit-text': '#CCCCCC',
          'top-menu-text': '#EEEEEE',
          'nav-link': '#B81005',
          'nav-active-bg': '#B81005',
          'nav-active-text': '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        coda: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
