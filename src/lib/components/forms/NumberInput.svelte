<script lang="ts">
	import WithLabel from './WithLabel.svelte';

	export let value: number;
	export let label: string = '';
</script>

<WithLabel {label}>
	<input
		{...$$restProps}
		type="number"
		class:rounded-lg={!label}
		class:rounded-r-lg={label}
		bind:value
		class="focus:ring-primary-500 focus:border-primary-500 p-1 w-full md:w-10"
		on:change
	/></WithLabel
>
