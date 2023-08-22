<script lang="ts">
	import type { Character } from '$lib/character';
	import type { Abilities } from '$lib/generator_dict/ability';
	import type { GenericItem } from '$lib/generator_dict/item';
	import EditableProperty from '$lib/components/EditableProperty.svelte';
	import Button from './forms/Button.svelte';

	export let character: Character;

	$: ({ url, filename } = generateDownloadUrl(character));

	function generateDownloadUrl(character: Character) {
		const blob = new Blob([character.toYaml()], { type: 'text/yaml' });
		URL.revokeObjectURL(url);
		const newUrl = URL.createObjectURL(blob);
		const newFilename = `${character.name}.yaml`;

		return { url: newUrl, filename: newFilename };
	}

	function download(url: string, fileName: string) {
		const a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	function formatItems(items: { [key: string]: GenericItem }) {
		return Object.values(items)
			.map((i) => i.name)
			.join(', ');
	}

	function formatAbilities(abilities: Abilities) {
		const skills = Object.values(abilities)
			.map((a) => {
				const rank = a.ranks && a.ranks > 1 ? a.ranks : '';
				return `${a.name} ${rank}`.trim();
			})
			.join(', ');
		return skills === '' ? 'None' : skills;
	}
</script>

<div class="p-2 card flex flex-col justify-between">
	<div class="flex flex-col gap-2">
		<div>
			<EditableProperty label="Name" bind:prop={character.name} size="normal" />
			{character.ethnicity}
			{character.class_name}
			<EditableProperty label="Lvl" bind:prop={character.level} min={1} max={character.maxlevel} />
		</div>
		<div class="flex flex-wrap gap-2">
			<EditableProperty label="Str" bind:prop={character.strength} />
			<EditableProperty label="Int" bind:prop={character.intelligence} />
			<EditableProperty label="Wis" bind:prop={character.wisdom} />
			<EditableProperty label="Dex" bind:prop={character.dexterity} />
			<EditableProperty label="Con" bind:prop={character.constitution} />
			<EditableProperty label="Cha" bind:prop={character.charisma} />
			<EditableProperty label="XP" bind:prop={character.experiencepoints} />
		</div>
		<div class="flex flex-wrap gap-2">
			<EditableProperty label="MV" bind:prop={character.mv} />
			<EditableProperty label="AC" bind:prop={character.ac} />
			<EditableProperty label="HP" bind:prop={character.hd} />
			<EditableProperty label="MV" bind:prop={character.hp} />
			<EditableProperty label="SP" bind:prop={character.surprise} />
			<EditableProperty label="INI" bind:prop={character.initiative} />
			<EditableProperty label="PP" bind:prop={character.PP} />
			<EditableProperty label="PD" bind:prop={character.PD} />
			<EditableProperty label="BB" bind:prop={character.BB} />
			<EditableProperty label="SW" bind:prop={character.SW} />
			<EditableProperty label="S" bind:prop={character.S} />
			<EditableProperty label="AL" bind:prop={character.alignment} />
		</div>
		<div>
			<b>Attacks:</b> (<b>Melee:</b>
			{character.meleethrow}+, {character.meleedamage} dmg, <b>Missile:</b>
			{character.missilethrow}+, {character.missiledamage} dmg)
		</div>
		<div>
			<b>Weapons:</b>
			{formatItems(character.weapons)}
		</div>
		<p><b>Armor:</b> {formatItems(character.armor)}</p>
		<p><b>Class Abilities:</b> {formatAbilities(character.abilities)}</p>
		<p><b>Proficiencies:</b> {formatAbilities(character.proficiencies)}</p>
		<p>
			<b>Equipment:</b>
			{formatItems(character.gear)} ({character.encumbrance[0]} st. & {character.encumbrance[1]} it.)
		</p>
		{#if character.casterlevel !== undefined}
			Caster!
		{/if}
		{#if character.personality}
			<div>
				<EditableProperty label="Personality" bind:prop={character.personality} size="fullwidth" />
			</div>
		{/if}
		{#if character.description}
			<div>
				<EditableProperty label="Description" bind:prop={character.description} size="fullwidth" />
			</div>
		{/if}
		{#if character.features}
			<div>
				<EditableProperty label="Features" bind:prop={character.features} size="fullwidth" />
			</div>
		{/if}
		{#if character.style}
			<div>
				<EditableProperty label="Style" bind:prop={character.style} size="fullwidth" />
			</div>
		{/if}
	</div>
	<div class="flex flex-col md:flex-row flex-wrap gap-2 justify-items-stretch mt-2">
		<Button outline on:click={() => download(url, filename)}>Export character</Button>
		<slot />
	</div>
</div>
