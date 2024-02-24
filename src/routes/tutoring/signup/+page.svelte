<script>
	import PageFormat from '$lib/components/PageFormat.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { confetti } from '@neoconfetti/svelte';
	import { Loader2 } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
  import { user } from '$lib/pocketbase'
	import { cn, sleep } from '$lib/utils';
	import { goto } from '$app/navigation';

  let processing = false;
  let success = '';
</script>

<PageFormat title='EchoEDU Tutoring' description="Sign up as a tutor for EchoEDU">
  {#if success}
    <div class="mx-auto">
      <div use:confetti />
    </div>
  {/if}

  {#if $user}
    <Button
      class="flex w-full items-center justify-center gap-2"
      on:click={async () => {
        processing = true;

        const response = await (
          await fetch(`/api/tutoring/signup`, { method: 'POST' })
        ).json();

        success = response.success

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
  {:else}
    <a href="/signin?after=/tutoring/signup" class={cn("w-full flex h-14 items-center gap-3 bg-zinc-100 p-3 px-6", buttonVariants({ variant: "outline" }))}>
      <img src={'/assets/google.png'} alt="google logo" class="h-5" />
      Continue to sign in
    </a>
  {/if}
</PageFormat>