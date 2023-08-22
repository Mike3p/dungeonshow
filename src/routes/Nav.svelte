<script lang="ts">
	import { page } from '$app/stores';
	import { Icon } from 'flowbite-svelte-icons';

	export let position: 'side' | 'bottom' | 'top';

	const navOptions = [
		{ href: '/', name: 'Home', icon: 'home-solid' },
		{ href: '/character_generator', name: 'Character generator', icon: 'user-settings-solid' },
		{ href: '/character_editor', name: 'Character editor', icon: 'user-edit-solid' }
	];

	$: activeUrl = $page.url.pathname;
</script>

{#if position === 'side'}
	<aside class="hidden lg:flex shrink-0 flex-col p-2 gap-2">
		{#each navOptions as { href, name }}
			<a
				{href}
				class={`${
					href === activeUrl ? 'bg-primary-500 text-white' : ''
				} rounded-lg px-2 py-1 hover:bg-primary-200`}>{name}</a
			>
		{/each}
	</aside>
{:else}
	<div class={`flex justify-center gap-2 ${position === 'bottom' && 'lg:hidden'}`}>
		{#each navOptions as { href, name, icon }}
			<a
				{href}
				class={`flex flex-col p-2 items-center ${href === activeUrl ? 'bg-primary-500' : ''}`}
				data-sveltekit-preload-data>{name}<Icon name={icon} /></a
			>
		{/each}
	</div>
{/if}
