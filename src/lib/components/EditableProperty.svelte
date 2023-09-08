<script lang="ts">
	import { characterEditableKey } from '$lib/context';
	import { getContext } from 'svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import NumberInput from './forms/NumberInput.svelte';

	export let prop: string | number;

	export let min: number | null = null;
	export let max: number | null = null;

	export let size: 'small' | 'fullwidth' | 'normal' = 'small';
	export let label: string = '';

	const editable = getContext(characterEditableKey);
</script>

{#if !editable && label}
	<b>{label}:</b> {prop}
{:else if !editable}
	{prop}
{:else if typeof prop === 'string'}
	<Input {label} {size} bind:value={prop} />
{:else if typeof prop === 'number'}
	<NumberInput {label} bind:value={prop} {size} {min} {max} />
{:else}
	{prop}
{/if}
