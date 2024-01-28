<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_GSI_CLIENT_ID } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import { pb } from '$lib/pocketbase';
	import { GoogleOAuthProvider, type SuccessTokenResponse } from 'google-oauth-gsi';

	let initialized: boolean | null = null;
	const googleProvider = new GoogleOAuthProvider({
		clientId: PUBLIC_GSI_CLIENT_ID,
		onScriptLoadError: () => (initialized = false),
		onScriptLoadSuccess: () => (initialized = true)
	});

	let initialToken: SuccessTokenResponse | null = null;
	const initialLogin = googleProvider.useGoogleLogin({
		flow: 'implicit',
		hosted_domain: 'my.cuhsd.org',
		onSuccess(response) {
			initialToken = response;
		}
	});

	$: console.log(initialToken);

	let googleAccountInfo: {
		names: { unstructuredName: string }[];
		photos: { url: string }[];
		emailAddresses: { value: string }[];
	} | null = null;

	$: if (initialToken) {
		(async () => {
			googleAccountInfo = await (
				await fetch(
					'https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos',
					{
						headers: { Authorization: `Bearer ${initialToken.access_token}` }
					}
				)
			).json();
		})();
	}
</script>

<!-- <div class="grid place-items-center min-h-screen">
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
</div> -->

<div class="relative grid min-h-screen place-items-center">
	<div class="absolute h-[80vh] w-full skew-y-[-8deg] bg-[#959CFF]"></div>
	<div class="relative m-6 rounded-lg border border-zinc-300 bg-white">
		<div class="overflow-hidden rounded-lg">
			<div class="border-b px-6 pb-3 pt-4">
				<h2 class="text-xl font-extrabold">EchoEDU</h2>
			</div>
			<div class="w-64">
				<button class="flex h-14 items-center gap-3 bg-zinc-100 p-3 px-6" on:click={initialLogin}>
					<img src={'/assets/google.png'} alt="google logo" class="h-5" />
					Continue with google
				</button>
			</div>
		</div>
	</div>
</div>
