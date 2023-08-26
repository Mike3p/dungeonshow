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

<div
	class="{position === 'bottom'
		? 'fixed lg:hidden bottom-0 w-full h-16'
		: 'hidden lg:grid h-full'}  bg-primary-400"
>
	<div class="grid max-w-lg mx-auto grid-cols-3 h-full font-medium">
		{#each navOptions as { href, name, icon }}
			<a
				{href}
				class={`flex flex-col p-2 items-center justify-center text-white hover:bg-primary-300 active:bg-primary-600 ${
					href === activeUrl ? 'bg-primary-500 hover:bg-primary-600' : ''
				}`}
				data-sveltekit-preload-data
			>
				<Icon name={icon} />
				<span>{name}</span>
			</a>
		{/each}
	</div>
</div>
