const DICE_REGEX = /(?<count>\d+)d(?<sides>\d+)(?<modifierStr>[+-]\d+)?/;

export function roll(dicecode: string): number {
	const { count, sides, modifierStr } = DICE_REGEX.exec(dicecode)!.groups!;
	const modifier = !!modifierStr ? +modifierStr : 0;
	return [...Array(+count)]
		.map(() => rollOnce(+sides))
		.reduce((sum, current) => sum + current + modifier, 0);
}

function rollOnce(sides: number) {
	return 1 + Math.floor(Math.random() * sides);
}

export function getAbilityMod(a: number) {
	if (a >= 18) return 3;
	else if (a >= 16) return 2;
	else if (a >= 13) return 1;
	else if (a >= 9) return 0;
	else if (a >= 6) return -1;
	else if (a >= 4) return -2;
	else return -3;
}
