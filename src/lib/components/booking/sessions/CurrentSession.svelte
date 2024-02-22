<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import dayjs from 'dayjs';
	import { fly } from 'svelte/transition';
	import TeacherBadge from '../teachers/TeacherBadge.svelte';
	import CancelSessionButton from './CancelSessionButton.svelte';
	import { currentSession } from './currentSessionStore';
	import NhsBadge from '../NhsBadge.svelte';
</script>

{#if $currentSession}
	<div
		class="md:mb-5 rounded-t-lg md:rounded-lg border-t md:border bg-white p-5 shadow-lg"
		transition:fly={{ x: 200, duration: 400 }}
	>
		<div class="flex gap-3">
			<div class="w-full">
				<div class="font-bold">Your Session</div>
				<hr class="my-3 w-full" />
			</div>
			<CancelSessionButton sessionid={$currentSession.id} />
		</div>

		<div class="mb-4">
			<h2 class="text-xl font-bold">
				{$currentSession.expand?.tutor.name}
			</h2>

			{#if $currentSession.expand?.tutor.expand?.classes}
				<div class="mt-2 flex flex-wrap gap-3">
					{#if $currentSession.expand.tutor.isNHS}
						<NhsBadge />
					{/if}
					{#each $currentSession.expand.tutor.expand.classes as takenclass}
						<TeacherBadge name={takenclass.teacherName} course={takenclass.courseName} />
					{/each}
				</div>
			{/if}
		</div>

		<div class="rounded-md border bg-white shadow-sm">
			<Table.Root class="overflow-visible">
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-16">Date</Table.Head>
						<Table.Head class="w-16"></Table.Head>
						<Table.Head class="w-16">Time</Table.Head>
						<Table.Head>Location</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell class="whitespace-nowrap">
							{dayjs($currentSession.datetime).format('MMM D')}
						</Table.Cell>
						<Table.Cell class="whitespace-nowrap">
							{dayjs($currentSession.datetime).format('dddd')}
						</Table.Cell>
						<Table.Cell class="whitespace-nowrap">
							{dayjs($currentSession.datetime).format('h:mm a')}
						</Table.Cell>
						<Table.Cell>
							{$currentSession.location}
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</div>
	</div>
{/if}
