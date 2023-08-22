<script lang="ts">
	import { Character } from '$lib/character';
	import { editedCharacter, editedCharacterStartingYaml } from '$lib/character_store';
	import { characterEditableKey } from '$lib/context';
	import { setContext } from 'svelte';
	import CharacterComponent from '$lib/components/Character.svelte';
	import Fileinput from '$lib/components/forms/Fileinput.svelte';
	import Button from '$lib/components/forms/Button.svelte';

	setContext(characterEditableKey, true);

	function handleFile(event: Event) {
		let files = (event?.currentTarget as unknown as { files: File[] }).files;
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
<div class="flex gap-2 items-center">
	<Fileinput accept=".yaml,.yml" on:change={handleFile} />
	<Button type="reset" color="red" on:click={resetInput}>Reset</Button>
</div>

{#if $editedCharacter}
	<CharacterComponent character={$editedCharacter}>
		<Button color="red" outline on:click={resetCharacter}>Reset character</Button>
		<Button on:click={levelup}>Level up character</Button>
	</CharacterComponent>
{/if}
