import { pb } from '$lib/pocketbase.js';
import { initAdminPb } from '$lib/server/pb-admin.js';
import type { TutorsRecord } from '$lib/types/db.js';

import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	pb.authStore.loadFromCookie(request.headers.get('Cookie') || '');
	if (!pb.authStore.model?.id) return json({ error: 'you are not signed in' }, { status: 403 });

	try {
		await pb.collection('tutors').getFirstListItem(`user="${pb.authStore.model.id}"`);
		return json({ error: 'You are already a tutor' });
	} catch (e) {
		console.error(e);
	}

	const admin = await initAdminPb();

	try {
		const record = await admin
			.collection('autoNhsIds')
			.getFirstListItem(`email="${pb.authStore.model.email}"`);

		await admin.collection('tutors').create({
			user: pb.authStore.model.id,
			name: pb.authStore.model.name,
			isNHS: true
		} satisfies TutorsRecord);

		return json({ success: 'You have been auto approved!' });
	} catch {
		try {
			await admin.collection('applications').getFirstListItem(`user="${pb.authStore.model.id}"`);
			return json({ error: 'You have already submitted an application' });
		} catch {}

		await admin.collection('applications').create({ user: pb.authStore.model.id });

		return json({ success: 'Application has been submitted' });
	}
}
