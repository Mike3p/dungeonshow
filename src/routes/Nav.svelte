<script lang="ts">
	import { page } from '$app/stores';
	import { Icon } from 'flowbite-svelte-icons';

	export let position: 'bottom' | 'top';
	export let hidden = false;

	const navOptions = [
		{ href: '/', name: 'Home', icon: 'home-solid' },
		{ href: '/character_generator', name: 'Generator', icon: 'user-settings-solid' },
		{ href: '/character_editor', name: 'Editor', icon: 'user-edit-solid' }
	];

	$: activeUrl = $page.url.pathname;
</script>

<div
	class="{position === 'bottom'
		? `fixed lg:hidden ${
				hidden ? '-bottom-16' : 'bottom-0'
		  } w-full h-16 transition-bottom duration-500`
		: 'hidden lg:grid h-full'}  bg-primary-400 dark:bg-primary-800"
>
	<div class="grid max-w-lg mx-auto grid-cols-3 h-full font-medium">
		{#each navOptions as { href, name, icon }}
			<a
				{href}
				class={`flex flex-col p-2 items-center justify-center text-white ${
					href === activeUrl
						? 'bg-primary-600 hover:bg-primary-600 dark:bg-primary-700 hover:dark:bg-primary-700'
						: 'hover:bg-primary-500 dark:hover:bg-primary-500'
				}`}
				data-sveltekit-preload-data
			>
				<Icon name={icon} />
				<span>{name}</span>
			</a>
		{/each}
	</div>
</div>
