<script lang="ts">
	import CourseSelector from '$lib/components/booking/courses/CourseSelector.svelte';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import ClassSelector from '$lib/tutoring/ClassSelector.svelte';
	import TimeSelector from '$lib/tutoring/TimeSelector.svelte';
	import { getLocalTimeZone, today } from '@internationalized/date';
	import dayjs from 'dayjs';
	import { pb } from '$lib/pocketbase';
	import { tick } from 'svelte';

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
		let dateTime = dayjs(dayjs(value).add(8, "h")).format('YYYY-MM-D') + ' ' + realTime + '.123Z';

		const tutorChad = await pb
			.collection('tutors')
			.getFirstListItem(`name="${pb.authStore.model?.name}"`);
		console.log(tutorChad.id);
		const data = {
			tutor: tutorChad.id,
			datetime: dateTime,
			location: selectedLocation
		};

		console.log(pb.authStore.model?.id);
		const record = await pb.collection('sessions').create(data);
		console.log(record);
	}
</script>

<div class="">
	<div class="absolute -top-[20vh] h-[80vh] w-full skew-y-[-8deg] bg-[#959CFF]"></div>

	<div class="relative p-6 md:p-10">
		<div class="mx-auto mt-[20vh] w-full max-w-7xl text-[#383838]">
			<class class="-ml-[4px] text-6xl font-bold">Scheduling Page</class>
			<p class="-ml-[2px] mb-3 mt-1 text-2xl">Schedule your next opening!</p>
			<div class="rounded-lg border bg-white p-5 shadow-lg">
				<div class="overflow-hidden rounded-md border p-2 sm:p-4 md:p-6 lg:p-8 xl:p-8">
					<div class="flex w-full flex-col gap-8 mx-auto">
						<div class="flex-col sm:flex-col md:flex-col lg:flex-row flex w-full gap-5">
							<div class="w-full h-fit grid place-items-center lg:w-auto lg:h-auto lg:grid lg:place-items-auto">
								<Calendar bind:value class=" w-fit rounded-md border shadow-sm scale-[.9] sm:scale-90 md:scale-95 lg:scale-100 xl:scale-100" />
							</div>

							<div class="flex w-full flex-wrap gap-5">
								<div class="box">
									<div class="box-header">Date Selected</div>
									<div class="box-content font-bold">
										{#if value}
											{dayjs(dayjs(value).add(8, "h")).format('dddd, MMMM D')}
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
										<Input
											bind:value={selectedLocation}
											type="text"
											placeholder="Library"
											class=""
										/>
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
			</div>
		</div>
	</div>
</div>

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
		@apply flex w-[48%] flex-col rounded-md border shadow-sm flex-1 min-w-[48%];
	}

	.box-header {
		@apply border-b px-5 pb-2 pt-3 text-center;
	}

	.box-content {
		@apply grid place-items-center p-10;
	}
</style>
