<script lang="ts">
	import TeacherBadge from '$lib/booking/TeacherBadge.svelte';
	import * as Table from '$lib/components/ui/table';
	import { pb } from '$lib/pocketbase';
	import type { SessionsResponse, TeachersResponse, TutorsResponse } from '$lib/types/db';
	import { confetti } from '@neoconfetti/svelte';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';

	let sessions: SessionsResponse<{ tutor: TutorsResponse<{ teacher: TeachersResponse }> }>[] = [];
	let loading = true;

	onMount(async () => {
		const response = await pb.collection('sessions').getList<(typeof sessions)[0]>(0, 50, {
			sort: 'date',
			expand: 'tutor,tutor.teacher',
			filter: ``
		});

		sessions = response.items;
	});

	$: console.log(sessions);
</script>

<div class="p-10 bg-[#1ced35]">
	<div></div>
	<div class="p-8 pt-5 border shadow-xl rounded-lg bg-white">
		<Table.Root class="overflow-visible">
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-16">Date</Table.Head>
					<Table.Head class="w-28"></Table.Head>
					<Table.Head>Tutor</Table.Head>
					<Table.Head>Teacher</Table.Head>
					<Table.Head class="text-right"></Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each sessions as session (session.id)}
					<Table.Row>
						<Table.Cell class="font-medium whitespace-nowrap"
							>{dayjs(session.date).format('MMM D')}</Table.Cell
						>
						<Table.Cell class="font-medium whitespace-nowrap"
							>{dayjs(session.date).format('dddd')}</Table.Cell
						>
						<Table.Cell>{session.expand?.tutor.name}</Table.Cell>
						<Table.Cell>
							<TeacherBadge name={session.expand?.tutor.expand?.teacher.name} />
						</Table.Cell>
						<Table.Cell>{session.tutor}</Table.Cell>
						<Table.Cell class="text-right">
							<a class="border rounded px-3 py-1 text-sm" href="/book/{session.id}" data-sveltekit-preload-data="tap">Book</a>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
