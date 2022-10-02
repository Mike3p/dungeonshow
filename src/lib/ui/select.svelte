<script lang="ts">
	type T = $$Generic;

	export let id: string;
	export let value: T;
	export let options: T[] = [];
	export let label = '';
</script>

<label for={id}>{label}</label>
<select
	{id}
	bind:value
	class="border-2 bg-gray-200 rounded py-1 px-2 hover:border-sky-400 outline-none focus:border-sky-600 active:border-sky-600"
	on:change
	on:select
>
	{#each options as option}
		<option>{option}</option>
	{/each}
</select>
