import { getRandomArraySubset, getRandomFromArray } from './array';
import yaml from 'js-yaml';
import { roll, getAbilityMod } from './dice';
import type { Abilities, Ability, Proficiencies, Proficiency } from './generator_dict/ability';
import type { AbilityChoice, AbilityProgression } from './generator_dict/abilityprogression';
import type { CharacterClass, Equipment } from './generator_dict/character_class';
import { ABILITY_SCORES, type Desctables, type Requisites } from './generator_dict/generator_dict';
import type { DieChoice, GenericItem, Item } from './generator_dict/item';
import type { MagicType } from './generator_dict/magictype';
import type { SimpleProgression } from './generator_dict/progression';
import { createPersonalityString } from './personality_generator';

type Dict<T> = { [key: string]: T };

type SpellProgressions = {
	[spellName: string]: {
		mode: string;
		progression: SpellProgression;
	};
};

type SpellProgression = { [key: number]: { [key: number]: number } };
type Spells = { [spellName: string]: { [key: number]: string[] } };

export class Character {
	// scores
	public strength: number;
	public dexterity: number;
	public constitution: number;
	public intelligence: number;
	public wisdom: number;
	public charisma: number;

	public strmod: number;
	public dexmod: number;
	public conmod = 0;
	public intmod: number;
	public wismod: number;
	public chamod: number;

	// base attributes
	public ethnicity: string;
	public name: string;
	public gender: string;
	public cclass: string;
	public class_name: string;
	public experiencepoints: number;
	public level: number;
	public maxlevel: number;
	public hdtype: string;
	public mv: number;
	public mod_mv: number;
	public basehp: number;
	public hp: number;
	public alignment: string;

	// miscellaneous
	public numberofattacks: number;
	public encumbrance: [number, number];
	public lightencumbrance: number;
	public mediumencumbrance: number;
	public heavyencumbrance: number;
	public proficiencies: Proficiencies;
	public abilities: Abilities;
	public cleavesperlevel: number;
	public hpafter9: number;

	// inventory
	public weapons: Dict<Item>;
	public armor: Dict<Item>;
	public gear: Dict<Item>;
	public magical_items: Dict<string>;
	public magical_item_rolls: Dict<number>;

	// progression
	public experienceforlevel: SimpleProgression;
	public classproficiencylist: Proficiency[];
	public generalproficiencylist: Proficiency[];
	public attackprogression: SimpleProgression;
	public savingthrowprogression: SimpleProgression;
	public initialsaves: SimpleProgression;
	public genprofprogression: SimpleProgression;
	public classprofprogression: SimpleProgression;
	public primerequisites: Requisites;
	public minrequisites: Requisites;
	public abilityprogression: AbilityProgression;

	// spellcasting
	public casterlevel?: number;
	public ceremonythrow?: number;
	public magictypes?: MagicType[];
	public casterfraction?: number;
	public spells?: Spells;
	public spellprogressions?: SpellProgressions;

	// descriptive
	public description = '';
	public style = '';
	public features = '';
	public personality = '';

	private pathName: string;

	// ?
	public ac: number;
	public acm: number;
	public hd: number;
	public meleethrow: number;
	public missilethrow: number;
	public meleedamage: number;
	public missiledamage: number;
	public surprise: number;
	public initiative: number;
	public numberofcleaves: number;
	public henchmen: number;
	public mod_mv: number;
	public PP: number;
	public PD: number;
	public BB: number;
	public SW: number;
	public S: number;
	strategicability: number;
	moralemodifier: number;
	unitmorale: number;
	leadershipability: number;
	zoneofcontrol: number;

	private constructor() {}

	public static fromYaml(yamlString: string) {
		const char = new Character();
		const yml = yaml.load(yamlString);
		Object.assign(char, yml);
		return char;
	}

