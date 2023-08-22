<script lang="ts">
	import { CharacterGenerator } from '$lib/character_generator';
	import CharacterGeneratorComponent from './CharacterGenerator.svelte';
	import Select from '$lib/components/forms/Select.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let chosenGenerator = Object.keys(data.generatorDicts)[0];
	$: generator = new CharacterGenerator(data.generatorDicts[chosenGenerator]);
</script>

<h1>Character Generator</h1>
<div class="my-4">
	<Select
		id="generator"
		label="Generator"
		bind:value={chosenGenerator}
		items={Object.keys(data.generatorDicts).map((gen) => ({ name: gen, value: gen }))}
	/>
</div>
<CharacterGeneratorComponent {generator} />
