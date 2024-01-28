<script lang="ts">
	import { Check, ChevronsUpDown, X } from 'lucide-svelte';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import { teachers } from './teachersStore';

	export let selectedTeacherId = '';

	$: options = $teachers.map((teacher) => ({
		value: teacher.name,
		label: teacher.display,
		record: teacher
	}));

	let open = false;
	let value = '';

	let selectedValue = 'Select Teacher';
	$: {
		const selected = options.find((t) => t.value === value);
		selectedValue = selected?.label || 'Select Teacher';
		selectedTeacherId = selected?.record.id || '';
	}

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-[20rem] justify-between shadow-sm"
		>
			{selectedValue}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="mt-2 w-[20rem] p-0">
		<Command.Root>
			<Command.Input placeholder="Search teachers" />
			<Command.Empty>Teacher not found.</Command.Empty>
			<Command.Group>
				<Command.Item
					value=""
					onSelect={(currentValue) => {
						value = currentValue;
						closeAndFocusTrigger(ids.trigger);
					}}
				>
					<X class={cn('mr-2 h-4 w-4')} />
					Clear
				</Command.Item>
				<Command.Separator class="my-1" />
				{#each options as framework}
					<Command.Item
						value={framework.value}
						onSelect={(currentValue) => {
							value = currentValue;
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						<Check class={cn('mr-2 h-4 w-4', value !== framework.value && 'text-transparent')} />
						{framework.label}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
