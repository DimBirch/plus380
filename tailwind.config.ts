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
        volt: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        cyan: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
        },
        flare: {
          400: '#ff5fa2',
          500: '#ff2f92',
          600: '#e6127a',
        },
        acid: {
          400: '#d4ff3f',
          500: '#c2f229',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-lines':
          'linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)',
        'mesh-glow':
          'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(124,58,237,0.35), transparent 60%), radial-gradient(ellipse 60% 40% at 85% 15%, rgba(34,211,238,0.25), transparent 60%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255,47,146,0.18), transparent 60%)',
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
