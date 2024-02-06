<script>
	import BookingInterface from '$lib/components/booking/BookingInterface.svelte';
	import PageFormat from '$lib/components/PageFormat.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<PageFormat title='EchoEDU' description="Echoing teacher expectations" noBox>
	<div class="absolute top-16 left-[50%] -translate-x-[50%]">
		<Navbar/>
	</div>
	<BookingInterface />
</PageFormat>
