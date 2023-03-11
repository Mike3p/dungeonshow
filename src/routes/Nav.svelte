<script lang="ts">
	import { page } from '$app/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';

	const navOptions = [
		{ href: '/', name: 'Home' },
		{ href: '/character_generator', name: 'Character generator' },
		{ href: '/character_editor', name: 'Character editor' }
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
						data-sveltekit-preload-data
						on:click={() => drawerStore.close()}
					>
						{name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>
