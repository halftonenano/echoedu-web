import { pb } from '$lib/pocketbase.js';
import { createNotifications, deleteAssociatedNotifications } from '$lib/server/notifications';
import { initAdminPb } from '$lib/server/pb-admin.js';
import { NotificationsReasonOptions } from '$lib/types/db.js';
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
		await deleteAssociatedNotifications(admin, session.id);

		await createNotifications(
			admin,
			pb.authStore.model?.id === session.tutee ? session.expand!.tutor.user : session.tutee,
			session.id,
			pb.authStore.model?.id !== session.tutee,
			[
				{
					reason: NotificationsReasonOptions['booking/canceled'],
					datetime: new Date().toISOString()
				}
			]
		);
	} catch (e) {
		console.log(e);
	}

	return json({ success: 'session cancelled' });
}
