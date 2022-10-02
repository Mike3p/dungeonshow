import type { Ability, AbilityPath } from './ability';

type PathType = AbilityPath | undefined;

export interface AbilityProgression {
	[level: string]: (Ability | string | AbilityChoice)[] | PathType;
	path?: AbilityPath;
}

export type AbilityChoice = {
	choice: (Ability | string)[][] | (Ability | string)[];
	number: number;
};
