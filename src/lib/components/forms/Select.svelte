<script lang="ts">
	import WithLabel from './WithLabel.svelte';

	export let value: string | number;
	export let label = '';
	export let items: { name: string; value: string | number }[];
</script>

<WithLabel {label}>
	<select
		{...$$restProps}
		class:rounded-lg={!label}
		class:rounded-r-lg={label}
		class="input min-w-[4rem] w-full md:w-fit"
		bind:value
	>
		{#each items as item}
			<option value={item.value}>{item.name}</option>
		{/each}
	</select>
</WithLabel>
