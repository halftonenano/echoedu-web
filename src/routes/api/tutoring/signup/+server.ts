import { pb } from '$lib/pocketbase.js';
import { initAdminPb } from '$lib/server/pb-admin.js';
import type { NotificationsReasonOptions, NotificationsRecord } from '$lib/types/db.js';
import type { ExpandedSession } from '$lib/types/types.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	pb.authStore.loadFromCookie(request.headers.get('Cookie') || '');
	if (!pb.authStore.model?.id) return json({ error: 'you are not signed in' }, { status: 403 });

	const admin = await initAdminPb();
	
  
}
