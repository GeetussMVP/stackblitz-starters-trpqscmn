import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-grey-270': 'linear-gradient(270deg, #d3d3d3, #4b4b4b)',
      },
      keyframes: {
        underline: {
          from: { 'stroke-dashoffset': '1000' },
          to: { 'stroke-dashoffset': '0' },
        },
      },
      animation: {
        underline: 'underline 2s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
