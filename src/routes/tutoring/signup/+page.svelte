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
	<iframe
		class="mx-auto"
		title="google form"
		src="https://docs.google.com/forms/d/e/1FAIpQLSemn4XOS8igDLlpWvQa4v9Nw-SisQ5-ujXophDct01WflGW9A/viewform?embedded=true"
		width="640"
		height="600"
		frameborder="0"
		marginheight="0"
		marginwidth="0"
	>
		Loading…
	</iframe>
</PageFormat>
