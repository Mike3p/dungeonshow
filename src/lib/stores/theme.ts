import { BROWSER } from 'esm-env';
import { persisted } from 'svelte-local-storage-store';

type Themes = { preference: 'dark' | 'light' | 'system'; current: 'dark' | 'light' };

export const theme = persisted<Themes>('ds:theme', {
	preference: 'system',
	current: BROWSER
		? window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
		: 'dark'
});

theme.subscribe(($theme) => {
	if (!BROWSER) return;

	document.body.classList.remove('dark');
	if ($theme.current === 'dark') {
		document.body.classList.add($theme.current);
	}
});
