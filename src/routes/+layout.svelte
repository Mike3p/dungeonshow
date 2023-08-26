<script>
	import '../app.css';

	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Nav from './Nav.svelte';
</script>

<div class="bg-slate-300 h-full pb-16 lg:pb-0">
	<div class="overflow-auto h-full">
		<div class="flex flex-col w-full h-full max-w-7xl mx-auto">
			<Header />
			<div class="flex flex-1">
				<main class="p-4 flex-1 bg-white">
					<slot />
				</main>
			</div>
			<Footer />
			<Nav position="bottom" />
		</div>
	</div>
</div>
