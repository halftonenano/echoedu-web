import { pb } from '$lib/pocketbase.js';
import { initAdminPb } from '$lib/server/pb-admin.js';
import type { SessionsResponse } from '$lib/types/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ params: { sessionid }, request }) {
	pb.authStore.loadFromCookie(request.headers.get('Cookie') || '');
	const admin = await initAdminPb();

	let session: SessionsResponse | null = null;
	try {
		// Check if they have session
		session = await pb.collection('sessions').getOne(sessionid);
	} catch {}
	if (!session) return json({ error: 'Session does not exist' }, { status: 404 });
	if (session.tutee !== pb.authStore.model?.id)
		return json({ error: 'You have not booked this session' }, { status: 403 });

	await admin.collection('sessions').update(sessionid, { tutee: '' });

	return json({ success: 'session cancelled' });
}
