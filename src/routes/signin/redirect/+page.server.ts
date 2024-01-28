import { pb } from '$lib/pocketbase';
import type { AuthProviderInfo } from 'pocketbase';

export async function load({ url, cookies }) {
	const params = url.searchParams;

	const provider: AuthProviderInfo = JSON.parse(cookies.get('pocketbase_oauth2_provider') || '');

	if (provider.state !== params.get('state')) {
		throw "State parameters don't match.";
	}

	const record = await pb
		.collection('users')
		.authWithOAuth2Code(
			provider.name,
			params.get('code') || '',
			provider.codeVerifier,
			cookies.get('location.origin') + '/signin/redirect'
		);

	const cookie = pb.authStore
		.exportToCookie({
			httpOnly: false
		})
		.split('=');
	cookies.set(cookie[0], cookie[1]);

	console.log(record);
}
