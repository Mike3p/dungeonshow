/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}'
	],

	plugins: [],

	theme: {
		extend: {
			colors: {
				primary: {
					50: 'rgb(var(--color-primary-50))',
					100: 'rgb(var(--color-primary-100))',
					200: 'rgb(var(--color-primary-200))',
					300: 'rgb(var(--color-primary-300))',
					400: 'rgb(var(--color-primary-400))',
					500: 'rgb(var(--color-primary-500))',
					600: 'rgb(var(--color-primary-600))',
					700: 'rgb(var(--color-primary-700))',
					800: 'rgb(var(--color-primary-800))',
					900: 'rgb(var(--color-primary-900))',
					950: 'rgb(var(--color-primary-950))'
				}
			},
			transitionProperty: {
				bottom: 'bottom'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')],
	darkMode: 'class'
};
