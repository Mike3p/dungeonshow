<script lang="ts">
	import type { Character } from '$lib/character';
	import type { Abilities, Ability } from '$lib/generator_dict/ability';
	import type { GenericItem } from '$lib/generator_dict/item';

	export let character: Character;

	const blob = new Blob([character.toYaml()], { type: 'text/yaml' });
	const url = URL.createObjectURL(blob);
	const filename = `${character.name}.yaml`;

	function formatItems(items: { [key: string]: GenericItem }) {
		return Object.values(items)
			.map((i) => i.name)
			.join(', ');
	}

	function formatAbilities(abilities: Abilities) {
		const skills = Object.values(abilities)
			.map((a) => {
				const rank = a.ranks && a.ranks > 1 ? a.ranks : '';
				return `${a.name} ${rank}`;
			})
			.join(', ');
		return skills === '' ? 'None' : skills;
	}
</script>

<div class="p-2">
	<p>
		<b>{character.name}</b>: {character.ethnicity}
		{character.className}
		{character.level}: Str: {character.strength}, Int: {character.intelligence}, Wis: {character.wisdom},
		Dex: {character.dexterity}, Con: {character.constitution}, Cha: {character.charisma};
		<b>XP</b>: {character.experiencepoints}
	</p>
	<p>
		<b>MV</b>
		{character.mv},
		<b>AC</b>
		{character.ac},
		<b>HD</b>
		{character.hd},
		<b>HP</b>
		{character.hp},
		<b>SP</b>
		{character.surprise},
		<b>INI</b>
		{character.initiative},
		<b>PP</b>
		{character.PP},
		<b>PD</b>
		{character.PD},
		<b>BB</b>
		{character.BB},
		<b>SW</b>
		{character.SW},
		<b>S</b>
		{character.S},
		<b>AL</b>
		{character.alignment},
	</p>
	<p>
		<b>Attacks:</b> (<b>Melee:</b>
		{character.meleethrow}+, {character.meleedamage} dmg, <b>Missile:</b>
		{character.missilethrow}+, {character.missiledamage} dmg)
	</p>
	<p>
		<b>Weapons:</b>
		{formatItems(character.weapons)}
	</p>
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
		<p><b>Personality:</b> {character.personality}</p>
	{/if}
	{#if character.description}
		<p><b>Description:</b> {character.description}</p>
	{/if}
	{#if character.features}
		<p><b>Features:</b> {character.features}</p>
	{/if}
	{#if character.style}
		<p><b>Style:</b> {character.style}</p>
	{/if}
	<p>
		<a href={url} download={filename}>export character</a>
	</p>
</div>
