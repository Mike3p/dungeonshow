<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { BROWSER } from 'esm-env';
	import { SunOutline, MoonOutline} from 'flowbite-svelte-icons';
	import { onDestroy } from 'svelte';

	function toggle() {
		const upcoming_theme = $theme.current === 'light' ? 'dark' : 'light';

		const preference =
			upcoming_theme ===
			(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
				? 'system'
				: upcoming_theme;

		theme.set({ preference: preference, current: upcoming_theme });
	}

	const cb = (e: MediaQueryListEvent) =>
		theme.set({ preference: $theme.preference, current: e.matches ? 'dark' : 'light' });

	let query: MediaQueryList;
	$: {
		if (!BROWSER) break $;

		query?.removeEventListener('change', cb);

		if ($theme.preference === 'system') {
			query = window.matchMedia('(prefers-color-scheme: dark)');
			query.addEventListener('change', cb);
		}
	}

	onDestroy(() => query?.removeEventListener('change', cb));
</script>

<button on:click={toggle} class="text-white w-8 mx-4 h-full">
	{#if BROWSER}
		{#if $theme.current === 'dark'}
            <SunOutline/>
		{:else}
            <MoonOutline/>
		{/if}
	{/if}
</button>
