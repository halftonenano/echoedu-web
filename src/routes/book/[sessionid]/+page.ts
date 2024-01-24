import { pb } from '$lib/pocketbase.js';
import type { SessionsResponse, TutorsResponse, TeachersResponse } from '$lib/types/db';

export async function load({ params: { sessionid } }) {
	const session = pb
		.collection('sessions')
		.getOne<SessionsResponse<{ tutor: TutorsResponse<{ teacher: TeachersResponse }> }>>(sessionid, {
			expand: 'tutor,tutor.teacher'
		});

	return { session };
}

export const ssr = false;
