<script>
	import { goto } from '$app/navigation';
	import PageFormat from '$lib/components/PageFormat.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { user } from '$lib/pocketbase';
	import { cn, sleep } from '$lib/utils';
	import { confetti } from '@neoconfetti/svelte';
	import { Loader2 } from 'lucide-svelte';
	import toast from 'svelte-french-toast';

	let processing = false;
	let success = '';
</script>

<PageFormat title="EchoEDU Tutoring" description="Sign up as a tutor for EchoEDU">
	{#if success === 'You have been auto approved!'}
		<div class="mx-auto">
			<div use:confetti />
		</div>
	{/if}

	{#if $user}
		<p class="mb-5">If you are in NHS you will be auto approved!</p>

		<Button
			class="flex w-full items-center justify-center gap-2"
			variant="outline"
			on:click={async () => {
				processing = true;

				const response = await (await fetch(`/api/tutoring/signup`, { method: 'POST' })).json();

				if (response.error) {
					toast.error(response.error);
				}
				success = response.success || '';

				processing = false;

				if (success === 'You have been auto approved!') {
					await sleep(3000);
					await goto('/tutoring');
				}
			}}
			disabled={processing || success !== ''}
		>
			{#if processing}
				Applying...<Loader2 class="h-5 animate-spin" />
			{:else if success !== ''}
				{success} 🎊
			{:else}
				Apply
			{/if}
		</Button>

		<p class="my-5">
			Please fill out this form after applying with the button above. NHS members will not have to
			do this.
		</p>

		<iframe
			class="mx-auto"
			title="google form"
			src="https://docs.google.com/forms/d/e/1FAIpQLSemn4XOS8igDLlpWvQa4v9Nw-SisQ5-ujXophDct01WflGW9A/viewform?embedded=true"
			width="640"
			height="1200"
			frameborder="0"
			marginheight="0"
			marginwidth="0">Loading…</iframe
		>
	{:else}
		<a
			href="/signin?after=/tutoring/signup"
			class={cn(
				'flex h-14 w-full items-center gap-3 bg-zinc-100 p-3 px-6',
				buttonVariants({ variant: 'outline' })
			)}
		>
			<img src={'/assets/google.png'} alt="google logo" class="h-5" />
			Sign in to continue
		</a>

		<div class="md:h-52"></div>
	{/if}
</PageFormat>
