<script lang="ts">
	import WithLabel from './WithLabel.svelte';

	export let value: number;
	export let label: string = '';
	export let size: 'small' | 'fullwidth' | 'normal' = 'small';

	function getWidthClass(sizeStr: string) {
		switch (sizeStr) {
			case 'small':
				return 'w-16';
			case 'fullwidth':
				return 'w-full';
			default:
				return 'w-20';
		}
	}

	const width = getWidthClass(size);
</script>

<WithLabel {label}>
	<input
		{...$$restProps}
		type="number"
		class:rounded-lg={!label}
		class:rounded-r-lg={label}
		bind:value
		class="input {width}"
		on:change
	/></WithLabel
>
