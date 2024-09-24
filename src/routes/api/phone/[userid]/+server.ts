import { pb } from '$lib/pocketbase.js';
import { initAdminPb } from '$lib/server/pb-admin.js';
import { json } from '@sveltejs/kit';

export async function GET({ params: { userid }, request }) {
	pb.authStore.loadFromCookie(request.headers.get('Cookie') || '');
	if (!pb.authStore.model?.id) return json({ error: 'you are not signed in' }, { status: 403 });

	const admin = await initAdminPb();

	try {
		await admin
			.collection('sessions')
			.getFirstListItem(
				`datetime > @now && tutee = "${pb.authStore.model?.id}" && tutor.user="${userid}"`
			);

		const phone = await admin.collection('phones').getFirstListItem(`user = "${userid}"`);
		return json({ number: phone.number });
	} catch {
		return json({ error: 'You do not have a session booked with this tutor.' });
	}
}
