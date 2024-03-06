import { pb } from '$lib/pocketbase.js';
import { createNotifications } from '$lib/server/createNotification.js';
import { initAdminPb } from '$lib/server/pb-admin.js';
import { NotificationsReasonOptions } from '$lib/types/db.js';
import type { ExpandedSession } from '$lib/types/types.js';
import { json } from '@sveltejs/kit';
import dayjs from 'dayjs';

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
			await createNotifications(admin, session.expand!.tutor.user, session.id, false, [
				{ reason: NotificationsReasonOptions['booking/new'], datetime: new Date().toISOString() },
				{
					reason: NotificationsReasonOptions['reminder/morning'],
					datetime: dayjs(session.datetime)
						.set('hour', 8)
						.set('minute', 30)
						.set('second', 0)
						.toISOString()
				},
				{
					reason: NotificationsReasonOptions['reminder/5mins'],
					datetime: dayjs(session.datetime).add(-5, 'minutes').toISOString()
				}
			]);

			await createNotifications(admin, pb.authStore.model?.id, session.id, true, [
				{
					reason: NotificationsReasonOptions['reminder/morning'],
					datetime: dayjs(session.datetime)
						.set('hour', 8)
						.set('minute', 30)
						.set('second', 0)
						.toISOString()
				},
				{
					reason: NotificationsReasonOptions['reminder/5mins'],
					datetime: dayjs(session.datetime).add(-5, 'minutes').toISOString()
				}
			]);
		} catch (e) {
			console.log(e);
		}

		return json({ success: 'session booked' }, { status: 201 });
	}
}
