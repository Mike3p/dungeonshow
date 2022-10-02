<script lang="ts">
	import { CharacterGenerator } from '$lib/character_generator';
	import CharacterGeneratorComponent from './character_generator.svelte';
	import Select from '$lib/ui/select.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let chosenGenerator = Object.keys(data.generatorDicts)[0];
	let generator = new CharacterGenerator(data.generatorDicts[chosenGenerator]);

	function changeGenerator(event: Event) {
		generator = new CharacterGenerator(data.generatorDicts[chosenGenerator]);
	}
</script>

<h1 class="text-3xl">Character Generator</h1>
<Select
	id="generator"
	label="Generator:"
	on:change={changeGenerator}
	bind:value={chosenGenerator}
	options={Object.keys(data.generatorDicts)}
/>

<CharacterGeneratorComponent {generator} />
