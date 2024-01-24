<script lang="ts">
	import TeacherBadge from '$lib/booking/TeacherBadge.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import dayjs from 'dayjs';

	export let data;
	const { session } = data;

  let processing = false;
</script>

<div class="grid place-items-center" style="grid-template: 1fr / 1fr 2fr;">
	<div class="bg-main h-screen sticky top-0 w-full text-5xl font-thin italic text-right p-10">
		<h1>Checkout</h1>
	</div>
	<div class="flex flex-col gap-5 p-10">
		<div class="text-neutral-400 text-sm bg-neutral-100 border px-3 py-1 rounded w-fit">
			id: {session.id}
		</div>
		<div>
			<div class="italic">Tutoring session from</div>
			<div class="flex gap-3 items-end">
				<h2 class="font-bold text-3xl">
					{session.expand?.tutor.name}
				</h2>
				<TeacherBadge name={session.expand?.tutor.expand?.teacher.name} />
			</div>
		</div>
		<div>
			Book for
			<b>{dayjs(session.date).format('MMMM D, dddd [at] h:mm a')}</b>
		</div>

		<div class="border rounded-md bg-white shadow-sm p-3">
			<Table.Root class="overflow-visible">
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-16">Date</Table.Head>
						<Table.Head>Tutor</Table.Head>
						<Table.Head>Teacher</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell class="font-medium whitespace-nowrap"
							>{dayjs(session.date).format('MMM D')}</Table.Cell
						>
						<Table.Cell>{session.expand?.tutor.name}</Table.Cell>
						<Table.Cell>
							<TeacherBadge name={session.expand?.tutor.expand?.teacher.name} />
						</Table.Cell>
						<Table.Cell>{session.tutor}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</div>

		<!-- <div class="border rounded-md bg-white shadow-sm p-5 text-sm flex flex-col gap-2">
			<div class="flex justify-between items-center">
				<div class="">1 item</div>
				$0.00
			</div>
			<div class="flex justify-between items-center">
				<div class="">Sub-total</div>
				$0.00
			</div>
			<div class="flex justify-between items-center">
				<div class="">Taxes</div>
				$0.00
			</div>
			<div class="flex justify-between items-center font-bold">
				<div class="">Total due</div>
				$0.00
			</div>
		</div> -->

		<Button class="w-full">Confirm Your Free Appointment</Button>
	</div>
</div>
