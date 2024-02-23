import type { NotificationsReasonOptions, TypedPocketBase } from '$lib/types/db';

export async function createNotification(
	admin: TypedPocketBase,
	userid: string,
	sessionid: string,
	reason: NotificationsReasonOptions,
	datetime: string
) {}
