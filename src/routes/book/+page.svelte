<script>
	import BookingInterface from '$lib/booking/BookingInterface.svelte';
	import BackgroundSlant from '$lib/components/BackgroundSlant.svelte';
</script>

<div class="">
	<BackgroundSlant />

	<div class="relative p-10">
		<div class="mx-auto mt-[20vh] w-full max-w-7xl text-[#383838]">
			<h1 class="-ml-[4px] text-6xl font-bold">EchoEDU</h1>
			<p class="-ml-[2px] mb-3 mt-1 text-2xl">Echoing teacher expectations</p>
			<BookingInterface />
		</div>
	</div>
</div>
