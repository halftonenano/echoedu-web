<script lang="ts">
  import { Check, ChevronsUpDown } from "lucide-svelte";
  import * as Command from "$lib/components/ui/command";
  import * as Popover from "$lib/components/ui/popover";
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { tick } from "svelte";

  const courses = [
    {
      value: "english3",
      label: "English 3"
    },
    {
      value: "next.js",
      label: "Next.js"
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js"
    },
    {
      value: "remix",
      label: "Remix"
    },
    {
      value: "astro",
      label: "Astro"
    }
  ];

  let open = false;
  let selectedCourses: string[] = [];

  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }

  function toggleCourse(courseValue: string) {
    if (selectedCourses.includes(courseValue)) {
      selectedCourses = selectedCourses.filter((c) => c !== courseValue);
    } else {
      selectedCourses = [...selectedCourses, courseValue];
    }
  }
</script>


<div class="">
	<div class="absolute -top-[20vh] h-[80vh] w-full skew-y-[-8deg] bg-[#959CFF]"></div>

	<div class="relative p-10">
		<div class="mx-auto mt-[20vh] w-full max-w-7xl text-[#383838]">
			<class class="-ml-[4px] text-6xl font-bold">Tutor Page</class>
			<p class="-ml-[2px] mb-3 mt-1 text-2xl">Set up your tutoring profile</p>
			<div class="rounded-lg border bg-white p-5 shadow-lg">
				<div class="min-h-[60vh] overflow-hidden rounded-md border p-5">

          <div
            class="grid grid-cols-2 gap-10 "
          >
            <div class="w-full text-2xl mx-auto border-2 h-fit border-black rounded-md flex">
              <div class="w-48 border-r-2 font-bold border-black h-full p-4">
                <div class="grid place-items-center">
                  First Name:
                </div>
              </div>
              <div class="flex-1 p-4">
                <div class="grid place-items-center">
                  Alexander
                </div>
              </div>
            </div>
            <div class="w-full text-2xl mx-auto border-2 h-fit border-black rounded-md flex">
              <div class="w-48 border-r-2 font-bold border-black h-full p-4">
                <div class="grid place-items-center">
                  Last Name:
                </div>
              </div>
              <div class="flex-1 p-4">
                <div class="grid place-items-center">
                  Bonev
                </div>
              </div>
            </div>
  
            <div class="w-full text-2xl mx-auto col-span-2 border-2 h-fit border-black rounded-md flex">
              <div class="w-48 border-r-2 font-bold border-black h-full p-4">
                <div class="grid place-items-center">
                  Courses:
                </div>
              </div>
              <div class="flex-1 p-4">
                <div class="grid place-items-start">
          
                  <Popover.Root bind:open let:ids>
                    <Popover.Trigger asChild let:builder>
                      <Button
                        builders={[builder]}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        class="w-[300px] justify-between"
                      >
                        Select Courses
                        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </Popover.Trigger>
          
                    <Popover.Content class="w-[300px] p-0">
                      <Command.Root>
                        <Command.Input placeholder="Search course..." />
                        <Command.Empty>No class found.</Command.Empty>
                        <Command.Group>
                          {#each courses as course}
                            <Command.Item
                              value={course.value}
                              onSelect={(currentValue) => {
                                toggleCourse(currentValue);
                                closeAndFocusTrigger(ids.trigger);
                              }}
                            >
                              <Check
                                class={cn(
                                  "mr-2 h-4 w-4",
                                  selectedCourses.includes(course.value) && "text-transparent"
                                )}
                              />
                              {course.label}
                            </Command.Item>
                          {/each}
                        </Command.Group>
                      </Command.Root>
                    </Popover.Content>
                  </Popover.Root>
          
                  <!-- Display selected courses list -->
                  <div class="mt-4">
                    <p class="text-lg font-bold">Selected Courses:</p>
                    <ul>
                      {#each selectedCourses as courseValue}
                        <li>{courses.find((c) => c.value === courseValue)?.label}</li>
                      {/each}
                    </ul>
                  </div>
          
                </div>
              </div>
            </div>
          </div>
        </div>
			</div>
		</div>
	</div>
</div>
