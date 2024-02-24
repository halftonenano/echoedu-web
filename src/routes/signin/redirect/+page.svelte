<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { Loader2 } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		if (data.error) {
			alert(data.error);
			goto('/signin');
			return;
		}

		if (data.cookie) {
			pb.authStore.loadFromCookie(data.cookie);
		} else {
			pb.authStore.loadFromCookie(document.cookie);
		}

		if (data.isNew) {
			goto('/account/setup');
		} else {
			const authAfter = localStorage.getItem('auth_after');
			if (authAfter) {
				localStorage.removeItem('auth_after');
				goto(authAfter);
			} else {
				goto('/book');
			}
		}
	});
</script>

<div class="relative grid min-h-screen place-items-center">
	<div class="absolute h-[80vh] -mt-[35vh] w-full skew-y-[-8deg] bg-[#959CFF]"></div>
	<div class="relative m-6 rounded-lg border border-zinc-300 bg-white">
		<div class="overflow-hidden rounded-lg">
			<div class="border-b px-6 pb-3 pt-4">
				<h2 class="text-xl font-extrabold">EchoEDU</h2>
			</div>
			<div class="w-64">
				<div class="grid h-14 place-items-center bg-zinc-100 p-3">
					<Loader2 class="h-5 animate-spin text-zinc-400" />
				</div>
			</div>
		</div>
	</div>
</div>
