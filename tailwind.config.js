/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}', './pages/**/*.{js,ts,jsx,tsx,css}'],
  // corePlugins: {
  //   preflight: false
  // },
  important: '#__next',
  plugins: [
    require('tailwindcss-logical'), 
    require('./src/@core/tailwind/plugin'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms')({strategy: 'class'}),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-koho)', 'sans-serif'],
        koho: ['var(--font-koho)'],
        italiana: ['var(--font-italiana)']
      },
      colors: {
        primary: '#1c252e',
        secondary: '#637381',
        disabled: '#919EAB'
      },
      textColor: {
        primary: '#1c252e',
        secondary: '#637381',
        disabled: '#919EAB'
      },
      keyframes: {
        scale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' }
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        'pulse-scale': 'scale 2s infinite',
        'slideIn': 'slideIn 0.3s ease-out forwards'
      },
      fontSize: {
        'xs': '1.2rem',
        'sm': '1.4rem',
        'base': '1.6rem',
        'lg': '1.8rem',
        'xl': '2.0rem',
        '2xl': '2.4rem',
        '3xl': '3.0rem',
        '4xl': '3.6rem',
        '5xl': '4.2rem',
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1080px',
      xl: '1280px',
      '2xl': '1536px'
    }
  }
};
