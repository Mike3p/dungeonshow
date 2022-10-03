<script lang="ts">
	import { Character } from '$lib/character';
	import { editedCharacter, editedCharacterStartingYaml } from '$lib/character_store';
	import CharacterComponent from '../character_generator/Character.svelte';

	function handleFile(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		let files = event?.currentTarget?.files;
		let json = files ? files[0] : null;
		if (json) {
			let reader = new FileReader();
			reader.onload = () => {
				if (typeof reader.result === 'string') {
					$editedCharacter = Character.fromYaml(reader.result);
					$editedCharacterStartingYaml = reader.result;
				}
			};
			reader.readAsText(json);
		}
	}

	function resetInput() {
		$editedCharacter = undefined;
		$editedCharacterStartingYaml = '';
	}

	function resetCharacter() {
		$editedCharacter = Character.fromYaml($editedCharacterStartingYaml);
	}

	function levelup() {
		editedCharacter.levelup();
	}
</script>

<h1>Character editor</h1>
<form class="flex gap-2 mb-2">
	<input type="file" class="max-w-fit" accept=".yaml,.yml" on:change={handleFile} />
	<button type="reset" class="btn btn-filled-warning" on:click={resetInput}>Reset</button>
</form>

{#if $editedCharacter}
	<CharacterComponent character={$editedCharacter}>
		<button class="btn btn-outline-accent" on:click={resetCharacter}>Reset character</button>
		<button class="btn btn-filled-primary" on:click={levelup}>Level up character</button>
	</CharacterComponent>
{/if}
