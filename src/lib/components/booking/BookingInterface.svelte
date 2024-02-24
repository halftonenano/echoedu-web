<script lang="ts">
	import { pb, user } from '$lib/pocketbase';
	import type { ExpandedSession } from '$lib/types/types';
	import dayjs from 'dayjs';
	import { Loader2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import CourseSelector from './courses/CourseSelector.svelte';
	import CurrentSession from './sessions/CurrentSession.svelte';
	import TeacherBadge from './teachers/TeacherBadge.svelte';
	import TeacherSelector from './teachers/TeacherSelector.svelte';
	import type { SessionsRecord, SessionsResponse } from '$lib/types/db';
	import NhsBadge from './NhsBadge.svelte';

	let loading = true;
	let fetchedSessions: ExpandedSession[] = [];
	let filteredSessions: ExpandedSession[] = [];
	let groupedSessions: { date: string; sessions: ExpandedSession[] }[] = [];

	onMount(async () => {
		const response = await pb.collection('sessions').getList<ExpandedSession>(0, 50, {
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

	function getBookingLink(session: SessionsResponse) {
		return `/book/${session.id}${
			selectedTeacherId !== '' || selectedCourseId !== '' ? '?' : ''
		}${new URLSearchParams({
			...(selectedTeacherId ? { teacher: selectedTeacherId } : {}),
			...(selectedCourseId ? { course: selectedCourseId } : {})
		})}`;
	}
</script>

<CurrentSession />

<div class="bg-white p-5 shadow-lg md:rounded-lg md:border">
	<div class="flex md:gap-5 md:flex-row flex-col items-center gap-3">
		<TeacherSelector bind:selectedTeacherId />
		<CourseSelector bind:selectedCourseId />
	</div>
	<div class="mt-5 flex min-h-[60vh] flex-col gap-5 rounded-md md:border md:p-5">
		{#if loading}
			<div class="grid h-[30vh] w-full place-items-center">
				<Loader2 class="h-5 animate-spin text-zinc-400" />
			</div>
		{:else}
			{#each groupedSessions as day}
				<div class="rounded-sm md:border">
					<div
						class="cursor-default md:px-5 pb-2 pt-3 md:text-lg font-bold transition-colors hover:bg-zinc-100"
					>
						{dayjs(day.date).format('dddd, MMMM D')}
					</div>
					<hr class="md:ml-8" />
					<ul class="">
						{#if day.sessions.length === 0}
							<li
								class="cursor-default px-5 py-2 md:pl-14 italic text-zinc-400 transition-colors hover:bg-zinc-100 md:text-base text-sm"
							>
								{#if selectedTeacherId === '' && selectedCourseId === ''}
									No available sessions on this day
								{:else}
									No available sessions under selected filters
								{/if}
							</li>
						{/if}

						{#each day.sessions as session (session.id)}
							<li
								class="flex items-center justify-between gap-3 px-5 py-2 md:pl-14 transition-colors hover:bg-zinc-100 md:text-base text-sm"
							>
								<div class="flex items-center gap-3 flex-wrap">
									{#if session.expand}
										<div class='w-full md:w-fit lg:w-fit'>
											{session.expand.tutor.name}
										</div>	
										{#if session.expand.tutor.expand}
											{#if session.expand.tutor.isNHS}
												<div class="scale-75 -my-1.5 -mx-5 sm:scale-[.85] sm:-mx-3 md:scale-100 md:mx-0">
													<NhsBadge />
												</div>
											{/if}
											{#each session.expand.tutor.expand.classes as takenclass}
												{#if (selectedTeacherId === '' || takenclass.teacher === selectedTeacherId) && (selectedCourseId === '' || takenclass.course === selectedCourseId)}
												<div class="scale-75 -my-1.5 -mx-5 sm:scale-[.85] sm:-mx-3 md:scale-100 md:mx-0">
													<TeacherBadge
															name={takenclass.teacherName}
															course={takenclass.courseName}
														/>
												</div>	
												{/if}
											{/each}
										{/if}
									{/if}
								</div>
								<a
									class="-mr-3 rounded bg-[#959CFF] px-4 py-1 text-sm font-bold text-white shadow-md transition hover:-translate-y-1 hover:bg-[#7f7fec]"
									href="{$user ? '' : '/signin?after='}{getBookingLink(session)}"
									data-sveltekit-preload-data="tap">book</a
								>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		{/if}
	</div>
</div>
