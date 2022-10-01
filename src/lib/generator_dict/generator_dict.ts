import type { Abilities, Ability, Subskills } from './ability';
import type { CharacterClass } from './character_class';
import type { Ethnicities } from './ethnicity';
import type { DieChoice, Item } from './item';
import type { Spelllists, Spellprogressions } from './magictype';
import type { Modifies } from './modifies';
import type { SavingThrowProgression } from './progression';

export interface GeneratorDict {
	ethnicity: Ethnicities;
	ethnicities_by_race?: Ethnicitiesbyrace;
	abilities: Abilities;
	classproficiencies: Classproficiencies;
	generalproficiencies: Generalproficiency[];
	attackprogressions: Attackprogressions;
	proficiencyprogression: Proficiencyprogression;
	spellprogressions: Spellprogressions;
	spelllists: Spelllists;
	equipment: Equipment;
	saves: Saves;
	classes: Classes;
	desctables: Desctables;
	tables: GeneratorTables;
}
export interface Classes {
	[key: string]: CharacterClass;
}
export interface GeneratorTables {
	armortype: DieChoice;
	swordtype: DieChoice;
	miscweptype: DieChoice;
	treasure: Treasure;
}
export interface Treasure {
	'heroic magic': HeroicMagic;
}
export interface HeroicMagic {
	common: DieChoice;
	uncommon: DieChoice;
	rare: DieChoice;
	'very rare': DieChoice;
	legendary: DieChoice;
}

export interface Desctables {
	build: Build;
	'eye color': EyeColor;
	'hair color': HairColor;
	'skin color': SkinColor;
	'hair texture': HairTexture;
	features: Features;
	styles: Styles;
}
export interface Styles {
	'gear chaotic': StyleDieChoice;
	'gear any': StyleDieChoice;
	'gear lawful': StyleDieChoice;
	'clothing chaotic': StyleDieChoice;
	'clothing any': StyleDieChoice;
	'clothing lawful': StyleDieChoice;
	'headwear any': StyleDieChoice;
	'adornments chaotic': StyleDieChoice;
	'adornments any': StyleDieChoice;
	'belongings any': StyleDieChoice;
	'belongings chaotic': StyleDieChoice;
	'belongings lawful': StyleDieChoice;
}

export type StyleDieChoice = {
	die: string;
	res: StyleRes;
};

export type StyleRes = {
	// TODO: undefined, weil besoffen?!
	[rolled: string]: (string | StyleDieChoice)[] | StyleDieChoice | string | undefined;
};

export interface Build {
	[race: string]: DieChoice;
}

export interface Features {
	negative: DieChoice;
	average: DieChoice;
	positive: DieChoice;
}

export interface HairTexture {
	[race: string]: DieChoice;
}

export interface SkinColor {
	[race: string]: DieChoice;
}

export interface HairColor {
	[race: string]: DieChoice;
}

export interface EyeColor {
	[race: string]: DieChoice;
}

export const ABILITY_SCORES = [
	'strength',
	'intelligence',
	'wisdom',
	'dexterity',
	'constitution',
	'charisma'
] as const;
export interface Requisites {
	strength?: number;
	intelligence?: number;
	wisdom?: number;
	dexterity?: number;
	constitution?: number;
	charisma?: number;
}

interface Choice {
	name: string;
	modifies: Modifies;
}

export interface Saves {
	[name: string]: SavingThrowProgression;
}

export interface Equipment {
	ammo: Item[];
	'adventuring equipment': Item[];
	armor: Item[];
	weapons: Item[];
	potions: Item[];
	staffs: Item[];
	rods: Item[];
	wands: Item[];
	rings: Item[];
	misc: Item[];
	tables: EquipmentTables;
}
export interface EquipmentTables {
	'tiny melee weapons': DieChoice;
	'small melee weapons': DieChoice;
	'medium melee weapons': DieChoice;
	'large melee weapons': DieChoice;
	crossbows: DieChoice;
	bows: DieChoice;
	'special weapons': DieChoice;
	'full caster weapons': DieChoice;
	'heavy armor': DieChoice;
	'medium armor': DieChoice;
	'light armor': DieChoice;
	'healing herbs': DieChoice;
	tools: DieChoice;
	sleeping: DieChoice;
	light: DieChoice;
}

export interface Meleethrow {
	min: (number | string)[];
}
export interface Proficiencyprogression {
	fighter: number[];
	thief: number[];
	mage: number[];
	general: number[];
}
export interface Attackprogressions {
	monster?: number[];
	fighter: number[];
	thief: number[];
	mage: number[];
}
export interface Generalproficiency {
	name: string;
	type: string;
	max: number;
	throw?: number;
	subskills?: Subskills;
}

export interface Classproficiencies {
	[name: string]: Ability;
}

export interface Ethnicitiesbyrace {
	human: string[];
	dwarven: string[];
	elven: string[];
}
