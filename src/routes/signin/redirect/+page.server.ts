import { pb } from '$lib/pocketbase';
import { initAdminPb } from '$lib/server/pb-admin.js';
import type { AuthProviderInfo } from 'pocketbase';

export async function load({ url, cookies }) {
	const params = url.searchParams;

	const provider: AuthProviderInfo = JSON.parse(cookies.get('pocketbase_oauth2_provider') || '');

	if (provider.state !== params.get('state')) {
		throw "State parameters don't match.";
	}

	try {
		const authData = await pb
			.collection('users')
			.authWithOAuth2Code(
				provider.name,
				params.get('code') || '',
				provider.codeVerifier,
				cookies.get('location.origin') + '/signin/redirect'
			);

		if (!authData.meta?.isNew) {
			cookies.set(
				'pb_auth',
				pb.authStore
					.exportToCookie({
						httpOnly: false
					})
					.split('pb_auth=')[1]
					.split(';')[0],
				{ path: '/', httpOnly: false }
			);
			return {
				isNew: false,
				cookie: pb.authStore.exportToCookie({
					httpOnly: false
				})
			};
		}

		if (authData.meta) {
			const admin = await initAdminPb();
			await admin.collection('users').update(authData.record.id, {
				name: authData.meta.name,
				avatarUrl: authData.meta.avatarUrl
			});

			await pb.collection('users').authRefresh();
		}

		cookies.set(
			'pb_auth',
			pb.authStore
				.exportToCookie({
					httpOnly: false
				})
				.split('pb_auth=')[1]
				.split(';')[0],
			{ path: '/', httpOnly: false }
		);

		return {
			isNew: (authData.meta?.isNew as boolean) || false,
			cookie: pb.authStore.exportToCookie({
				httpOnly: false
			})
		};
	} catch {
		return { error: 'something went wrong while trying to authenticate' };
	}
}
