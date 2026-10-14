import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        kid: {
          purple: '#6C5CE7',
          'purple-dark': '#4834D4',
          'purple-light': '#F1EFFF',
          yellow: '#FFC048',
          'yellow-light': '#FFF5D9',
          pink: '#FF6B8B',
          green: '#2ED573',
          'green-dark': '#20BF6B',
          blue: '#1E90FF',
          dark: '#1E272E',
          muted: '#808E9B',
        },
      },
      boxShadow: {
        'card-selected': '0 10px 25px -5px rgba(108, 92, 231, 0.3), 0 0 0 2.5px #6C5CE7',
        'cta-glow': '0 8px 24px -2px rgba(46, 213, 115, 0.45)',
        'float': '0 16px 32px -8px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'wiggle-slow': 'wiggle 3s ease-in-out infinite',
        'pulse-gentle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce-soft 2s infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
