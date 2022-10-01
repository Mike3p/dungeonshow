export interface MagicType {
	mode: string;
	name: string;
	progression: MagicProgression;
	list: List;
}

export type MagicProgression = { [level: string]: { [key: string]: number } };

export type List = { [key: string]: string[] };

export interface Spellprogressions {
	[className: string]: MagicProgression;
}

export interface Spelllists {
	[className: string]: List;
}
