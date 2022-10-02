<script lang="ts">
	import { CharacterGenerator } from '$lib/character_generator';
	import CharacterGeneratorComponent from './character_generator.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let chosenGenerator = Object.keys(data.generatorDicts)[0];
	let generator = new CharacterGenerator(data.generatorDicts[chosenGenerator]);

	function changeGenerator(event: Event) {
		generator = new CharacterGenerator(data.generatorDicts[chosenGenerator]);
	}
</script>

<h1>Character Generator</h1>
<div class="m-2">
	<label for="generator" class="flex flex-wrap md:flex-nowrap items-baseline gap-1">
		<span>Generator</span>
		<select
			id="generator"
			class="w-full md:w-fit"
			on:change={changeGenerator}
			bind:value={chosenGenerator}
		>
			{#each Object.keys(data.generatorDicts) as name}
				<option value={name}>{name}</option>
			{/each}
		</select>
	</label>
</div>
<CharacterGeneratorComponent {generator} />
