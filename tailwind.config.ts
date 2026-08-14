import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050508',
          900: '#0a0a10',
          800: '#0f0f18',
          700: '#16161f',
          600: '#1e1e2a',
          500: '#2a2a38',
        },
        bone: {
          50: '#f7f7f9',
          100: '#eceef2',
          300: '#c4c6d1',
          400: '#9a9caa',
          500: '#71738a',
        },
        red: {
          300: '#ff9d9f',
          400: '#ff4d51',
          500: '#e31b23',
          600: '#b3141a',
          700: '#8a0f14',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        logo: ['var(--font-logo)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'mesh-glow':
          'radial-gradient(ellipse 85% 55% at 20% 0%, rgba(227,27,35,0.45), transparent 62%), radial-gradient(ellipse 65% 45% at 85% 15%, rgba(179,20,26,0.32), transparent 62%), radial-gradient(ellipse 55% 45% at 50% 100%, rgba(255,77,81,0.22), transparent 62%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