	public static fromGenerator(
		classDict: CharacterClass,
		generalProfs: Ability[],
		generalProfsProgression: SimpleProgression,
		styleTables: Desctables,
		ethnicity: string,
		name: string,
		characterClass: string,
		level: number,
		alignment: string,
		gender: string,
		scores: Requisites,
		magicalItemRolls: Dict<number>,
		path = '',
		probToDoubleDip = 20
	): Character {
		const char = new Character();
		// ability scores
		char.strength = scores.strength || 10;
		char.dexterity = scores.dexterity || 10;
		char.constitution = scores.constitution || 10;
		char.intelligence = scores.intelligence || 10;
		char.wisdom = scores.wisdom || 10;
		char.charisma = scores.charisma || 10;

		char.pathName = path;

		// base attributes
		char.ethnicity = ethnicity;
		char.name = name;
		char.gender = gender;
		char.cclass = characterClass;
		char.class_name = classDict.name ?? characterClass;
		char.experiencepoints = 0;
		char.level = 0;
		char.maxlevel = classDict.maxlevel;
		char.hdtype = classDict.hd;
		char.mv = classDict.mv;
		char.mod_mv = char.mv;
		char.basehp = 0;
		char.alignment = alignment;

		// miscellaneous
		char.numberofattacks = 1;
		char.encumbrance = [0, 0];
		char.lightencumbrance = 6;
		char.mediumencumbrance = 8;
		char.heavyencumbrance = 11;
		char.proficiencies = {};
		char.abilities = {};
		char.cleavesperlevel = classDict['cleavesperlevel'];
		char.hpafter9 = classDict['hpafter9'];

		// inventory
		char.weapons = {};
		char.armor = {};
		char.gear = {};
		char.magical_items = {};
		char.magical_item_rolls = magicalItemRolls;

		// progression
		char.experienceforlevel = classDict.experienceforlevel;
		char.classproficiencylist = classDict.proficiencylist;
		char.generalproficiencylist = generalProfs;
		char.attackprogression = classDict.attackprogression;
		char.savingthrowprogression = classDict.savingthrows.progression;
		char.initialsaves = classDict.savingthrows.initial;
		char.genprofprogression = generalProfsProgression;
		char.classprofprogression = classDict.proficiencyprogression;
		char.primerequisites = classDict.primerequisites ?? {};
		char.minrequisites = classDict.minrequisites ?? {};
		char.abilityprogression = classDict.abilityprogression;

		char.initializeScores();

		// spellcasting
		if (classDict.magictypes) {
			char.casterlevel = 0;
			char.ceremonythrow = 11;
			char.magictypes = classDict.magictypes;
			char.casterfraction = classDict.casterfraction ?? 1;
			char.spells = {};
			for (const magicType of classDict.magictypes) {
				char.spells[magicType.name] = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
			}
			char.spellprogressions = {};
			for (const mt of classDict.magictypes) {
				char.spellprogressions[mt.name] = { progression: mt.progression, mode: mt.mode };
			}
		}

		// todo not sure if there is a better solution. i need compute statistics in case of changing attributes, levels, proficiencies, etc.
		if (char.intelligence >= 13)
			char.chooseProficiency(char.generalproficiencylist, 'random', probToDoubleDip);
		if (char.intelligence >= 16)
			char.chooseProficiency(char.generalproficiencylist, 'random', probToDoubleDip);
		if (char.intelligence >= 18)
			char.chooseProficiency(char.generalproficiencylist, 'random', probToDoubleDip);

		// this is for normalmen
		char.getAbilitiesForCurrentLevel(probToDoubleDip);
		// char.getEquipment(classDict.equipment);
		// char.getMagicalItems(level)

		char.computeStatistics();
		char.hp = 0;
		if (char.maxlevel === 0) {
			char.basehp = char.basehp + Math.max(1, roll(`1${char.hdtype}`) + char.conmod);
			char.hp = char.basehp;
		}
		char.levelup(level, probToDoubleDip);

		char.addLooks(styleTables);
		char.personality = createPersonalityString();
		return char;
	}

	public levelup(to: number, probToDoubleDip: number) {
		for (let level = this.level; level <= to; level++) {
			if (this.level >= this.maxlevel) return;

			this.level += 1;
			if (this.casterlevel !== undefined && this.casterfraction !== undefined)
				this.casterlevel = Math.floor(this.level / this.casterfraction);
			if (this.level < 9) {
				this.basehp = this.basehp + Math.max(1, roll(`1${this.hdtype}`) + this.conmod);
			} else {
				this.basehp = this.basehp + this.hpafter9;
			}
			this.experiencepoints = this.experienceforlevel[this.level - 1];

			// außerdem muss ich hier die abilities und so zuteilen.
			this.getAbilitiesForCurrentLevel(probToDoubleDip);

			// und zauber nicht vergessen
			this.getSpellsForCurrentLevel();
		}

		this.computeStatistics();
	}

	private initializeScores() {
		for (const requisites of [this.minrequisites, this.primerequisites]) {
			for (const att in requisites) {
				const attribute = ABILITY_SCORES.find((a) => a === att);
				if (attribute) {
					while (this[attribute] < (requisites[attribute] || 0)) {
						this[attribute] = roll('3d6');
					}
				}
			}
		}
	}

