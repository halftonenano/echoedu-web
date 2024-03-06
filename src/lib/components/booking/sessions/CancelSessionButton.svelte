<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Loader2, X } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import { refreshCurrentSession } from './currentSessionStore';

	export let sessionid: string;
	let loading = false;

	export let onFinish: (() => void) | undefined;
</script>

<Button
	class="-my-1 flex items-center gap-2 pr-2.5"
	size="sm"
	variant="outline"
	disabled={loading}
	on:click={async () => {
		loading = true;

		const response = await (
			await fetch(`/api/sessions/${sessionid}/cancel`, { method: 'POST' })
		).json();

		loading = false;
		if (response.error) {
			toast.error(response.error);
		}
		if (response.success) {
			toast.success('Session cancelled!');

			if (!onFinish) {
				await refreshCurrentSession();
			} else {
				onFinish();
			}
		}
	}}
>
	{#if loading}
		Canceling...
		<Loader2 class="animate-spin" size={16} />
	{:else}
		Cancel
		<X size={18} />
	{/if}
</Button>
