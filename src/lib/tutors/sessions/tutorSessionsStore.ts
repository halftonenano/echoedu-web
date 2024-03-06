import { pb } from '$lib/pocketbase';
import type { CoursesResponse, SessionsResponse, UsersResponse } from '$lib/types/db';
import { writable } from 'svelte/store';

export type TutorViewSession = SessionsResponse<{ tutee: UsersResponse }>;

export const tutorSessions = writable<TutorViewSession[]>([]);

refreshTutoringSessionsList();

export async function refreshTutoringSessionsList() {
	tutorSessions.set(
		await pb
			.collection('sessions')
			.getFullList({
				sort: 'datetime',
				filter: `datetime > @now && tutor.user = "${pb.authStore.model?.id}"`,
				expand: 'tutee'
			})
	);
}
