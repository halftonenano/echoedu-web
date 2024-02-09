<script>
	import Analytics from '$lib/components/Analytics.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
</script>

<Toaster containerClassName="text-sm font-bold" />
<Navbar />

<slot />

<Analytics />
