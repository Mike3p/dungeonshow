<script lang="ts">
	export let label = '';
	export let fullWidth = false;
</script>

<div class={`${fullWidth ? 'flex' : 'inline-flex'}`}>
	{#if label}
		<div
			class="bg-slate-200 border-y border-l border-slate-400 rounded-l-lg inline-flex items-center px-2 shrink-0 min-w-[3rem]"
		>
			{label}
		</div>
	{/if}
	<slot />
</div>
