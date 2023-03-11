<script lang="ts">
	import { AppBar, drawerStore, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<div class="lg:hidden cursor-pointer">
			<button on:click={() => drawerStore.open()} tabindex="0">
				<svg viewBox="0 0 100 80" class="w-6 h-6 m-1">
					<rect width="100" height="20" rx="10" />
					<rect y="30" width="100" height="20" rx="10" />
					<rect y="60" width="100" height="20" rx="10" />
				</svg>
			</button>
		</div>
		<div class="flex flex-col justify-evenly">
			<h1>The Dungeon Show</h1>
			<p class="text-sm italic text-gray-400">The Loot you seek is in another dungeon</p>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<LightSwitch />
	</svelte:fragment>
</AppBar>
