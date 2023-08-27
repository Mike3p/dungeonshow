<script lang="ts">
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Nav from './Nav.svelte';
</script>

<div class="flex bg-primary-400 dark:bg-primary-800 shrink-0 items-stretch justify-between">
	<div class="flex flex-col justify-evenly p-4">
		<h1 class="text-white">The Dungeon Show</h1>
		<p class="text-sm italic text-gray-100">The Loot you seek is in another dungeon</p>
	</div>
	<div class="flex">
		<Nav position="top" />
		<ThemeSwitcher />
	</div>
</div>
