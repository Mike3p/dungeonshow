/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@skeletonlabs/skeleton/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {}
	},
	plugins: [require('@skeletonlabs/skeleton/tailwind/theme.cjs'), require('@tailwindcss/forms')],
	darkMode: 'class'
};
