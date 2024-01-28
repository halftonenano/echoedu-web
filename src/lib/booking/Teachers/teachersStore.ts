import { pb } from '$lib/pocketbase';
import type { TeachersResponse } from '$lib/types/db';
import { writable } from 'svelte/store';

export const teachers = writable<TeachersResponse[]>([]);

pb.collection('teachers')
	.getFullList()
	.then((data) => teachers.set(data));
