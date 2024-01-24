<script>
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { pb } from '$lib/pocketbase';
</script>

<div class="grid place-items-center min-h-screen">
	<div class="w-full max-w-sm">
		<Button
			class="w-full"
			variant="outline"
			on:click={async () => {
				await pb.collection('users').authWithOAuth2({ provider: 'google' });
				goto('/book');
			}}
		>
			Continue with Google
		</Button>
	</div>
</div>
