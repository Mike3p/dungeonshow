import { Character } from './character';
import type { GeneratorDict, Requisites } from '$lib/generator_dict/interfaces';
import { roll } from './dice';

export class CharacterGenerator {
	public classes: string[];
	public ethnicities: string[];
	public levels: number[];
	public createParty = false;

	constructor(private generatorDict: GeneratorDict) {
		this.ethnicities = ['random', ...Object.keys(generatorDict.ethnicity)];
		this.classes = ['random', ...Object.keys(generatorDict.classes)];
		this.levels = [...Array(14).keys()].map((i) => i + 1);
	}

	public generateCharacters({
		characterClass,
		ethnicity,
		level,
		number
	}: {
		characterClass: string;
		ethnicity: string;
		level: number;
		number: number;
	}): Character[] {
		return Array(number)
			.fill(null)
			.map(() => {
				const chosenClass = characterClass === 'random' ? this.getRandomClass() : characterClass;
				const chosenEthnicity = ethnicity === 'random' ? this.getRandomEthnicity() : ethnicity;
				const chosenClassDict = this.generatorDict.classes[chosenClass];
				const scores = this.rollRandomStats();
				const alignment = this.getRandomElement(['C', 'L', 'L', 'N', 'N', 'N']);

				const female = Math.random() > 0.5;
				const name = female
					? this.getRandomElement(this.generatorDict.ethnicity[chosenEthnicity]['female names'])
					: this.getRandomElement(this.generatorDict.ethnicity[chosenEthnicity]['male names']);

				return new Character(
					chosenClassDict,
					this.generatorDict.generalproficiencies,
					chosenClassDict.proficiencyprogression,
					this.generatorDict.desctables,
					chosenEthnicity,
					name,
					chosenClass,
					level,
					alignment,
					female ? 'female' : 'male',
					scores,
					{}
				);
			});
	}

	private rollRandomStats(): Requisites {
		return {
			strength: roll('3d6'),
			dexterity: roll('3d6'),
			charisma: roll('3d6'),
			constitution: roll('3d6'),
			intelligence: roll('3d6'),
			wisdom: roll('3d6')
		};
	}

	private getRandomClass(): string {
		return this.getRandomElement(this.classes);
	}

	private getRandomEthnicity(): string {
		return this.getRandomElement(this.ethnicities);
	}

	private getRandomElement(array: string[]): string {
		const arrayWithoutRandom = array.filter((cls) => cls !== 'random');
		return arrayWithoutRandom[Math.floor(Math.random() * arrayWithoutRandom.length)];
	}
}
