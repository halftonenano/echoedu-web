import { pb } from '$lib/pocketbase.js';
import type { ClassesResponse, SessionsResponse, TutorsResponse } from '$lib/types/db';
import { error } from '@sveltejs/kit';

export async function load({ params: { sessionid }, url }) {
	const session = await pb
		.collection('sessions')
		.getOne<SessionsResponse<{ tutor: TutorsResponse<{ classes: ClassesResponse[] }> }>>(
			sessionid,
			{
				expand: 'tutor,tutor.classes'
			}
		)
		.catch(() => {
			throw error(404, 'Session not found');
		});

	return {
		session,
		selectedTeacherId: url.searchParams.get('teacher') || '',
		selectedCourseId: url.searchParams.get('course') || ''
	};
}

export const ssr = false;
