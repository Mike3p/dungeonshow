<script lang="ts">
	export let outline: boolean = false;
	export let color: 'primary' | 'red' = 'primary';

	const filledPrimary =
		'text-white bg-primary-700 enabled:hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:enabled:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800';
	const outlinePrimary =
		'text-primary-700 enabled:hover:text-white border border-primary-700 enabled:hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-primary-500 dark:text-primary-500 dark:enabled:hover:text-white dark:enabled:hover:bg-primary-500 dark:focus:ring-primary-800';
	const filledRed =
		'text-white bg-red-700 enabled:hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:enabled:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800';
	const outlineRed =
		'text-red-700 enabled:hover:text-white border border-red-700 enabled:hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:enabled:hover:text-white dark:enabled:hover:bg-red-500 dark:focus:ring-red-800';

	function getClasses(outline: boolean, color: 'primary' | 'red') {
		if (outline) {
			switch (color) {
				case 'red':
					return outlineRed;
				default:
					return outlinePrimary;
			}
		}
		switch (color) {
			case 'red':
				return filledRed;
			default:
				return filledPrimary;
		}
	}

	const variantClasses = getClasses(outline, color);
</script>

<button
	{...$$restProps}
	on:click
	class={`${variantClasses} disabled:opacity-60 disabled:cursor-not-allowed`}><slot /></button
>
