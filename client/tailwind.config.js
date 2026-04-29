/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        snes: {
          purple: '#7c3aed',
          yellow: '#fbbf24',
          pink: '#ec4899',
          blue: '#3b82f6',
          green: '#10b981',
          orange: '#f97316',
          red: '#ef4444',
          cyan: '#06b6d4',
          darkPurple: '#581c87',
          lightYellow: '#fef3c7',
          lightBlue: '#dbeafe',
          lightGreen: '#d1fae5',
        }
      },
      fontFamily: {
        pixel: ['Press Start 2P', 'cursive'],
        terminal: ['VT323', 'monospace'],
        snes: ['VT323', 'monospace'],
      },
      borderWidth: {
        snes: '4px',
        thick: '8px',
      },
      boxShadow: {
        snes: '0 8px 0 #ec4899, 0 12px 20px rgba(0, 0, 0, 0.2)',
        'snes-blue': '0 8px 0 #3b82f6, 0 12px 20px rgba(0, 0, 0, 0.2)',
        'snes-green': '0 8px 0 #10b981, 0 12px 20px rgba(0, 0, 0, 0.2)',
        'snes-button': '0 6px 0 #7c3aed, 0 8px 10px rgba(0, 0, 0, 0.3)',
        'snes-input': 'inset 0 2px 0 #e9d5ff, 0 4px 0 #a78bfa',
        'snes-focus': 'inset 0 2px 0 #e9d5ff, 0 4px 0 #7c3aed, 0 0 0 3px rgba(124, 58, 237, 0.1)',
      },
      animation: {
        bounce: 'bounce 2s ease-in-out infinite',
        pulse: 'pulse 1s infinite',
        'pulse-slow': 'pulse 3s infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        bounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      backgroundImage: {
        'snes-gradient': 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        'snes-blue-gradient': 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
        'snes-green-gradient': 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
        'rainbow-gradient': 'linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6, #10b981, #f59e0b, #ef4444)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
