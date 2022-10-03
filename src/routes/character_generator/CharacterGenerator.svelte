<script lang="ts">
	import type { Character } from '$lib/character';
	import type { CharacterGenerator } from '$lib/character_generator';
	import CharacterComponent from '$lib/components/Character.svelte';
	import { editedCharacter, editedCharacterStartingYaml } from '$lib/character_store';
	import { generatedCharacters } from '$lib/character_store';

	export let generator: CharacterGenerator;

	let characterClass = generator.classes[0];
	let ethnicity = generator.ethnicities[0];
	let level = generator.levels[0];
	let number = 1;

	$: characters =
		$editedCharacter && !$generatedCharacters.includes($editedCharacter)
			? [$editedCharacter, ...$generatedCharacters]
			: $generatedCharacters;

	function handleGenerate() {
		$generatedCharacters = generator.generateCharacters({
			characterClass,
			ethnicity,
			level,
			number
		});
	}

	function startEditingCharacter(char: Character) {
		$editedCharacter = char;
		$editedCharacterStartingYaml = char.toYaml();
	}

	function reset() {
		$editedCharacter = undefined;
		$editedCharacterStartingYaml = '';
		$generatedCharacters = [];
		characterClass = generator.classes[0];
		ethnicity = generator.ethnicities[0];
		level = generator.levels[0];
		number = 1;
	}
</script>

<form on:submit|preventDefault={handleGenerate} class="flex flex-wrap gap-4 my-4">
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
		<input id="number" type="number" bind:value={number} class="w-14 md:max-w-[73px]" min="1" />
	</label>

	<button type="button" class="btn btn-filled-warning w-full md:w-fit" on:click={reset}
		>Reset</button
	>
	<button type="submit" class="btn btn-filled-primary w-full md:w-fit">Generate</button>
</form>

<div class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2">
	{#each characters as char}
		<CharacterComponent character={char}>
			<button
				class="btn btn-outline-primary"
				on:click={() => startEditingCharacter(char)}
				disabled={$editedCharacter === char}
			>
				{#if $editedCharacter === char}
					Selected for Editor
				{:else}
					Select for Editor
				{/if}
			</button>
		</CharacterComponent>
	{/each}
</div>
