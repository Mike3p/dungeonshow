<script lang="ts">
	import { characterEditableKey } from '$lib/context';
	import { getContext } from 'svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import NumberInput from './forms/NumberInput.svelte';

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
	<Input type="string" bind:value={prop} class={`${classes} inline-block`} />
{:else if typeof prop === 'number'}
	<NumberInput bind:value={prop} {min} {max} class={`${classes} w-14 inline-block`} />
{:else}
	{prop}
{/if}
