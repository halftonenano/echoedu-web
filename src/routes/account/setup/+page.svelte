<script lang="ts">
	import ConfirmPhoneNumber from '$lib/components/account/ConfirmPhoneNumber.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { pb } from '$lib/pocketbase';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	let afterUrl: string | null = null;

	onMount(() => {
		afterUrl = localStorage.getItem('auth_after');
	});
</script>

<div class="grid min-h-screen place-items-center">
	<div>
		<ConfirmPhoneNumber />

		{#if afterUrl}
			<a href={afterUrl} class={cn('mt-5 w-full', buttonVariants({ variant: 'outline' }))}>
				Continue to<code class="ml-2">{afterUrl}</code>
			</a>
		{:else}
			<a href="/book" class={cn('mt-5 w-full', buttonVariants({ variant: 'outline' }))}>
				Continue to<code class="ml-2">/book</code>
			</a>
		{/if}
	</div>
</div>
