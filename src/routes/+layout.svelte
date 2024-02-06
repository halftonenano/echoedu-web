<script>
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Toaster containerClassName="text-sm font-bold" />
<Navbar />

<slot />
