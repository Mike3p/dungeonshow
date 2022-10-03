<script lang="ts">
	import type { Character } from '$lib/character';
	import type { Abilities } from '$lib/generator_dict/ability';
	import type { GenericItem } from '$lib/generator_dict/item';
	import EditableProperty from '$lib/components/EditableProperty.svelte';

	export let character: Character;

	$: ({ url, filename } = generateDownloadUrl(character));

	function generateDownloadUrl(character: Character) {
		const blob = new Blob([character.toYaml()], { type: 'text/yaml' });
		URL.revokeObjectURL(url);
		const newUrl = URL.createObjectURL(blob);
		const newFilename = `${character.name}.yaml`;

		return { url: newUrl, filename: newFilename };
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
	<div>
		<p>
			<b>
				<EditableProperty bind:prop={character.name} class="max-w-[200px]" />
			</b>: {character.ethnicity}

			{character.class_name}
			<EditableProperty bind:prop={character.level} min={1} max={character.maxlevel} />: Str: <EditableProperty
				bind:prop={character.strength}
			/>, Int: <EditableProperty bind:prop={character.intelligence} />, Wis: <EditableProperty
				bind:prop={character.wisdom}
			/>, Dex: <EditableProperty bind:prop={character.dexterity} />, Con: <EditableProperty
				bind:prop={character.constitution}
			/>, Cha: <EditableProperty bind:prop={character.charisma} />;
			<b>XP</b>: <EditableProperty bind:prop={character.experiencepoints} class="!w-24" />
		</p>
		<p>
			<b>MV</b><EditableProperty bind:prop={character.mv} />,
			<b>AC</b>
			<EditableProperty bind:prop={character.ac} />,
			<b>HD</b>
			<EditableProperty bind:prop={character.hd} />,
			<b>HP</b>
			<EditableProperty bind:prop={character.hp} />,
			<b>SP</b>
			<EditableProperty bind:prop={character.surprise} />,
			<b>INI</b>
			<EditableProperty bind:prop={character.initiative} />,
			<b>PP</b>
			<EditableProperty bind:prop={character.PP} />,
			<b>PD</b>
			<EditableProperty bind:prop={character.PD} />,
			<b>BB</b>
			<EditableProperty bind:prop={character.BB} />,
			<b>SW</b>
			<EditableProperty bind:prop={character.SW} />,
			<b>S</b>
			<EditableProperty bind:prop={character.S} />,
			<b>AL</b>
			<EditableProperty bind:prop={character.alignment} class="max-w-[40px]" />,
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
			<p class="flex">
				<b>Personality:</b>
				<EditableProperty bind:prop={character.personality} class="flex-grow" />
			</p>
		{/if}
		{#if character.description}
			<p class="flex">
				<b>Description:</b>
				<EditableProperty bind:prop={character.description} class="flex-grow" />
			</p>
		{/if}
		{#if character.features}
			<p><b>Features:</b> <EditableProperty bind:prop={character.features} /></p>
		{/if}
		{#if character.style}
			<p><b>Style:</b> <EditableProperty bind:prop={character.style} /></p>
		{/if}
	</div>
	<div class="flex flex-col md:flex-row flex-wrap gap-2 justify-items-stretch mt-2">
		<a class="btn btn-outline-primary" href={url} download={filename}>Export character</a>
		<slot />
	</div>
</div>
