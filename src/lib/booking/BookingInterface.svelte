<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import type { ClassesResponse, SessionsResponse, TutorsResponse } from '$lib/types/db';
	import dayjs from 'dayjs';
	import { Loader2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import TeacherBadge from './teachers/TeacherBadge.svelte';
	import CourseSelector from './courses/CourseSelector.svelte';
	import TeacherSelector from './teachers/TeacherSelector.svelte';

	type Session = SessionsResponse<{
		tutor: TutorsResponse<{
			classes: ClassesResponse[];
		}>;
	}>;

	let loading = true;
	let fetchedSessions: Session[] = [];
	let filteredSessions: Session[] = [];
	let groupedSessions: { date: string; sessions: Session[] }[] = [];

	onMount(async () => {
		const response = await pb.collection('sessions').getList<Session>(0, 50, {
			sort: 'datetime',
			expand: 'tutor,tutor.classes',
			filter: ``
		});

		fetchedSessions = response.items;
		loading = false;
	});

	let selectedTeacherId = '';
	let selectedCourseId = '';
	$: filteredSessions = fetchedSessions.filter(
		(s) =>
			(selectedTeacherId === '' ||
				s.expand?.tutor.expand?.classes.find((c) => c.teacher === selectedTeacherId)) &&
			(selectedCourseId === '' ||
				s.expand?.tutor.expand?.classes.find((c) => c.course === selectedCourseId))
	);

	$: {
		if (fetchedSessions.length > 0) {
			groupedSessions = [];

			const firstdate = dayjs(fetchedSessions[0].datetime).startOf('day');
			const lastdate = dayjs(
				fetchedSessions[fetchedSessions.length > 0 ? fetchedSessions.length - 1 : 0].datetime
			)
				.startOf('day')
				.unix();

			let i = 0;

			while (firstdate.add(i, 'day').unix() <= lastdate && i < 15) {
				const date = firstdate.add(i, 'day');
				if (date.day() !== 0 && date.day() !== 6) {
					groupedSessions.push({ date: date.toISOString(), sessions: [] });
				}
				i++;
			}

			for (let item of filteredSessions) {
				const date = dayjs(item.datetime).startOf('day').toISOString();
				let dateIndex = groupedSessions.findIndex((feedDay) => feedDay.date === date);

				if (dateIndex === -1) {
					groupedSessions.push({ date, sessions: [] });
					dateIndex = groupedSessions.length - 1;
				}

				groupedSessions[dateIndex].sessions.push(item);
			}

			groupedSessions = groupedSessions;
		}
	}
</script>

<div class="rounded-lg border bg-white p-5 shadow-lg">
	<div class="flex gap-5">
		<TeacherSelector bind:selectedTeacherId />
		<CourseSelector bind:selectedCourseId />
	</div>
	<div class="mt-5 flex min-h-[60vh] flex-col gap-5 overflow-hidden rounded-md border p-5">
		{#if loading}
			<div class="grid h-[30vh] w-full place-items-center">
				<Loader2 class="h-5 animate-spin text-zinc-400" />
			</div>
		{:else}
			{#each groupedSessions as day}
				<div class="rounded-sm border">
					<div
						class="cursor-default px-5 pb-2 pt-3 text-lg font-bold transition-colors hover:bg-zinc-100"
					>
						{dayjs(day.date).format('dddd, MMMM D')}
					</div>
					<hr class="ml-8" />
					<ul class="">
						{#if day.sessions.length === 0}
							<li
								class="cursor-default px-5 py-2 pl-14 italic text-zinc-400 transition-colors hover:bg-zinc-100"
							>
								No available sessions under selected filters
							</li>
						{/if}

						{#each day.sessions as session (session.id)}
							<li
								class="flex items-center justify-between gap-3 px-5 py-2 pl-14 transition-colors hover:bg-zinc-100"
							>
								<div class="flex items-center gap-3">
									{#if session.expand}
										{session.expand.tutor.name}
										{#if session.expand.tutor.expand}
											{#each session.expand.tutor.expand.classes as takenclass}
												{#if (selectedTeacherId === '' || takenclass.teacher === selectedTeacherId) && (selectedCourseId === '' || takenclass.course === selectedCourseId)}
													<TeacherBadge
														name={takenclass.teacherName}
														course={takenclass.courseName}
													/>
												{/if}
											{/each}
										{/if}
									{/if}
								</div>
								<a
									class="text-sm bg-[#959CFF] hover:bg-[#7f7fec] transition-color duration-500 font-bold text-white px-4 py-1 rounded-sm  underline-offset-4"
									href="/book/{session.id}?{new URLSearchParams({
										...(selectedTeacherId ? { teacher: selectedTeacherId } : {}),
										...(selectedCourseId ? { course: selectedCourseId } : {})
									})}"
									data-sveltekit-preload-data="tap">book →</a
								>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		{/if}
	</div>
</div>
