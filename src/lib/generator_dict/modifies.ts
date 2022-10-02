type deactivatedByValues = string[] | undefined;
type meleethrow = { min: (number | string)[] } | number | undefined;

export interface Modifies {
	[key: string]: number | string | deactivatedByValues | meleethrow | Modifies;
	deactivatedBy?: string[];
	meleethrow?: meleethrow;
	modifies?: Modifies;
}
