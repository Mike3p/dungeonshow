<script>
	import '../app.css';

	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Nav from './Nav.svelte';
</script>

<div class="flex flex-col items-center h-screen w-screen overflow-auto bg-slate-300">
	<div class="flex flex-col w-full flex-1 max-w-7xl bg-white">
		<Header />
		<div class="flex flex-1">
			<main class="p-4 flex-1">
				<slot />
			</main>
		</div>
		<Footer />
		<Nav position="bottom" />
	</div>
</div>
