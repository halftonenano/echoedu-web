import { pb } from '$lib/pocketbase.js';
import { initAdminPb } from '$lib/server/pb-admin.js';
import {
	NotificationsReasonOptions,
	type SessionsResponse,
	type NotificationsRecord
} from '$lib/types/db.js';
import type { ExpandedSession } from '$lib/types/types';
import { json } from '@sveltejs/kit';

export async function POST({ params: { sessionid }, request }) {
	pb.authStore.loadFromCookie(request.headers.get('Cookie') || '');
	const admin = await initAdminPb();

	let session: ExpandedSession | null = null;
	try {
		// Check if they have session
		session = await pb.collection('sessions').getOne(sessionid, { expand: 'tutor' });
	} catch {}
	if (!session) return json({ error: 'Session does not exist' }, { status: 404 });
	if (session.tutee !== pb.authStore.model?.id)
		return json({ error: 'You have not booked this session' }, { status: 403 });

	await admin.collection('sessions').update(sessionid, { tutee: '' });

	try {
		// look up tutor's phone
		const phone = await admin
			.collection('phones')
			.getFirstListItem(`user="${session.expand?.tutor.user}"`);
		// create a notification record to be handled by background services
		await admin.collection('notifications').create({
			user: session.expand?.tutor.user,
			session: session.id,
			reason: NotificationsReasonOptions['booking/canceled'],
			datetime: new Date().toISOString(),
			phone: phone.id
		} satisfies NotificationsRecord);
	} catch (e) {
		console.log(e);
	}

	return json({ success: 'session cancelled' });
}
