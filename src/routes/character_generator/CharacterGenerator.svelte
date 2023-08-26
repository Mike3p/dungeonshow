<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Character } from '$lib/character';
	import type { CharacterGenerator } from '$lib/character_generator';
	import CharacterComponent from '$lib/components/Character.svelte';
	import { editedCharacter, editedCharacterStartingYaml } from '$lib/character_store';
	import { generatedCharacters } from '$lib/character_store';
	import Select from '$lib/components/forms/Select.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import { Icon } from 'flowbite-svelte-icons';

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

<form on:submit|preventDefault={handleGenerate} class="flex flex-wrap gap-2 items-center">
	<Select
		id="class"
		label="Class"
		bind:value={characterClass}
		items={generator.classes.map((cls) => ({ name: cls, value: cls }))}
	/>

	<Select
		id="class"
		label="Ethnicity"
		bind:value={ethnicity}
		items={generator.ethnicities.map((eth) => ({ value: eth, name: eth }))}
	/>

	<Select
		id="class"
		label="Level"
		bind:value={level}
		items={generator.levels.map((lvl) => ({ name: lvl.toString(), value: lvl }))}
	/>

	<NumberInput label="Number" id="number" bind:value={number} min="1" />

	<Button type="button" color="red" on:click={reset}>Reset</Button>
	<Button type="submit" color="primary">Generate</Button>
</form>

<div class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2 mt-4">
	{#each characters as char}
		<CharacterComponent character={char}>
			<Button
				color="primary"
				variant="outlined"
				on:click={() => startEditingCharacter(char)}
				disabled={$editedCharacter === char}
			>
				{#if $editedCharacter === char}
					Selected for Editor
				{:else}
					Select for Editor
				{/if}
			</Button>
			{#if $editedCharacter === char}
				<Button on:click={() => goto('/character_editor')}>
					<Icon name="user-edit-solid" />
				</Button>
			{/if}
		</CharacterComponent>
	{/each}
</div>