	private getAbilitiesForCurrentLevel(probToDoubleDip: number) {
		for (const entry of Object.values(this.abilityprogression[this.level] || {})) {
			if (typeof entry !== 'string') {
				// TODO: könnten entries hier nicht auch einfach nur abilities sein?
				if (entry.choice !== undefined) {
					const choice = entry as AbilityChoice;
					getRandomArraySubset(choice.choice, choice.number).forEach((a) => this.addAbility(a));
				} else {
					this.addAbility(entry);
				}
			} else {
				this.addAbility(entry);
			}
		}

		// TODO: wie kann es hier mehrere geben?
		this.genprofprogression
			.filter((prog) => prog === this.level)
			.forEach(() => {
				this.chooseProficiency(this.generalproficiencylist, 'random', probToDoubleDip);
			});

		this.classprofprogression
			.filter((prog) => prog === this.level)
			.forEach(() => {
				this.chooseProficiency(this.classproficiencylist, 'random', probToDoubleDip);
			});
	}

	private addAbility(ability: string | Ability) {
		if (typeof ability === 'string') {
			this.abilities[ability] = { name: ability };
		} else if (ability['type'] === 'genprof' || ability['type'] === 'classprof') {
			this.giveProficiencyToCharacter(ability);
			// TODO: spells
			// } else if (false) {
			// 	spell
		} else {
			this.abilities[ability.name] = ability;
		}
	}

	private chooseProficiency(
		chosenFrom: Proficiency[],
		proficiencyToChoose: string,
		probToDoubleDip: number
	): void {
		let proficiency;
		if (proficiencyToChoose === 'random') {
			if (roll('1d100') <= probToDoubleDip) {
				const profsCharCanDoubleDip = [];
				for (const key in this.proficiencies) {
					const proficiency = this.proficiencies[key];
					const profInCorrectList = chosenFrom.some((item) => item.name === proficiency.name);

					if ((proficiency.ranks ?? 0 < proficiency.max) && profInCorrectList) {
						profsCharCanDoubleDip.push(proficiency);
					}
				}

				if (profsCharCanDoubleDip.length) {
					const profToDoubleDip = getRandomFromArray(profsCharCanDoubleDip);
					console.log(`character has double dipped ${profToDoubleDip.name}`);
					this.giveProficiencyToCharacter(profToDoubleDip);
					return;
					// TODO: double dip => trotzdem nur eine gegeben?
				}
			}
			proficiency = getRandomFromArray(chosenFrom);
		} else {
			proficiency = chosenFrom.find((prof) => prof.name === proficiencyToChoose);

			if (!proficiency) {
				throw new Error(
					`a proficiency of this name does not exist in the specified list: ${proficiencyToChoose}`
				);
			}

			this.giveProficiencyToCharacter(proficiency);
		}
	}

	private giveProficiencyToCharacter(proficiency: Proficiency) {
		if (!Object.keys(this.proficiencies).includes(proficiency.name)) {
			this.proficiencies[proficiency.name] = proficiency;
			this.proficiencies[proficiency.name].ranks = 1;
		} else {
			this.proficiencies[proficiency.name].ranks++;
		}

		if (this.proficiencies[proficiency.name].ranks >= this.proficiencies[proficiency.name].max) {
			this.generalproficiencylist = this.generalproficiencylist.filter(
				(prof) => prof.name !== proficiency.name
			);
			this.classproficiencylist = this.classproficiencylist.filter(
				(prof) => prof.name !== proficiency.name
			);
		}
	}

	private getSpellsForCurrentLevel() {}

	private getEquipment(equipment: Equipment) {
		const assignToCharacter = (item: Item) => {
			const tags = item.tags || [];
			if (tags.includes('weapon')) this.weapons[item.name] = item;
			else if (tags.includes('armor') || tags.includes('shield')) this.armor[item.name] = item;
			else this.gear[item.name] = item;
		};

		for (const entry of equipment) {
			console.log(entry);
			const amount = typeof entry[1] === 'string' ? roll(entry[1]) : entry[1];
			for (let i = 0; i < amount; i++) {
				const item = rollOnTable(entry[0]);
				if (item) {
					item.amount ||= 0;
					item.amount++;
					assignToCharacter(item);
				}
			}
		}
	}

	private addLooks(styleTables: Desctables) {
		const build = rollOnTable_string(
			styleTables.build[this.ethnicity] || {},
			this.strmod
		).toLowerCase();
		const skinColor = rollOnTable_string(
			styleTables['skin color'][this.ethnicity] || {}
		).toLowerCase();
		const eyeColor = rollOnTable_string(
			styleTables['eye color'][this.ethnicity] || {}
		).toLowerCase();
		const hairColor = rollOnTable_string(
			styleTables['hair color'][this.ethnicity] || {}
		).toLowerCase();
		const hairType = rollOnTable_string(
			styleTables['hair texture'][this.ethnicity] || {}
		).toLowerCase();

		this.description = `${build} ${this.gender} ${capitalize(
			this.ethnicity
		)} of ${skinColor} complexion with ${eyeColor} eyes and ${hairColor} hair of ${hairType} texture.`;
	}

