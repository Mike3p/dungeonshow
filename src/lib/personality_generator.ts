import { roll, getAbilityMod } from './dice';

export function createPersonality(): { choice: [string, string]; mod: number }[] {
	const personality_factors: [string, string][] = [
		['Honorable', 'Treacherous'],
		['Humble', 'Proud'],
		['Kind', 'Spiteful'],
		['Moderate', 'Gluttonous'],
		['Chaste', 'Lustful'],
		['Patient', 'Wrathful'],
		['Determined', 'Slothful'],
		['Brave', 'Cowardly'],
		['Humorous', 'Serious']
	];

	return personality_factors.map((personalities) => {
		const factor = roll('3d6');
		const mod = getAbilityMod(factor);
		return { choice: personalities, mod: mod };
	});
}

export function createPersonalityString() {
	const chosenPersonalities = createPersonality()
		.filter((p) => p.mod !== 0)
		.map((p) => {
			if (p.mod > 0) return `${p.choice[0]}: ${Math.abs(p.mod)}`;
			if (p.mod < 0) return `${p.choice[1]}: ${Math.abs(p.mod)}`;
		})
		.join(', ');

	return chosenPersonalities === '' ? 'Average' : `${chosenPersonalities};`;
}
