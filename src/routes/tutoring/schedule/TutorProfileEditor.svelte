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

		console.log('TUTORCHAD');

		// for (const classId of tutorChad.classes){
		// 	const thingy = await pb.collection('classes').getOne(classId);
		// 	console.log(thingy)
		// 	selectedCourses.push(thingy.teacherName+", "+thingy.courseName+", "+classId)
		// }

		// console.log(tutorChad.classes);

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
		console.log(selectedCourses[0].split(', ')[2]);
	}

	async function update() {
		// user = @request.auth.id && @request.data.name:isset = false
		// pb.authStore.model?.name
		console.log('kachow');
		const tutorChad = await pb
			.collection('tutors')
			.getFirstListItem(`name="${pb.authStore.model?.name}"`);
		console.log(tutorChad.id);
		const record = await pb.collection('tutors').update(`${tutorChad.id}`, {
			classes: selectedCourses.map((course) => course.split(', ')[2])
		});
	}

	console.log(pb.authStore.model);
</script>

<div class="flex flex-col">
	<div class="flex justify-between pl-2">
		<div class="flex flex-col">
			<div class="font-bold">Name</div>
			<div>{pb.authStore.model?.name}</div>
		</div>
		<!-- <div class="flex flex-col">
			<div class="font-bold">Grade</div>
			<div>{pb.authStore.model?.Grade}</div>
		</div> -->
		<Button on:click={() => update()}>Update</Button>
	</div>

	<div class="col-span-2 mx-auto mt-4 flex h-96 w-full rounded-md border text-2xl md:mb-0 md:h-48">
		<div class="flex h-full w-48 flex-col justify-around border-r p-4 font-bold">
			<div class="grid place-items-center">Courses:</div>
			<div class="grid place-items-center">Selected:</div>
		</div>
		<div class="flex flex-1 flex-col justify-around p-4">
			<div class="flex w-full place-items-start">
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
				<div class="ml-12 grid h-full place-items-center text-base italic text-red-500">
					Do not select classes you are CURRENTLY taking.
				</div>
			</div>

			<ul class="min-h-16 mb-20 flex h-6 w-full flex-wrap gap-2 md:mb-0 md:gap-4">
				{#each selectedCourses as courseValue}
					<li>
						<TeacherBadge name={courseValue.split(', ')[0]} course={courseValue.split(', ')[1]} />
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
