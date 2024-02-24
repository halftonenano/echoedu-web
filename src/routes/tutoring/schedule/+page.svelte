<script lang="ts">
	import PageFormat from '$lib/components/PageFormat.svelte';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { pb } from '$lib/pocketbase';
	import TimeSelector from '$lib/tutoring/TimeSelector.svelte';
	import { getLocalTimeZone, today } from '@internationalized/date';
	import dayjs from 'dayjs';
	import { tick } from 'svelte';
	import toast from 'svelte-french-toast';

	const start = today(getLocalTimeZone());
	const end = start.add({ days: 7 });

	let value = today(getLocalTimeZone());

	console.log('VALUE:');
	console.log(value.day);
	const times = [
		{
			value: 'tutorial',
			label: 'During Tutorial'
		},
		{
			value: 'seventh',
			label: 'During 7th Period'
		},
		{
			value: 'afterschool',
			label: 'After 7th Period'
		}
	];

	let open = false;
	let value1 = '';
	$: selectedValue = times.find((f) => f.value === value1)?.label ?? 'Select a framework...';
	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	let selectedTime = '';
	let selectedLocation = '';
	let realTime = '';
	// example create data

	async function createRecord() {
		console.log(selectedTime);
		if (selectedTime == 'During Tutorial') {
			realTime = '18:05:00';
		} else if (selectedTime == 'During 7th Period') {
			realTime = '22:25:00';
		} else if (selectedTime) {
			realTime = '23:30:00';
		}
		// console.log(selectedLocation)
		let dateTime = dayjs(dayjs(value).add(8, 'h')).format('YYYY-MM-D') + ' ' + realTime + '.123Z';

		const tutorChad = await pb
			.collection('tutors')
			.getFirstListItem(`name="${pb.authStore.model?.name}"`);
		console.log(tutorChad.id);
		const data = {
			tutor: tutorChad.id,
			datetime: dateTime,
			location: selectedLocation
		};
		try {
			await pb
				.collection('sessions')
				.getFirstListItem(`tutor="${tutorChad.id}" && datetime="${dateTime}"`);
			toast.error('This session already exists');
		} catch {
			const record = await pb.collection('sessions').create(data);
			console.log(record);
			toast.success('Session scheduled!');
		}
		console.log(pb.authStore.model?.id);
	}
</script>

<PageFormat title="Scheduling Page" description="Schedule your next opening!">
	<div class="overflow-hidden rounded-md border p-2 sm:p-4 md:p-6 lg:p-8 xl:p-8">
		<div class="mx-auto flex w-full flex-col gap-8">
			<div class="flex w-full flex-col gap-5 sm:flex-col md:flex-col lg:flex-row">
				<div
					class="lg:place-items-auto grid h-fit w-full place-items-center lg:grid lg:h-auto lg:w-auto"
				>
					<Calendar
						bind:value
						class=" w-fit scale-[.9] rounded-md border shadow-sm sm:scale-90 md:scale-95 lg:scale-100 xl:scale-100"
					/>
				</div>

				<div class="flex w-full flex-wrap gap-5">
					<div class="box">
						<div class="box-header">Date Selected</div>
						<div class="box-content font-bold">
							{#if value}
								{dayjs(dayjs(value).add(8, 'h')).format('dddd, MMMM D')}
								<!-- {dayjs(value).format('YYYY-MM-D')} -->
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
					<div class="box">
						<div class="box-header">Location</div>
						<div class="box-content">
							<Input bind:value={selectedLocation} type="text" placeholder="Library" class="" />
						</div>
					</div>
					<button
						on:click={() => {
							createRecord();
						}}
						class="flex w-[48%] flex-1 flex-col place-items-center justify-evenly rounded-md bg-[#959CFF] p-4 px-6 text-3xl font-bold text-white shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:bg-[#7f7fec] hover:shadow-lg"
					>
						<div>Schedule Availability</div>
						<div class="flex place-items-center gap-4 text-xl">
							<span class="">Date:</span>
							{#if value}
								{value}
							{:else}
								Unselected
							{/if}
						</div>
						<div class="flex place-items-center gap-4 text-xl">
							<span class="">Time:</span>
							{#if selectedTime}
								{selectedTime}
							{:else}
								Unselected
							{/if}
						</div>
						<div class="flex place-items-center gap-4 text-xl">
							<span class="">Location:</span>
							{#if selectedLocation}
								{selectedLocation}
							{:else}
								Unselected
							{/if}
						</div>
					</button>
				</div>
			</div>
			<!-- <button
				on:click={() => {
					createRecord();
				}}
				class="flex place-items-center justify-evenly rounded-md bg-[#959CFF] p-4 px-6 text-center text-4xl font-bold text-white shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:bg-[#7f7fec] hover:shadow-lg"
			>
				<div>Schedule Availability</div>
				<div class="text-lg">
					<span class="text-3xl">Date:</span><br />
					{#if value}
						{value}
					{:else}
						Unselected
					{/if}
				</div>
				<div class="text-lg">
					<span class="text-3xl">Time:</span><br />
					{#if selectedTime}
						{selectedTime}
					{:else}
						Unselected
					{/if}
				</div>
				<div class="text-lg">
					<span class="text-3xl">Location:</span> <br />
					{#if selectedLocation}
						{selectedLocation}
					{:else}
						Unselected
					{/if}
				</div>
			</button> -->
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
		@apply flex w-[48%] min-w-[48%] flex-1 flex-col rounded-md border shadow-sm;
	}

	.box-header {
		@apply border-b px-5 pb-2 pt-3 text-center;
	}

	.box-content {
		@apply grid place-items-center p-10;
	}
</style>
