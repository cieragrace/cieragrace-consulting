/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // --- Copper (primary warm) ---
        copper: {
          50:  '#FBF1EC',
          100: '#F5DDD1',
          200: '#EBBDA8',
          300: '#DF9C80',
          400: '#D48A6E',
          500: '#C97B5C', // primary
          600: '#B5664A',
          700: '#964F39',
          800: '#763C2C',
          900: '#5A2D21',
        },

        // --- Copper Deep (rich accent) ---
        copperDeep: {
          50:  '#F6E6DF',
          100: '#EAC4B5',
          200: '#D69379',
          300: '#BE6A4A',
          400: '#A8543A',
          500: '#9B4A2E', // accent
          600: '#823C24',
          700: '#682F1C',
          800: '#4F2316',
          900: '#39190F',
        },

        // --- Blush (pastel pink) ---
        blush: {
          50:  '#FDF4F2',
          100: '#FBE5E0',
          200: '#F7D2C9',
          300: '#F4C9C0', // primary blush
          400: '#EDAEA1',
          500: '#E29282',
          600: '#C97565',
          700: '#A55B4D',
          800: '#7E443A',
          900: '#5C2F29',
        },

        // --- Peach ---
        peach: {
          50:  '#FFF6EE',
          100: '#FFE8D6',
          200: '#FFD5B5',
          300: '#FFCBA8', // primary peach
          400: '#FFB082',
          500: '#F5945C',
          600: '#D97843',
          700: '#B25F35',
          800: '#894728',
          900: '#62321C',
        },

        // --- Mint (soft sage) ---
        mint: {
          50:  '#F1F8F4',
          100: '#DDEEE3',
          200: '#C6E2D0',
          300: '#B5D8C5', // primary mint
          400: '#94C3A8',
          500: '#74AC8B',
          600: '#5A8E70',
          700: '#467259',
          800: '#345843',
          900: '#243F30',
        },

        // --- Lavender (dusty) ---
        lavender: {
          50:  '#F6F3FB',
          100: '#E8E2F1',
          200: '#D9D0E8',
          300: '#CFC4E3', // primary lavender
          400: '#B5A5D3',
          500: '#9988BD',
          600: '#7C6BA1',
          700: '#615383',
          800: '#4A3F66',
          900: '#352D49',
        },

        // --- Cream (buttery base) ---
        cream: {
          DEFAULT: '#FDF6EF',
          50:  '#FFFCF8',
          100: '#FDF6EF', // body bg
          200: '#FAEEDF',
          300: '#F4E0C8',
          400: '#EBCDA8',
          500: '#DDB585',
          600: '#C29766',
          700: '#9D784F',
          800: '#765A3C',
          900: '#523F2A',
        },

        // --- Ink (warm charcoal for text) ---
        ink: {
          DEFAULT: '#2A1F1A',
          50:  '#F4EFEB',
          100: '#E2D6CD',
          200: '#BFAB9C',
          300: '#9A8473',
          400: '#766052', // ~ secondary text
          500: '#574536',
          600: '#3F3128',
          700: '#2A1F1A', // primary text
          800: '#1D1511',
          900: '#120C09',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(42, 31, 26, 0.07)',
        card: '0 4px 20px rgba(201, 123, 92, 0.10)',
      },
      letterSpacing: {
        tightish: '-0.015em',
      },
      maxWidth: {
        prose: '65ch',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
