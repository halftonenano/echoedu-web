import { PUBLIC_API_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import type { TypedPocketBase } from './types/db';

export const pb = new PocketBase(PUBLIC_API_URL) as TypedPocketBase;

export const user = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
	user.set(pb.authStore.model);
	document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
});
