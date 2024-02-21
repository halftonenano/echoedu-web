<script>
	import PageFormat from '$lib/components/PageFormat.svelte';
	import BookingInterface from '$lib/components/booking/BookingInterface.svelte';
</script>

<svelte:head>
	<title>EchoEDU — Find tutoring sessions</title>
</svelte:head>

<PageFormat title="EchoEDU" description="Echoing teacher expectations" noBox>
	<BookingInterface />
</PageFormat>
