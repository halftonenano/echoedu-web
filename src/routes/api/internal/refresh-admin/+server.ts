import { API_ADMIN_EMAIL, API_ADMIN_PASSWORD, INTERNAL_KEY } from '$env/static/private';
import { PUBLIC_API_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

export async function GET({ request }) {
	if (request.headers.get('X-Internal-Key') !== INTERNAL_KEY) {
		return new Response('invalid key', { status: 401 });
	}

	const pb = new PocketBase(PUBLIC_API_URL);

	await pb.admins.authWithPassword(API_ADMIN_EMAIL, API_ADMIN_PASSWORD);

	const pbAdminCookie = pb.authStore.exportToCookie();

	const response: { value: string; code?: number; message?: string } = await (
		await fetch(
			`${PUBLIC_API_URL}/api/collections/secrets/records/___admin-cookie`,
			{
				method: 'PATCH',
				headers: {
					'X-Internal-Key': INTERNAL_KEY,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ value: pbAdminCookie })
			}
		)
	).json();

	return new Response(response.message || 'success', {
		status: response.code || 201
	});
}
