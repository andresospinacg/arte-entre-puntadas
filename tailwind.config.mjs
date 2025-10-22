export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta oscura
        dark: {
          950: '#09090B',
          900: '#18181B',
          800: '#27272A',
          700: '#3F3F46',
          600: '#52525B',
          500: '#71717A',
          400: '#A1A1AA',
        },
        // Rosa principal (del logo - hilos y corazones)
        primary: {
          50: '#FFF1F8',
          100: '#FFE4F3',
          200: '#FFC9E8',
          300: '#FF9DD6',
          400: '#FF69B4', // Rosa vibrante del logo
          500: '#F544A0',
          600: '#E02E8C',
          700: '#C11D74',
          800: '#A01960',
          900: '#851852',
        },
        // Morado/Púrpura (del logo - hilos)
        accent: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#9B59D6', // Morado del logo
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        // Turquesa/Cyan (del logo - hilos)
        warm: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#00CED1', // Turquesa del logo
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        // Beige/Crema (del logo - oveja y texto "Crochet")
        cream: {
          50: '#FEFDFB',
          100: '#FDF9F3',
          200: '#FAF3E7',
          300: '#F5DEB3', // Beige crema del logo
          400: '#E8C999',
          500: '#D4A574',
          600: '#C08552',
          700: '#A06840',
          800: '#7F5333',
          900: '#5F3E27',
        },
      },
      fontFamily: {
        // Tipografía más artesanal y amigable
        sans: ['Quicksand', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fredoka', 'Quicksand', 'system-ui', 'sans-serif'], // Más redondeada y amigable
        handwriting: ['Caveat', 'cursive'], // Para detalles especiales
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 105, 180, 0.3)', // Rosa del logo
        'glow-lg': '0 0 40px rgba(255, 105, 180, 0.4)',
        'warm-glow': '0 0 30px rgba(155, 89, 214, 0.2)', // Morado del logo
        'cyan-glow': '0 0 25px rgba(0, 206, 209, 0.3)', // Turquesa del logo
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #FF69B4 0%, #9B59D6 100%)', // Rosa a Morado
        'gradient-sunset': 'linear-gradient(135deg, #00CED1 0%, #9B59D6 50%, #FF69B4 100%)', // Turquesa-Morado-Rosa
        'gradient-soft': 'linear-gradient(135deg, #F5DEB3 0%, #FFE4F3 100%)', // Crema a Rosa suave
      },
    },
  },
  plugins: [],
}
