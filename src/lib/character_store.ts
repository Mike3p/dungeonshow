import { writable } from 'svelte/store';
import type { Character } from './character';

function createCharacterStore() {
	const { subscribe, set, update } = writable<Character | undefined>();

	return {
		subscribe,
		set,
		update,
		levelup: () =>
			update((c) => {
				if (c) {
					c.levelup(c.level, 20);
				}
				return c;
			})
	};
}
export const editedCharacter = createCharacterStore();

export const editedCharacterStartingYaml = writable<string>();

export const generatedCharacters = writable<Character[]>([]);
