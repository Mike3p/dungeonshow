<script lang="ts">
	import { page } from '$app/stores';
	import { menuStore } from '$lib/stores';

	const navOptions = [
		{ href: '/', name: 'Home' },
		{ href: '/character_generator', name: 'Character generator' }
	];
</script>

<aside class="h-full bg-black/5">
	<nav class="p-4 list-nav h-full">
		<ul>
			{#each navOptions as { href, name }}
				<li>
					<a
						{href}
						class={href === $page.url.pathname ? '!bg-primary-500' : ''}
						on:click={() => menuStore.set(false)}>{name}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</aside>
