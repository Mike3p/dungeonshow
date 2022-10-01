import type { DieString } from './diestring';
import type { Modifies } from './modifies';

export type Item = GenericItem;

export interface GenericItem {
	die?: string;
	res?: Res;
	name?: string;
	tags?: string[] | string | null;
	modifies?: Modifies;
	cost?: number;
	damage?: DieString | number;
	weight?: number;
	amount?: number;
	Pouch?: any;
}

export type DieChoice = {
	die: DieString;
	res: Res;
};

export type Res = { [rolled: string]: Item | string | number | ItemChoice | ItemChoice[] };

export type ItemChoice = {
	item: Res | Item | string;
	presfix?: string;
	postfix?: string | (string | DieChoice)[];
	mod?: Modifies;
	add?: Add;
	false?: DieString;
};

export type Add = {
	tags?: string[];
	modifies?: Modifies;
};
