<script lang="ts">
	export let label = '';
</script>

<div class="flex w-full md:w-fit">
	{#if label}
		<div class="bg-slate-200 rounded-l-lg flex items-center px-2">{label}</div>
	{/if}
	<slot />
</div>
