<script lang="ts">
	import type { Character } from '$lib/character';
	import type { CharacterGenerator } from '$lib/character_generator';
	import CharacterComponent from './character.svelte';
	import Select from '$lib/ui/select.svelte';
	import Button from '$lib/ui/button.svelte';
	import NumberInput from '$lib/ui/number_input.svelte';

	export let generator: CharacterGenerator;

	let characterClass = generator.classes[0];
	let ethnicity = generator.ethnicities[0];
	let level = generator.levels[0];
	let number = 1;
	let characters: Character[] = [];

	function handleGenerate() {
		characters = generator.generateCharacters({
			characterClass,
			ethnicity,
			level,
			number
		});
	}
</script>

<form on:submit|preventDefault={handleGenerate}>
	<Select id="class" bind:value={characterClass} options={generator.classes} label="Class:" />
	<Select
		id="ethnicity"
		bind:value={ethnicity}
		options={generator.ethnicities}
		label="Ethnicity:"
	/>
	<Select id="level" bind:value={level} options={generator.levels} label="Level:" />
	<NumberInput id="number" bind:value={number} label="Number:" />

	<Button type="submit">Generate</Button>
</form>

{#each characters as char}
	<div class="m-2"><CharacterComponent character={char} /></div>
{/each}
