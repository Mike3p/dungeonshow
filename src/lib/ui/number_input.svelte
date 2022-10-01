<script lang="ts">
	export let id: string;
	export let value: number;
	export let label = '';
</script>

<label for={id}>{label}</label>
<input
	{id}
	type="number"
	bind:value
	class="w-16 border-2 bg-gray-200 rounded py-1 px-2 hover:border-sky-400 outline-none focus:border-sky-600 active:border-sky-600
"
	min="1"
/>