	private computeStatistics() {
		this.strmod = getAbilityMod(this.strength);
		this.dexmod = getAbilityMod(this.dexterity);
		this.conmod = getAbilityMod(this.constitution);
		this.intmod = getAbilityMod(this.intelligence);
		this.wismod = getAbilityMod(this.wisdom);
		this.chamod = getAbilityMod(this.charisma);

		this.ac = this.dexmod;
		this.acm = this.dexmod;
		this.hd = Math.min(this.level, 9);
		// todo: this should add con mod per level on recompute to account for changing ability mods.
		this.hp = this.basehp;

		// Angriffe und Kampfstats
		this.meleethrow =
			11 - this.attackprogression.filter((p) => p <= this.level).length - this.strmod;
		this.missilethrow =
			11 - this.attackprogression.filter((p) => p <= this.level).length - this.dexmod;
		this.meleedamage = this.strmod;
		this.missiledamage = 0;
		this.surprise = 3;
		this.initiative = this.dexmod;
		this.numberofcleaves = Math.floor(this.cleavesperlevel * this.level);
		this.henchmen = 4 + this.chamod;
		if (this.ceremonythrow !== undefined && this.casterlevel !== undefined)
			this.ceremonythrow = 11 - this.casterlevel - this.wismod;

		// calculate encumbrance and movement
		const weight = [this.weapons, this.armor, this.gear]
			.map((items) => this.getEncumbrance(Object.values(items)))
			.reduce((sum, n) => (sum += n), 0);
		// encumbrance[0] is the stones, [1] is the #items of the next stone
		this.encumbrance = [Math.floor(weight / 6), weight % 6];

		let movement = 120;
		if (this.encumbrance[0] >= 11) {
			movement = 30;
		} else if (this.encumbrance[0] >= 8) {
			movement = 60;
		} else if (this.encumbrance[0] >= 6) {
			movement = 90;
		}

		this.mod_mv = Math.min(movement, this.mv);

		// saving throws
		const throwmod =
			this.savingthrowprogression.filter((p) => p <= this.level).length + this.wismod;
		this.PP = this.initialsaves[0] - throwmod;
		this.PD = this.initialsaves[1] - throwmod;
		this.BB = this.initialsaves[2] - throwmod;
		this.SW = this.initialsaves[3] - throwmod;
		this.S = this.initialsaves[4] - throwmod;

		// masscombat
		this.strategicability =
			Math.max(this.intmod, this.wismod) +
			(Math.min(this.intmod, this.wismod) < 0 ? Math.min(this.intmod, this.wismod) : 0);

		this.moralemodifier = this.chamod;
		this.unitmorale = this.chamod;

		// include gained abilities and so on
		this.processAbilities(this.proficiencies);
		this.processAbilities(this.abilities);

		// equipment
		this.processEquipment(this.weapons);
		this.processEquipment(this.armor);
		this.processEquipment(this.gear);

		this.leadershipability = this.henchmen;
		this.zoneofcontrol = Math.ceil(this.leadershipability / 2);
	}

	private processAbilities(proficiencies: Dict<Ability | Proficiency>) {}

	private processEquipment(weapons: Dict<Item>) {}

	private getEncumbrance(items: Item[]): number {
		return items.map((item) => item.weight * item.amount).reduce((sum, n) => (sum += n), 0);
	}

	toJson(): string {
		return JSON.stringify(this);
	}

	toYaml(): string {
		return yaml.dump(this);
	}
}

function findResult(table: DieChoice, dieRoll: number) {
	return Object.entries(table.res).find(([key, value]) => {
		if (key.includes('-')) {
			const [min, max] = key.split('-');
			return between(dieRoll, +min, +max);
		} else {
			return key === dieRoll.toString();
		}
	})?.[1];
}

function between(val: number, min: number, max: number) {
	return val >= min && val <= max;
}

function capitalize(str: string) {
	const lower = str.toLowerCase();
	return str.charAt(0).toUpperCase() + lower.slice(1);
}

function rollOnTable(table: string | number | DieChoice | GenericItem, mod = 0, die = '') {
	let result = [];

	if (typeof table === 'number') return table;
	if (typeof table === 'string') return table;
	if (Array.isArray(table)) return table.map((t) => rollOnTable(t));

	const dieRoll = die !== '' ? roll(die) + mod : roll(table.die) + mod;
	return findResult(table, dieRoll);
}

function rollOnTable_string(table: DieChoice, mod = 0, die: string = ''): string {
	// TODO: manchmal ist die table leer :)
	if (Object.keys(table).length === 0) return '';

	const dieRoll = die !== '' ? roll(die) + mod : roll(table.die) + mod;
	const result = findResult(table, dieRoll);
	const resultArray = Array.isArray(result) ? result : [result];
	return resultArray
		.map((r) => {
			if (Array.isArray(r)) {
				return r.join('');
			} else {
				return r;
			}
		})
		.join('');
}
