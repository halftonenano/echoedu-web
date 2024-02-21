<script>
	import PageFormat from '$lib/components/PageFormat.svelte';
	import { Button } from '$lib/components/ui/button';
	import { pb, signOut } from '$lib/pocketbase';
</script>

<PageFormat title="Account" description="Your EchoEDU Account">
	<div>id: {pb.authStore.model?.id}</div>
	<div>name: {pb.authStore.model?.name}</div>
	<Button on:click={() => signOut()}>Sign Out</Button>
</PageFormat>
