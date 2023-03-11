<script>
	import '../theme.postcss';
	import '../app.css';
	import '@skeletonlabs/skeleton/styles/all.css';

	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Nav from './Nav.svelte';
	import {AppShell, Drawer} from '@skeletonlabs/skeleton';
</script>
<Drawer position="left">
	<Nav />
</Drawer>
<AppShell>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<div slot="sidebarLeft" class="hidden lg:block h-full"><Nav /></div>
	<div slot="default" class="p-4">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>
