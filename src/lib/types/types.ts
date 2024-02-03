import type { ClassesResponse, SessionsResponse, TutorsResponse } from './db';

export type ExpandedSession = SessionsResponse<{
	tutor: TutorsResponse<{
		classes: ClassesResponse[];
	}>;
}>;
