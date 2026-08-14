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
        'sound-wave':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40'%3E%3Cg stroke='rgba(167,139,250,0.22)' stroke-width='3' stroke-linecap='round'%3E%3Cline x1='5' y1='16' x2='5' y2='24'/%3E%3Cline x1='15' y1='12' x2='15' y2='28'/%3E%3Cline x1='25' y1='6' x2='25' y2='34'/%3E%3Cline x1='35' y1='10' x2='35' y2='30'/%3E%3Cline x1='45' y1='14' x2='45' y2='26'/%3E%3Cline x1='55' y1='4' x2='55' y2='36'/%3E%3Cline x1='65' y1='8' x2='65' y2='32'/%3E%3Cline x1='75' y1='15' x2='75' y2='25'/%3E%3Cline x1='85' y1='11' x2='85' y2='29'/%3E%3Cline x1='95' y1='5' x2='95' y2='35'/%3E%3Cline x1='105' y1='13' x2='105' y2='27'/%3E%3Cline x1='115' y1='9' x2='115' y2='31'/%3E%3C/g%3E%3C/svg%3E\")",
        'mesh-glow':
          'radial-gradient(ellipse 85% 55% at 20% 0%, rgba(124,58,237,0.5), transparent 62%), radial-gradient(ellipse 65% 45% at 85% 15%, rgba(34,211,238,0.38), transparent 62%), radial-gradient(ellipse 55% 45% at 50% 100%, rgba(255,47,146,0.3), transparent 62%)',
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
