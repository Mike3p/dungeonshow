<script lang="ts">
	export let type: 'submit' | 'button' | 'menu' | 'reset ' = 'button';
</script>

<button
	{type}
	class="bg-neutral-500 border-2 border-neutral-500 text-white font-bold py-2 px-3 mx-2 rounded shadow-lg hover:bg-sky-400 hover:border-sky-400 focus:bg-sky-400 focus:border-sky-600 active:bg-sky-600 active:border-sky-600 outline-none"
	on:click
	><slot />
</button>
