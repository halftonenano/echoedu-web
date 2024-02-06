<script>
	import PageFormat from '$lib/components/PageFormat.svelte';
	import { pb } from '$lib/pocketbase';
</script>

<PageFormat title="Account" description="Your EchoEDU Account">
	<div>id: {pb.authStore.model?.id}</div>
	<div>name: {pb.authStore.model?.name}</div>
</PageFormat>
