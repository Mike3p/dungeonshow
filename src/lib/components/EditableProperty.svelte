<script lang="ts">
	import { characterEditableKey } from '$lib/context';
	import { getContext } from 'svelte';

	export let prop: string | number;

	export let min: number | null = null;
	export let max: number | null = null;

	let classes = '';
	export { classes as class };

	const editable = getContext(characterEditableKey);
</script>

{#if !editable}
	{prop}
{:else if typeof prop === 'string'}
	<input type="text" bind:value={prop} class={classes} />
{:else if typeof prop === 'number'}
	<input type="number" bind:value={prop} {min} {max} class={classes} />
{:else}
	{prop}
{/if}

<style>
	input {
		@apply py-0 px-1;
	}

	input[type='number'] {
		@apply w-14;
	}
</style>
