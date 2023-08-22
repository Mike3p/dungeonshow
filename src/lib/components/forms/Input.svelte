<script lang="ts">
	import WithLabel from './WithLabel.svelte';

	export let value: string;
	export let label: string = '';
</script>

<WithLabel>
	<input
		{...$$restProps}
		type="string"
		class:rounded-lg={!label}
		class:rounded-r-lg={label}
		bind:value
		class="focus:ring-primary-500 focus:border-primary-500 p-1"
		on:change
	/>
</WithLabel>
