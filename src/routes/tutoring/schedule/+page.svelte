<script lang="ts">
	import PageFormat from '$lib/components/PageFormat.svelte';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { pb } from '$lib/pocketbase';
	import TimeSelector from '$lib/tutoring/TimeSelector.svelte';
	import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
	import { Calendar as BitsUICalendar } from 'bits-ui';
	import dayjs from 'dayjs';
	import { Check } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	let value = today(getLocalTimeZone());

	let selectedTime = '';
	let selectedLocation = '';

	async function createRecord() {
		if (selectedTime == 'During Tutorial') {
			selectedTime = '17:05:00';
		} else if (selectedTime == 'During 7th Period') {
			selectedTime = '21:25:00';
		} else if (selectedTime) {
			selectedTime = '22:30:00';
		}
		// console.log(selectedLocation)
		let dateTime = dayjs(
			// @ts-ignore
			dayjs(value).add(7, 'h').format('YYYY-MM-DD') + ' ' + selectedTime + '.123Z'
		);

		const tutorChad = await pb
			.collection('tutors')
			.getFirstListItem(`name="${pb.authStore.model?.name}"`);
		const data = {
			tutor: tutorChad.id,
			datetime: dateTime,
		};
		try {
			if (dateTime) {
				await pb
					.collection('sessions')
					.getFirstListItem(`tutor="${tutorChad.id}" && datetime="${dateTime}"`);
				toast.error('This session already exists');
			} else {
				toast.error('Please fill all fields out');
			}
		} catch {
			await pb.collection('sessions').create(data);
			toast.success('Session scheduled!');
		}
	}

	const isDateUnavailable: BitsUICalendar.Props['isDateUnavailable'] = (date) => {
		const day = dayjs(date.toString());
		return day.isBefore(dayjs()) || day.day() === 0 || day.day() === 6;
	};
</script>

<PageFormat title="Scheduling Page" description="Schedule your next opening!">
	<div class="overflow-hidden rounded-md md:border md:p-6">
		<div class="flex w-full flex-col gap-5 md:flex-row">
			<Calendar
				bind:value
				class="mx-auto w-fit rounded-md border shadow-sm md:mx-0"
				{isDateUnavailable}
			/>

			<div class="flex w-full flex-col gap-5">
				<div class="box w-full">
					<div class="box-header">Date Selected</div>
					<div class="box-content font-bold">
						{#if value}
							{dayjs(dayjs(value.toString()).add(8, 'h')).format('dddd, MMMM D')}
						{:else}
							Not selected
						{/if}
					</div>
				</div>
				<div class="box">
					<div class="box-header">Time</div>
					<div class="box-content">
						<TimeSelector bind:selectedTime />
					</div>
				</div>
				<!-- <div class="box">
						<div class="box-header">Location</div>
						<div class="box-content">
							<Input bind:value={selectedLocation} type="text" placeholder="Ex: Library" class="" />
						</div>
					</div> -->
				<button
					on:click={() => {
						createRecord();
					}}
					class="flex w-full items-center justify-center gap-3 rounded-md bg-[#959CFF] p-4 px-6 text-xl text-white shadow-md transition duration-300 ease-out hover:-translate-y-1 hover:bg-[#7f7fec] hover:shadow-lg"
				>
					<Check />
					Confirm Availability
				</button>
			</div>
		</div>
	</div>
</PageFormat>

<!-- <div class="w-full border-black p-4">
	<div class="border shadow-sm">
		<div class="flex justify-evenly">
			<button
				on:click={() => {
					focus = 0;
				}}
				class="w-72 rounded-md bg-black p-2 text-center text-xl  text-white"
				>Single Date</button
			>
			<button
				on:click={() => {
					focus = 1;
				}}
				class="w-72 rounded-md bg-black p-2 text-center text-xl  text-white"
				>Multiple Dates</button
			>
		</div>
	</div>
</div> -->

<!-- <div class="grid flex-1 grid-cols-2 grid-rows-2 gap-8">
    <div class="flex flex-grow flex-col">
      <div class="grid place-items-center rounded-t-md border shadow-sm border-b-0 py-2 text-xl">
        Start Date:
      </div>
      <div class="grid h-[100px] place-items-center rounded-b-md border shadow-sm text-2xl ">
        {#if value.start}
          {value.start}
        {:else}
          Unselected
        {/if}
      </div>
    </div>
    <div class="flex flex-grow flex-col">
      <div class="grid place-items-center rounded-t-md border shadow-sm border-b-0 py-2 text-xl">
        End Date:
      </div>
      <div class="grid h-[100px] place-items-center rounded-b-md border shadow-sm text-2xl ">
        {#if value.end}
          {value.end}
        {:else}
          Unselected
        {/if}
      </div>
    </div>
    <div class="flex flex-grow flex-col">
      <div class="grid place-items-center rounded-t-md border shadow-sm border-b-0 py-2 text-xl">
        Subject
      </div>
      <div class="grid h-[100px] place-items-center rounded-b-md border shadow-sm text-2xl ">
        combobox here
      </div>
    </div>
    <button
      on:click={() => {
        console.log('clicked!');
      }}
      class=" transition-color grid place-items-center rounded-md bg-[#959CFF] text-center text-4xl  text-white duration-500 hover:bg-[#7f7fec]"
    >
      Schedule Availability
    </button>
  </div> -->

<style>
	.box {
		@apply flex-1 flex-col rounded-md border shadow-sm;
	}

	.box-header {
		@apply border-b px-5 pb-2 pt-3 text-center;
	}

	.box-content {
		@apply grid place-items-center p-10;
	}
</style>
