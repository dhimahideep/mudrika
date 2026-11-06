/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#F8F5EE',
          canvas: '#FCFBF7',
          surface: '#F3EFE6',
          border: '#1C1917',
          muted: '#E5DFD7',
        },
        ink: {
          DEFAULT: '#1C1917',
          primary: '#1C1917',
          secondary: '#78716C',
          muted: '#A8A29E',
          light: '#D6D3D1',
        },
        alta: {
          DEFAULT: '#B91C1C',
          light: '#DC2626',
          dark: '#991B1B',
        },
        ochre: {
          DEFAULT: '#C29B38',
          dark: '#967420',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel Decorative"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'Menlo', 'monospace'],
        devanagari: ['"Rozha One"', '"Yatra One"', '"Noto Serif Devanagari"', 'serif'],
        'devanagari-body': ['"Noto Serif Devanagari"', 'serif'],
      },
      boxShadow: {
        'brutal-xs': '1.5px 1.5px 0px #1C1917',
        'brutal-sm': '2px 2px 0px #1C1917',
        'brutal': '3px 3px 0px #1C1917',
        'brutal-md': '4px 4px 0px #1C1917',
        'brutal-lg': '6px 6px 0px #1C1917',
        'brutal-xl': '8px 8px 0px #1C1917',
        'brutal-alta': '3px 3px 0px #B91C1C',
      }
    },
  },
  plugins: [],
}
