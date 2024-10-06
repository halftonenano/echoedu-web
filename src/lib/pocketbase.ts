import { PUBLIC_API_URL } from '$env/static/public';
import PocketBase, { type AuthModel } from 'pocketbase';
import { writable } from 'svelte/store';
import type { TypedPocketBase } from './types/db';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { eraseCookie } from './utils';

export const pb = new PocketBase(PUBLIC_API_URL) as TypedPocketBase;

export const user = writable<AuthModel | null>(pb.authStore.model);

if (browser && pb.authStore.model && !pb.authStore.isValid) {
	signOut();
}
try {
	document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
} catch {}

pb.authStore.onChange((auth) => {
	user.set(pb.authStore.model);
	try {
		document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
	} catch {}
});

export function signOut() {
	pb.authStore.clear();
	eraseCookie('pb_auth');
	goto('/signin');
}
