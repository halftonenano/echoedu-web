<script lang="ts">
	import { goto } from '$app/navigation';
	import NhsBadge from '$lib/components/booking/NhsBadge.svelte';
	import { refreshCurrentSession } from '$lib/components/booking/sessions/currentSessionStore.js';
	import TeacherBadge from '$lib/components/booking/teachers/TeacherBadge.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { sleep } from '$lib/utils.js';
	import { confetti } from '@neoconfetti/svelte';
	import dayjs from 'dayjs';
	import { Loader2 } from 'lucide-svelte';
	import toast from 'svelte-french-toast';

	export let data;
	const { session, selectedTeacherId, selectedCourseId } = data;

	let processing = false;
	let success = false;
</script>

<svelte:head>
	<title>EchoEDU — Book session from {data.session.expand?.tutor.name}</title>
</svelte:head>

<div class="relative min-h-screen overflow-x-hidden">
	<div class="absolute -top-[20vh] h-[80vh] w-full skew-y-[-8deg] bg-[#959CFF]"></div>

	<div class="relative p-10 px-0">
		<div class="mx-auto w-full max-w-7xl">
			<h1 class="text-4xl font-bold text-[#383838]">Confirm Appointment</h1>
			<Button
				class="mb-3 mt-1 p-1 text-lg"
				variant="link"
				on:click={() => {
					history.back();
				}}
			>
				← return
			</Button>

			<div
				class="mx-auto mt-[15vh] flex w-full max-w-3xl flex-col gap-5 md:rounded-lg md:border bg-white p-10 md:shadow-lg"
			>
				{#if success}
					<div class="mx-auto">
						<div use:confetti />
					</div>
				{/if}

				<div>
					<div class="">
						<h2 class="text-2xl md:text-3xl font-bold">
							{session.expand?.tutor.name}
						</h2>

						{#if session.expand?.tutor.expand?.classes}
							<div class="mt-2 flex flex-wrap gap-3">
								{#if session.expand.tutor.isNHS}
									<NhsBadge />
								{/if}
								{#each session.expand.tutor.expand.classes as takenclass}
									{#if (selectedTeacherId === '' || takenclass.teacher === selectedTeacherId) && (selectedCourseId === '' || takenclass.course === selectedCourseId)}
										<TeacherBadge name={takenclass.teacherName} course={takenclass.courseName} />
									{/if}
								{/each}
							</div>
							<hr class="mt-5" />
						{/if}
					</div>
				</div>

				<div>
					Book for
					<b>{dayjs(session.datetime).format('MMMM D, dddd [at] h:mm a')}</b>
				</div>

				<div class="rounded-md border bg-white shadow-sm">
					<Table.Root class="overflow-visible">
						<Table.Header>
							<Table.Row>
								<Table.Head class="w-16">Date</Table.Head>
								<Table.Head class="w-16">Time</Table.Head>
								<Table.Head>Location</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<Table.Row>
								<Table.Cell class="whitespace-nowrap">
									{dayjs(session.datetime).format('MMM D')}
								</Table.Cell>
								<Table.Cell class="whitespace-nowrap">
									{dayjs(session.datetime).format('h:mm a')}
								</Table.Cell>
								<Table.Cell>
									{session.location}
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
				</div>

				<Button
					class="flex w-full items-center justify-center gap-2"
					on:click={async () => {
						processing = true;

						const response = await (
							await fetch(`/api/sessions/${session.id}/book`, { method: 'POST' })
						).json();

						processing = false;
						if (response.error) {
							toast.error(response.error);
						}
						if (response.success) {
							success = true;
							await refreshCurrentSession();
							await sleep(3000);
							await goto('/book');
						}
					}}
					disabled={processing || success}
				>
					{#if processing}
						Confirming...<Loader2 class="h-5 animate-spin" />
					{:else if success}
						Successfuly Booked!<Loader2 class="h-5 animate-spin" />
					{:else}
						Confirm Your Appointment
					{/if}
				</Button>
			</div>
		</div>
	</div>
</div>
