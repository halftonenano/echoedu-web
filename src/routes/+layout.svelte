<script>
	import Analytics from '$lib/components/Analytics.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
</script>

<svelte:head>
	<title>EchoEDU — Echoing Teacher Expectations</title>
</svelte:head>

<Toaster containerClassName="text-sm font-bold" />
<Navbar />
<slot />
<Analytics />
