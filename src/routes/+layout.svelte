<script lang="ts">
	import '../app.css';

	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Nav from './Nav.svelte';

	let lastScrollTop = 0;
	let hideBottomNav = false;
	function handleScroll(event: UIEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		const scrollTop = event.currentTarget?.scrollTop;
		hideBottomNav = scrollTop > lastScrollTop;
		lastScrollTop = scrollTop;
	}
</script>

<div class="bg-slate-300 dark:bg-slate-900 h-full">
	<div class="overflow-auto h-full xl:stable-scroll" on:scroll={handleScroll}>
		<div class="flex flex-col w-full h-full max-w-5xl mx-auto">
			<Header />
			<div class="flex flex-1">
				<main class="p-4 flex-1 bg-white dark:bg-slate-800">
					<slot />
				</main>
			</div>
			<Footer />
			<Nav position="bottom" hidden={hideBottomNav} />
		</div>
	</div>
</div>
