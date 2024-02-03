import { pb } from '$lib/pocketbase';
import type { ExpandedSession } from '$lib/types/types';
import { writable } from 'svelte/store';

export const currentSession = writable<ExpandedSession | null>(null);

refreshCurrentSession();

export async function refreshCurrentSession() {
	let session = await pb
		.collection('sessions')
		.getFirstListItem(`datetime > @now && tutee = "${pb.authStore.model?.id}"`, {
			expand: 'tutor,tutor.classes'
		})
		.catch(() => {});

	if (session) {
		currentSession.set(session as ExpandedSession);

		return session;
	} else {
		currentSession.set(null);
	}
}
