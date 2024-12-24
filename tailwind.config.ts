import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			animation: {
				'bounce-in': 'bounceDown 800ms linear'
			},
			colors: {
				primary: '#FFC627',
				secondary: '#61BD4F',
				tertiary: '#0084D0',
				herobg: '#F6A31A'
			},
			fontFamily: {
				londrinaSolid: ['Londrina Solid', 'system-ui'],
				sans: ['Poppins', 'sans-serif']
			},
			keyframes: {
				bounceDown: {
					'0%': {
						transform: 'translateY(-110vh)'
					},
					'60%': {
						transform: 'translateY(60px)'
					},
					'80%': {
						transform: 'translateY(-20px)'
					},
					'100%': {
						transform: 'translateY(0)'
					}
				}
			}
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
