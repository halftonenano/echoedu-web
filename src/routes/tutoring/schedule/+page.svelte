<script lang="ts">
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
  import TimeSelector from "$lib/tutoring/TimeSelector.svelte";
  import ClassSelector from "$lib/tutoring/ClassSelector.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import { tick } from "svelte";
  import PocketBase from 'pocketbase';



  const start = today(getLocalTimeZone());
  const end = start.add({ days: 7 });
  // let value = {
  //   start,
  //   end
  // };

  let value = today(getLocalTimeZone());

    

  const times = [
    {
      value: "tutorial",
      label: "During Tutorial"
    },
    {
      value: "seventh",
      label: "During 7th Period"
    },
    {
      value: "afterschool",
      label: "After 7th Period"
    }
  ];

  let open = false;
  let value1 = "";
  $: selectedValue =
    times.find((f) => f.value === value1)?.label ?? "Select a framework...";
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
  let selectedClass = '';

  import { onMount } from "svelte";

  const pb = new PocketBase('https://api.echo-edu.org');

  // example create data
  const data = {
    "tutor": "ef3oknc889lxz34",
    "datetime": "2025-01-01 10:00:00.123Z",
    "tutee": "",
    "location": "Library"
  };

  async function createRecord() {
    const record = await pb.collection('sessions').create(data);
    console.log(record);
  }

  // Run createRecord when the component is mounted
  onMount(() => {
    createRecord();
  });

  

</script>

<div class="">
	<div class="absolute -top-[20vh] h-[80vh] w-full skew-y-[-8deg] bg-[#959CFF]"></div>

	<div class="relative p-10">
		<div class="mx-auto mt-[20vh] w-full max-w-7xl text-[#383838]">
			<class class="-ml-[4px] text-6xl font-bold">Scheduling Page</class>
			<p class="-ml-[2px] mb-3 mt-1 text-2xl">Schedule your next opening!</p>
			<div class="rounded-lg border bg-white p-5 shadow-lg">
				<div class="min-h-[60vh] overflow-hidden rounded-md border p-5">
          <div class="flex flex-col w-full p-2 gap-8">
            <div class="flex w-full gap-16">
              <Calendar bind:value class="rounded-md border" />
              <div class="grid flex-1 grid-cols-2 grid-rows-2 gap-8">
                <div class="flex flex-grow flex-col">
                  <div class="grid place-items-center rounded-t-md border-2 border-b-0 py-2 text-xl">
                    Date Selected:
                  </div>
                  <div class="grid h-[100px] place-items-center rounded-b-md border-2 text-2xl ">
                    {#if value}
                      {value}
                    {:else}
                      Unselected
                    {/if}
                  </div>
                </div>
                <div class="flex flex-grow flex-col">
                  <div class="grid place-items-center rounded-t-md border-2 border-b-0 py-2 text-xl">
                    Time
                  </div>
                  <div class="grid h-[100px] place-items-center rounded-b-md border-2 text-2xl ">
                    <TimeSelector bind:selectedTime/>
                  </div>
                </div>
                <div class="flex flex-grow flex-col">
                  <div class="grid place-items-center rounded-t-md border-2 border-b-0 py-2 text-xl">
                    Subject
                  </div>
                  <div class="grid h-[100px] place-items-center rounded-b-md border-2 text-2xl ">
                    <ClassSelector bind:selectedClass/>
                  </div>
                </div>
                <div class="flex flex-grow flex-col">
                  <div class="grid place-items-center rounded-t-md border-2 border-b-0 py-2 text-xl">
                    Location
                  </div>
                  <div class="grid h-[100px] place-items-center rounded-b-md border-2">        
                    <Input bind:value={selectedLocation} type="text" placeholder="Library" class="max-w-xs text-xl"/>
                  </div>
                </div>
              </div>
            </div>
            <button
              on:click={() => {
                createRecord();
              }}
              class="flex justify-evenly transition-color place-items-center rounded-md bg-[#959CFF] text-center text-4xl  text-white duration-500 hover:bg-[#7f7fec] font-bold p-4 px-6"
            >
              <div>
                Schedule Availability
              </div>
              <div class="text-lg">
                <span class="text-3xl">Date:</span><br/>
                {#if value}
                  {value}
                {:else}
                  Unselected
                {/if}
              </div>
              <div class="text-lg">
                <span class="text-3xl">Time:</span><br/>
                {#if selectedTime}
                  {selectedTime}
                {:else}
                  Unselected
                {/if}
              </div>
              <div class="text-lg">
                <span class="text-3xl">Subject:</span><br/>
                {#if selectedClass}
                  {selectedClass}
                {:else}
                  Unselected
                {/if}
              </div>
              <div class="text-lg">
                <span class="text-3xl">Location:</span> <br/>
                {#if selectedLocation}
                  {selectedLocation}
                {:else}
                  Unselected
                {/if}
              </div>
          
            </button>
          </div>

        </div>
			</div>
		</div>
	</div>
</div>






<!-- <div class="w-full border-black p-4">
	<div class="border-2">
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
      <div class="grid place-items-center rounded-t-md border-2 border-b-0 py-2 text-xl">
        Start Date:
      </div>
      <div class="grid h-[100px] place-items-center rounded-b-md border-2 text-2xl ">
        {#if value.start}
          {value.start}
        {:else}
          Unselected
        {/if}
      </div>
    </div>
    <div class="flex flex-grow flex-col">
      <div class="grid place-items-center rounded-t-md border-2 border-b-0 py-2 text-xl">
        End Date:
      </div>
      <div class="grid h-[100px] place-items-center rounded-b-md border-2 text-2xl ">
        {#if value.end}
          {value.end}
        {:else}
          Unselected
        {/if}
      </div>
    </div>
    <div class="flex flex-grow flex-col">
      <div class="grid place-items-center rounded-t-md border-2 border-b-0 py-2 text-xl">
        Subject
      </div>
      <div class="grid h-[100px] place-items-center rounded-b-md border-2 text-2xl ">
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



