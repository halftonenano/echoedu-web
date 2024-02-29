<script lang="ts">
	import TeacherBadge from '$lib/components/booking/teachers/TeacherBadge.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { pb, user } from '$lib/pocketbase';
	import { cn } from '$lib/utils';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { onMount, tick } from 'svelte';

	let courses: { teacher: string; course: string; id: string }[] = [];

	let open = false;
	let selectedCourses: string[] = [];

	onMount(async () => {
		const records = await pb.collection('classes').getFullList({
			sort: '-created'
		});

		for (const record of records) {
			courses.push({ teacher: record.teacherName, course: record.courseName, id: record.id });
		}

		courses = courses;

		const tutorChad = await pb.collection('tutors').getFirstListItem(`user="${$user?.id}"`);

		const coursesStrings = courses.map(
			(course) => `${course.teacher}, ${course.course}, ${course.id}`
		);
		for (const previouslySelected of tutorChad.classes) {
			for (const courseString of coursesStrings) {
				if (courseString.includes(previouslySelected)) {
					selectedCourses.push(courseString);
				}
			}
		}

		selectedCourses = selectedCourses;
	});

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	function toggleCourse(courseValue: any) {
		if (selectedCourses.includes(courseValue)) {
			selectedCourses = selectedCourses.filter((c) => c !== courseValue);
		} else if (selectedCourses.length < 4) {
			selectedCourses = [...selectedCourses, courseValue];
		}
	}

	async function update() {
		const tutorChad = await pb
			.collection('tutors')
			.getFirstListItem(`name="${pb.authStore.model?.name}"`);
		const record = await pb.collection('tutors').update(`${tutorChad.id}`, {
			classes: selectedCourses.map((course) => course.split(', ')[2])
		});
	}
</script>

<div class="flex flex-col">
	<div class="flex justify-between pl-2">
		<div class="flex flex-col">
			<div class="font-bold">Name</div>
			<div>{pb.authStore.model?.name}</div>
		</div>
		<Button on:click={() => update()}>Update</Button>
	</div>

	<div class="mt-4 w-full rounded-md border p-5">
		<div class="mb-3 flex flex-col gap-2 md:mb-2 md:flex-row md:items-center">
			<b>Courses</b>
			<span class="text-sm italic text-red-500">
				Do not select classes you are CURRENTLY taking.
			</span>
		</div>
		<Popover.Root bind:open let:ids>
			<Popover.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="outline"
					role="combobox"
					aria-expanded={open}
					class="w-[90%] justify-between md:w-[300px]"
				>
					Select Courses
					<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</Popover.Trigger>

			<Popover.Content class="mt-2 w-[90%] p-0 md:w-[300px]">
				<Command.Root>
					<Command.Input placeholder="Search course..." />
					<Command.Empty>No class found.</Command.Empty>
					<Command.Group class="max-h-56 overflow-y-scroll">
						{#each courses as course}
							<Command.Item
								value={`${course.teacher}, ${course.course}, ${course.id}`}
								onSelect={(currentValue) => {
									toggleCourse(currentValue);
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								<Check
									class={cn(
										'mr-2 h-4 w-4',
										!selectedCourses.includes(
											`${course.teacher}, ${course.course}, ${course.id}`
										) && 'text-transparent'
									)}
								/>
								{course.teacher + ', ' + course.course}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>

		<hr class="my-5" />

		<ul class="flex w-full flex-wrap gap-2 md:gap-4">
			{#each selectedCourses as courseValue}
				<li>
					<TeacherBadge name={courseValue.split(', ')[0]} course={courseValue.split(', ')[1]} />
				</li>
			{/each}
		</ul>
	</div>
</div>
