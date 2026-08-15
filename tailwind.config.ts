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
        // Theme-aware: these read CSS variables defined in globals.css
        // (:root = light, [data-theme='dark'] = dark), so every existing
        // ink-*/bone-* class automatically repaints when the theme toggles.
        ink: {
          950: 'rgb(var(--ink-950) / <alpha-value>)',
          900: 'rgb(var(--ink-900) / <alpha-value>)',
          800: 'rgb(var(--ink-800) / <alpha-value>)',
          700: 'rgb(var(--ink-700) / <alpha-value>)',
          600: 'rgb(var(--ink-600) / <alpha-value>)',
          500: 'rgb(var(--ink-500) / <alpha-value>)',
        },
        bone: {
          50: 'rgb(var(--bone-50) / <alpha-value>)',
          100: 'rgb(var(--bone-100) / <alpha-value>)',
          300: 'rgb(var(--bone-300) / <alpha-value>)',
          400: 'rgb(var(--bone-400) / <alpha-value>)',
          500: 'rgb(var(--bone-500) / <alpha-value>)',
        },
        // Every `border-white/10`, `bg-white/[0.03]` etc. across the app is a
        // "faint overlay on the base surface" — flip it dark-on-light in
        // light mode instead of white-on-dark, via the same variable trick.
        white: 'rgb(var(--overlay-rgb) / <alpha-value>)',
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
