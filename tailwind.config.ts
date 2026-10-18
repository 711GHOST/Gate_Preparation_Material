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
        // theme-aware foreground (flips with .dark); use for content text/surfaces
        fg: 'rgb(var(--fg) / <alpha-value>)',
        ink: {
          DEFAULT: '#0B1020',
          soft: '#1A2238',
        },
        brand: {
          50: '#eef0ff',
          100: '#e0e3ff',
          200: '#c7ccff',
          300: '#a3a8ff',
          400: '#7f7bff',
          500: '#6457f6',
          600: '#5138e6',
          700: '#4429c4',
          800: '#38259e',
          900: '#30257d',
        },
        accent: {
          cyan: '#22d3ee',
          violet: '#a855f7',
          emerald: '#34d399',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(49, 37, 125, 0.25)',
        glow: '0 0 0 1px rgba(100,87,246,0.2), 0 20px 60px -20px rgba(100,87,246,0.55)',
        card: '0 1px 2px rgba(16,24,40,0.04), 0 12px 30px -12px rgba(16,24,40,0.12)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(16,24,40,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,24,40,0.045) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '80%,100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseRing: 'pulseRing 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
