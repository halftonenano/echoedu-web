import { INTERNAL_KEY } from '$env/static/private';
import { PUBLIC_API_URL } from '$env/static/public';
import type { TypedPocketBase } from '$lib/types/db';
import PocketBase from 'pocketbase';

export async function initAdminPb() {
	const pb = new PocketBase(PUBLIC_API_URL) as TypedPocketBase;

	const response: { value: string; code?: number } = await (
		await fetch(`${PUBLIC_API_URL}/api/collections/secrets/records/___admin-cookie`, {
			headers: { 'X-Internal-Key': INTERNAL_KEY }
		})
	).json();

	if (response.code) throw new Error();

	pb.authStore.loadFromCookie(response.value);

	return pb;
}
