<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { Loader2 } from 'lucide-svelte';
	import type { AuthProviderInfo } from 'pocketbase';
	import { onMount } from 'svelte';

	let googleAuthProvider: AuthProviderInfo | null = null;

	onMount(() => {
		pb.collection('users')
			.listAuthMethods()
			.then((methods) => {
				const googleprovider = methods.authProviders.find((method) => method.name === 'google');
				if (!googleprovider) throw new Error();

				localStorage.setItem('pocketbase_oauth2_provider', JSON.stringify(googleprovider));
				document.cookie = `pocketbase_oauth2_provider=${JSON.stringify(googleprovider)}`;
				document.cookie = `location.origin=${location.origin}`;

				localStorage.setItem(
					'auth_after',
					new URLSearchParams(window.location.search).get('after') || '/book'
				);

				googleAuthProvider = googleprovider;
			})
			.catch(() => {
				alert('something went wrong while trying to initialize sign in');
			});
	});
</script>

<div class="relative grid min-h-screen place-items-center">
	<div class="absolute h-[80vh] w-full skew-y-[-8deg] bg-[#959CFF]"></div>
	<div class="relative m-6 rounded-lg border border-zinc-300 bg-white">
		<div class="overflow-hidden rounded-lg">
			<div class="border-b px-6 pb-3 pt-4">
				<h2 class="text-xl font-extrabold">EchoEDU</h2>
			</div>
			<div class="w-64">
				{#if !googleAuthProvider}
					<div class="grid h-14 place-items-center bg-zinc-100 p-3">
						<Loader2 class="h-5 animate-spin border-zinc-400" />
					</div>
				{:else}
					<a
						class="flex h-14 items-center gap-3 bg-zinc-100 p-3 px-6"
						href="{googleAuthProvider.authUrl}{location.origin}/signin/redirect"
					>
						<img src={'/assets/google.png'} alt="google logo" class="h-5" />
						Continue with google
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>
