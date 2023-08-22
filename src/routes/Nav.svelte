<script lang="ts">
	import { page } from '$app/stores';
	import { Icon } from 'flowbite-svelte-icons';

	export let position: 'bottom' | 'top';

	const navOptions = [
		{ href: '/', name: 'Home', icon: 'home-solid' },
		{ href: '/character_generator', name: 'Character generator', icon: 'user-settings-solid' },
		{ href: '/character_editor', name: 'Character editor', icon: 'user-edit-solid' }
	];

	$: activeUrl = $page.url.pathname;
</script>

{#if position === 'bottom'}
	<div class="flex justify-center gap-2 lg:hidden bg-primary-400">
		{#each navOptions as { href, name, icon }}
			<a
				{href}
				class={`flex flex-col p-2 items-center justify-center text-white ${
					href === activeUrl ? 'bg-primary-500' : ''
				}`}
				data-sveltekit-preload-data>{name}<Icon name={icon} /></a
			>
		{/each}
	</div>
{:else}
	<div class="justify-center gap-2 hidden lg:flex bg-primary-400">
		{#each navOptions as { href, name, icon }}
			<a
				{href}
				class={`flex flex-col p-2 items-center justify-center text-white ${
					href === activeUrl ? 'bg-primary-500' : ''
				}`}
				data-sveltekit-preload-data><Icon name={icon} />{name}</a
			>
		{/each}
	</div>
{/if}
