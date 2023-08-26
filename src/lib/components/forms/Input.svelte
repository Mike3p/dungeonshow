<script lang="ts">
	import WithLabel from './WithLabel.svelte';

	export let value: string;
	export let label = '';
	export let size: 'small' | 'fullwidth' | 'normal' = 'small';

	function getWidthClass(sizeStr: string) {
		switch (sizeStr) {
			case 'small':
				return 'w-20';
			case 'fullwidth':
				return 'w-full';
			default:
				return '';
		}
	}

	const width = getWidthClass(size);
</script>

<WithLabel {label} fullWidth={size === 'fullwidth'}>
	<input
		{...$$restProps}
		type="text"
		class:rounded-lg={!label}
		class:rounded-r-lg={label}
		bind:value
		class={`focus:ring-primary-500 focus:border-primary-500 p-1 ${width} leading-none`}
		on:change
	/>
</WithLabel>
