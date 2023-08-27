<script lang="ts">
	import { createDarkModeStore, themeContext } from '$lib/stores/darkMode';
	import { Icon } from 'flowbite-svelte-icons';
	import { getContext } from 'svelte';

	const darkMode: any = getContext(themeContext);

	function toggleDarkMode() {
		darkMode.toggle();
	}
</script>

<button on:click={toggleDarkMode} class="text-white mx-4 h-full">
	{#if darkMode}
		<Icon name="sun-outline" />
	{:else}
		<Icon name="moon-outline" />
	{/if}
</button>
