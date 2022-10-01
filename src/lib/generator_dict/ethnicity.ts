export interface Ethnicities {
	[name: string]: Ethnicity;
}

export interface Ethnicity {
	'male names': string[];
	'female names': string[];
	surnames?: string[];
}
