import type { Proficiency } from './ability';
import type { AbilityProgression } from './abilityprogression';
import type { Requisites } from './generator_dict';
import type { DieChoice, Item } from './item';
import type { MagicType } from './magictype';
import type { SavingThrowProgression } from './progression';

export interface CharacterClass {
	name: string;
	experienceforlevel: number[];
	hpafter9: number;
	mv: number;
	cleavesperlevel: number;
	ethnicity?: string[] | EthnicityPath;
	maxlevel: number;
	hd: string;
	primerequisites?: Requisites;
	minrequisites?: Requisites;
	attackprogression: number[];
	savingthrows: SavingThrowProgression;
	proficiencyprogression: number[];
	magictypes?: MagicType[];
	proficiencylist: Proficiency[];
	abilityprogression: AbilityProgression;
	equipment: Equipment | { path: { [key: string]: Equipment } };
	exclude_from_random?: boolean;
	casterfraction?: number;
	path?: string[];
}

export type Equipment = (DieChoice | Item | number | string)[][];

export interface EquipmentPath {
	path: {
		[key: string]: Equipment;
	};
}

export interface EthnicityPath {
	path: {
		[key: string]: string[];
	};
}
