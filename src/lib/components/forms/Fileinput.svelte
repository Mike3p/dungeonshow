<script lang="ts">
	export let label: string;
</script>

<label
	class="disabled:opacity-60 disabled:cursor-not-allowed text-white bg-primary-700 enabled:hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:enabled:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
>
	<input type="file" on:change {...$$restProps} class="hidden" />
	{label}
</label>
