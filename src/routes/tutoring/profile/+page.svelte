<script lang="ts">
	import BackgroundSlant from '$lib/components/BackgroundSlant.svelte';
	import { Button } from '$lib/components/ui/button';
	import TeacherBadge from '$lib/components/booking/teachers/TeacherBadge.svelte';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import { cn } from '$lib/utils';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { tick } from 'svelte';

	let courses: any = [];

	onMount(async () => {
		const records = await pb.collection('classes').getFullList({
			sort: '-created'
		});

		for (let i = 0; i < records.length; i++) {
			courses = [
				...courses,
				{ teacher: records[i].teacherName, course: records[i].courseName, id: records[i].id }
			];
			// courses.push()
		}
		console.log(records);
		console.log(courses);
	});

	let open = false;
	let selectedCourses: string[] = [];

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
		const data = {
			user: pb.authStore.model?.id,
			name: pb.authStore.model?.name,
			grade: pb.authStore.model?.grade,
			classes: selectedCourses.map((course) => course.split(', ')[2])
		};
		// user = @request.auth.id && @request.data.name:isset = false
		// pb.authStore.model?.name
		console.log('kachow');
		const tutorChad = await pb
			.collection('tutors')
			.getFirstListItem(`name="${pb.authStore.model?.name}"`);
		console.log(tutorChad.id);
		const record = await pb.collection('tutors').update(`${tutorChad.id}`, data);
	}

	console.log(pb.authStore.model);
</script>

<body class="hideScroll" id="ScrollingBlock">
	<BackgroundSlant />

	<div class="relative p-10">
		<div class="mx-auto mt-[20vh] w-full max-w-7xl text-[#383838]">
			<class class="-ml-[4px] text-6xl font-bold">Tutor Page</class>
			<p class="-ml-[2px] mb-3 mt-1 text-2xl">Set up your tutoring profile</p>

			<div class="rounded-lg border bg-white p-5 shadow-lg">
				<div class="flex flex-col">
					<div class="flex justify-between pl-2">
						<div class="flex flex-col">
							<div class="font-bold">Name</div>
							<div>{pb.authStore.model?.name}</div>
						</div>
						<Button on:click={() => update()}>Update</Button>
					</div>

					<div class="col-span-2 mx-auto mt-4 flex h-48 w-full rounded-md border text-2xl">
						<div class="flex h-full w-48 flex-col justify-around border-r p-4 font-bold">
							<div class="grid place-items-center">Courses:</div>
							<div class="grid place-items-center">Selected:</div>
						</div>
						<div class="flex flex-1 flex-col justify-around p-4">
							<div class="grid w-full place-items-start">
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
														{course.teacher + ', ' + course.course + ', ' + course.id}
													</Command.Item>
												{/each}
											</Command.Group>
										</Command.Root>
									</Popover.Content>
								</Popover.Root>
							</div>

							<ul class="min-h-16 flex h-6 w-full flex-wrap gap-4">
								{#each selectedCourses as courseValue}
									<li>
										<TeacherBadge
											name={courseValue.split(', ')[0]}
											course={courseValue.split(', ')[1]}
										/>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>

<style>
	/* body.hideScroll {
    overflow: hidden;
  } */
</style>
