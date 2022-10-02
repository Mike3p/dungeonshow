import type { AbilityProgression } from './abilityprogression';
import type { Modifies } from './modifies';

export type Proficiency = Ability;
export interface Ability {
	name: string;
	throw?: number;
	modifies?: Modifies;
	levelprogression?: number[];
	deactivatedby?: string[];
	type?: string;
	max?: number;
	ranks?: number;
	spell?: string;
	subskills?: Subskills;
	modifyingabilityscore?: Modifies;
	hmodifyingabilityscore?: Modifies;
}

export interface Subskills {
	Diagnose: number;
	Wounds: number;
	Poison: number;
	Disease: number;
}

export interface Abilities {
	[name: string]: Ability;
}

export interface Proficiencies {
	[name: string]: Proficiency;
}

export interface AbilityPath {
	[name: string]: AbilityProgression;
}
