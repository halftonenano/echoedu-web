<script lang="ts">
	import dayjs from 'dayjs';
	import TeacherSelector from './Teachers/TeacherSelector.svelte';
	import TeacherBadge from './TeacherBadge.svelte';
	import { onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import type {
		SessionsResponse,
		TutorsResponse,
		TeachersResponse,
		ClassesResponse,
		CoursesResponse
	} from '$lib/types/db';
	import CourseSelector from './Teachers copy/CourseSelector.svelte';

	type Session = SessionsResponse<{
		tutor: TutorsResponse<{
			classes: ClassesResponse<{ teacher: TeachersResponse; course: CoursesResponse }>[];
		}>;
	}>;

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
	<div class="mt-5 flex min-h-screen flex-col gap-5 overflow-hidden rounded-md border p-5">
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
								class="text-sm text-zinc-400 underline underline-offset-4"
								href="/book/{session.id}"
								data-sveltekit-preload-data="tap">book →</a
							>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>
