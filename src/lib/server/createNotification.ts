import type {
	NotificationsReasonOptions,
	NotificationsRecord,
	TypedPocketBase
} from '$lib/types/db';

export async function createNotifications(
	admin: TypedPocketBase,
	userid: string,
	sessionid: string,
	tutee: boolean,
	notifications: { reason: NotificationsReasonOptions; datetime: string }[]
) {
	try {
		// look up tutor's phone
		const phone = await admin.collection('phones').getFirstListItem(`user="${userid}"`);

		for (const notification of notifications) {
			// create a notification record to be handled by background services
			await admin.collection('notifications').create({
				user: userid,
				session: sessionid,
				reason: notification.reason,
				datetime: notification.datetime,
				phone: phone.id,
				tutee
			} satisfies NotificationsRecord);
		}
	} catch {}
}
