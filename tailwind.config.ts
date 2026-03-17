import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — warm amber-orange
        brand: {
          50:  '#fdf6ec',
          100: '#fae8cc',
          200: '#f5cf99',
          300: '#efb166',
          400: '#e9933d',
          500: '#e07820', // Primary brand orange
          600: '#c45e14',
          700: '#a34513',
          800: '#843817',
          900: '#6c2f17',
          950: '#3d1509',
        },
        // Trust/health green
        forest: {
          50:  '#f2f9f2',
          100: '#e0f1e0',
          200: '#c2e3c3',
          300: '#95cc97',
          400: '#62ae65',
          500: '#3e9142',
          600: '#2d7431',
          700: '#265c29',
          800: '#224924',
          900: '#1d3d1f',
          950: '#0e210f',
        },
        // Extend neutral with near-black
        neutral: {
          950: '#0a0a0a',
        },
        // Note: Tailwind's built-in `stone-*` palette is used for warm editorial tones.
        // stone-50 (#fafaf9) → body bg via --color-bg CSS var
        // stone-100 (#f5f5f4) → alt section bg via --color-bg-alt
        // stone-800 (#292524), stone-900 (#1c1917) → heading/body text
      },
      fontFamily: {
        sans:  ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono:  ['var(--font-geist-mono)', 'monospace'],
      },
      letterSpacing: {
        // -0.025em (h1/large headings) is Tailwind's built-in `tracking-tight`
        // -0.015em (h3/small headings) has no built-in equivalent
        'editorial-sm': '-0.015em',
      },
      boxShadow: {
        'card':       '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.08), 0 2px 4px -1px rgb(0 0 0 / 0.05)',
        'brand':      '0 4px 14px 0 rgb(224 120 32 / 0.28)',
        'brand-hover':'0 6px 20px 0 rgb(224 120 32 / 0.38)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '68ch',
            color: '#292524',              // stone-800 — warm charcoal for reading
            fontSize: '1.0625rem',         // 17px — editorial sweet spot
            lineHeight: '1.78',
            a: {
              color: '#c45e14',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#a34513',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              },
            },
            h1: {
              fontFamily: 'Georgia, serif',
              letterSpacing: '-0.025em',
              lineHeight: '1.2',
              color: '#1c1917',
            },
            h2: {
              fontFamily: 'Georgia, serif',
              letterSpacing: '-0.02em',
              lineHeight: '1.25',
              color: '#1c1917',
              marginTop: '2.25em',
            },
            h3: {
              fontFamily: 'Georgia, serif',
              letterSpacing: '-0.015em',
              lineHeight: '1.3',
              color: '#1c1917',
              marginTop: '2em',
            },
            h4: {
              fontFamily: 'Georgia, serif',
              color: '#1c1917',
            },
            strong: {
              color: '#1c1917',
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: '#e07820',
              borderLeftWidth: '3px',
              backgroundColor: '#fdf6ec',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              borderRadius: '0 0.75rem 0.75rem 0',
              fontStyle: 'normal',
              color: '#292524',
              marginLeft: '0',
              marginRight: '0',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after':   { content: 'none' },
            img: {
              borderRadius: '0.75rem',
            },
            hr: {
              borderColor: '#e8e7e3',
              marginTop: '3em',
              marginBottom: '3em',
            },
            code: {
              backgroundColor: '#f4f3f0',
              padding: '0.2em 0.4em',
              borderRadius: '0.3em',
              fontSize: '0.875em',
              fontWeight: '400',
              color: '#292524',
            },
            'code::before': { content: 'none' },
            'code::after':  { content: 'none' },
            pre: {
              backgroundColor: '#1c1917',
              borderRadius: '0.75rem',
            },
          },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
