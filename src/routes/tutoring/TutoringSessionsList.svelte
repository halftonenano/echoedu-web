<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { tutorSessions, type TutorViewSession } from '$lib/tutors/sessions/tutorSessionsStore';
	import dayjs from 'dayjs';
	import { Loader2, X } from 'lucide-svelte';
	import { pb } from '$lib/pocketbase';


	let loading = false;
	let groupedSessions: { date: string; sessions: TutorViewSession[] }[] = [];

	$: filteredSessions = $tutorSessions.filter((s) => true);

	$: {
		if ($tutorSessions.length > 0) {
			groupedSessions = [];

			const firstdate = dayjs($tutorSessions[0].datetime).startOf('day');
			const lastdate = dayjs(
				$tutorSessions[$tutorSessions.length > 0 ? $tutorSessions.length - 1 : 0].datetime
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

	$: console.log($tutorSessions);

	async function cancelSession(session: any){
		console.log(session)
		await pb.collection('sessions').delete(session);
		window.location.reload();
	}

</script>

<div>
	<div class="font-bold">Your Schedule</div>
	<div class="mt-3 flex min-h-[60vh] flex-col gap-5 overflow-hidden rounded-md border p-5">
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
								No sessions on this day
							</li>
						{/if}

						{#each day.sessions as session (session.id)}
							<li
								class="flex items-center justify-between gap-3 px-5 py-2 pl-14 transition-colors hover:bg-zinc-100"
							>
								<div class="flex items-center gap-3">
									<div>{dayjs(session.datetime).format('h:mm a')}</div>
									—
									{#if session.tutee}
										<div>
											{session.expand?.tutee.name}
										</div>
									{:else}
										<div class="italic text-zinc-400">Empty</div>
									{/if}

									{#if session.tutee}
										— <div>{session.location}</div>
									{/if}
								</div>

                <Button on:click={()=>{cancelSession(session.id)}} class='p-0 m-0 h-fit' variant="link"><X size={18} /></Button>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		{/if}
	</div>
</div>
