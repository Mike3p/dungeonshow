<script lang="ts">
	import { page } from '$app/stores';
	import { Icon } from 'flowbite-svelte-icons';

	export let position: 'bottom' | 'top';

	const navOptions = [
		{ href: '/', name: 'Home', icon: 'home-solid' },
		{ href: '/character_generator', name: 'Generator', icon: 'user-settings-solid' },
		{ href: '/character_editor', name: 'Editor', icon: 'user-edit-solid' }
	];

	$: activeUrl = $page.url.pathname;
</script>

{#if position === 'bottom'}
	<div class="fixed h-16 lg:hidden bg-primary-400 bottom-0 w-full">
		<div class="grid max-w-lg mx-auto grid-cols-3 h-full">
			{#each navOptions as { href, name, icon }}
				<a
					{href}
					class={`flex flex-col p-2 items-center text-white ${
						href === activeUrl ? 'bg-primary-500' : ''
					}`}
					data-sveltekit-preload-data
				>
					<Icon name={icon} />
					<span>{name}</span>
				</a>
			{/each}
		</div>
	</div>
{:else}
	<div class="hidden lg:grid grid-cols-3 justify-center bg-primary-400">
		{#each navOptions as { href, name, icon }}
			<a
				{href}
				class={`flex flex-col p-2 items-center justify-center text-white ${
					href === activeUrl ? 'bg-primary-500' : ''
				}`}
				data-sveltekit-preload-data
			>
				<Icon name={icon} />
				<span>{name}</span>
			</a>
		{/each}
	</div>
{/if}
