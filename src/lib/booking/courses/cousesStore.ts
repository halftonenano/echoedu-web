import { pb } from '$lib/pocketbase';
import type { CoursesResponse } from '$lib/types/db';
import { writable } from 'svelte/store';

export const courses = writable<CoursesResponse[]>([]);

pb.collection('courses')
	.getFullList()
	.then((data) => courses.set(data));
