<script lang="ts">
	import type { Character } from '$lib/character';
	import type { CharacterGenerator } from '$lib/character_generator';
	import CharacterComponent from './character.svelte';

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

<form on:submit|preventDefault={handleGenerate} class="flex flex-wrap justify-between gap-2 m-2">
	<label for="class" class="flex items-baseline w-full md:w-fit gap-1 flex-wrap md:flex-nowrap">
		<span>Class</span>
		<select id="class" bind:value={characterClass}>
			{#each generator.classes as clazz}
				<option value={clazz}>{clazz}</option>
			{/each}
		</select>
	</label>

	<label for="ethnicity" class="flex items-baseline w-full md:w-fit gap-1 flex-wrap md:flex-nowrap">
		<span>Ethnicity</span>
		<select id="class" bind:value={ethnicity}>
			{#each generator.ethnicities as ethnicity}
				<option value={ethnicity}>{ethnicity}</option>
			{/each}
		</select>
	</label>

	<label for="level" class="flex items-baseline w-full md:w-fit gap-1 flex-wrap md:flex-nowrap">
		<span>Level</span>
		<select id="class" bind:value={level}>
			{#each generator.levels as lvl}
				<option value={lvl}>{lvl}</option>
			{/each}
		</select>
	</label>

	<label for="number" class="flex items-baseline w-full md:w-fit gap-1 flex-wrap md:flex-nowrap">
		<span>Number</span>
		<input id="number" type="number" bind:value={number} class="w-14 md:max-w-[73px]" />
	</label>

	<button type="submit" class="btn btn-filled-primary">Generate</button>
</form>

{#each characters as char}
	<CharacterComponent character={char} />
{/each}
