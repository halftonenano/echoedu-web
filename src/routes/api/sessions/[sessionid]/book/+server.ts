import { pb } from '$lib/pocketbase.js';
import { initAdminPb } from '$lib/server/pb-admin.js';
import type { NotificationsReasonOptions, NotificationsRecord } from '$lib/types/db.js';
import type { ExpandedSession } from '$lib/types/types.js';
import { json } from '@sveltejs/kit';

export async function POST({ params: { sessionid }, request }) {
	pb.authStore.loadFromCookie(request.headers.get('Cookie') || '');
	if (!pb.authStore.model?.id) return json({ error: 'you are not signed in' }, { status: 403 });

	const admin = await initAdminPb();
	let session: ExpandedSession | null = null;
	try {
		// Check if they can book the session
		session = await pb.collection('sessions').getOne(sessionid, { expand: 'tutor' });
	} catch {}
	if (!session) return json({ error: 'cannot access session' }, { status: 400 });

	try {
		// Check if user already has booked a session
		await admin
			.collection('sessions')
			.getFirstListItem(`datetime > @now && tutee = "${pb.authStore.model?.id}"`);
		return json({ error: 'You already have a session booked' });
	} catch {
		await admin.collection('sessions').update(sessionid, { tutee: pb.authStore.model?.id });

		try {
			// look up tutor's phone
			const phone = await admin
				.collection('phones')
				.getFirstListItem(`user="${session.expand?.tutor.user}"`);
			// create a notification record to be handled by background services
			await admin.collection('notifications').create({
				user: session.expand?.tutor.user,
				session: session.id,
				reason: 'booking/new' as NotificationsReasonOptions,
				datetime: new Date().toISOString(),
				phone: phone.id,
				tutee: false
			} satisfies NotificationsRecord);
		} catch (e) {
			console.log(e);
		}

		return json({ success: 'session booked' }, { status: 201 });
	}
}
