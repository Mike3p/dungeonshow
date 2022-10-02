<script>
	import '../app.css';
	import '@brainandbones/skeleton/styles/all.css';
	import '../theme.postcss';

	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import Nav from './nav.svelte';
</script>

<div class="flex flex-col h-screen">
	<Header />
	<div class="flex justify-items-stretch flex-grow">
		<aside class="flex-shrink-0">
			<Nav />
		</aside>

		<main class="p-2 flex-grow">
			<slot />
		</main>
	</div>
	<Footer />
</div>
