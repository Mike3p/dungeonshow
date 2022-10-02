<script lang="ts">
	import { page } from '$app/stores';

	const navOptions = [
		{ href: '/', name: 'Home' },
		{ href: '/character_generator', name: 'Character generator' }
	];
</script>

<nav class="bg-gray-300 h-full border-r-[1px] border-r-black flex flex-col">
	{#each navOptions as { href, name }}
		<a {href} class={`hover:underline p-2 ${href === $page.url.pathname ? 'bg-gray-400' : ''}`}
			>{name}</a
		>
	{/each}
</nav>
