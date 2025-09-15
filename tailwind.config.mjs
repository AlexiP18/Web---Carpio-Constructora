/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
  	extend: {
  		fontFamily: {
  			urbanist: [
  				'Urbanist',
  				'sans-serif'
  			],
  			heebo: [
  				'Heebo',
  				'sans-serif'
  			]
  		},
  		colors: {
  			neutral: {
  				darkest: '#0c0801',
  				lightest: '#f2f2f2',
  				lighter: '#dad9d8',
  				light: '#e5e5e5'
  			},
  			'forest-green': '#2d862d',
  			'dodger-blue-lighter': '#d7e6fd',
  			beige: '#dad9d8',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			'heading-1': [
  				'84px',
  				{
  					lineHeight: '1.1',
  					letterSpacing: '0.84px'
  				}
  			],
  			'heading-2': [
  				'60px',
  				{
  					lineHeight: '1.2',
  					letterSpacing: '0.6px'
  				}
  			],
  			'heading-3': [
  				'48px',
  				{
  					lineHeight: '1.2',
  					letterSpacing: '0.48px'
  				}
  			],
  			'heading-4': [
  				'40px',
  				{
  					lineHeight: '1.2',
  					letterSpacing: '0.4px'
  				}
  			],
  			'heading-5': [
  				'32px',
  				{
  					lineHeight: '1.2',
  					letterSpacing: '0.32px'
  				}
  			],
  			'heading-6': [
  				'26px',
  				{
  					lineHeight: '1.2',
  					letterSpacing: '0.26px'
  				}
  			],
  			'text-medium': [
  				'20px',
  				{
  					lineHeight: '1.6'
  				}
  			],
  			'text-regular': [
  				'18px',
  				{
  					lineHeight: '1.6'
  				}
  			],
  			'text-small': [
  				'16px',
  				{
  					lineHeight: '1.6'
  				}
  			]
  		},
  		maxWidth: {
  			'container-large': '1280px',
  			large: '768px',
  			small: '480px',
  			xsmall: '400px'
  		},
  		borderRadius: {
  			medium: '32px',
  			large: '40px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		padding: {
  			'section-large': '112px',
  			'section-medium': '80px',
  			global: '64px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
