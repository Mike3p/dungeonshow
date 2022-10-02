<script>
	import '../theme.postcss';
	import '../app.css';
	import '@brainandbones/skeleton/styles/all.css';

	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import Nav from './nav.svelte';
	import { AppShell, Drawer } from '@brainandbones/skeleton';
	import { menuStore } from '$lib/stores';
</script>

<Drawer open={menuStore} position="left">
	<Nav />
</Drawer>
<AppShell>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<div slot="sidebarLeft" class="hidden lg:block h-full"><Nav /></div>
	<div slot="default" class="p-4">
		<slot />
	</div>
	<svelte:fragment slot="footer"><Footer /></svelte:fragment>
</AppShell>
