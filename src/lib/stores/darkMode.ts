import { writable } from 'svelte/store';

function toggle(initState: boolean) {
	let { subscribe, update } = writable(initState);
	const toggle = () => update((s) => !s);
	return { subscribe, toggle };
}

export const createDarkModeStore = (state: boolean) => toggle(state);
export const themeContext = Symbol();
