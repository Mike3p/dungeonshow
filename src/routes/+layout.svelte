<script>
	import '../app.css';

	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Nav from './Nav.svelte';
</script>

<div class="flex flex-col h-screen w-screen overflow-auto">
	<Header />
	<div class="flex flex-1">
		<main class="p-4 flex-1">
			<slot />
		</main>
	</div>
	<Footer />
	<Nav position="bottom" />
</div>
