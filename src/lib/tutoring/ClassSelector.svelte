<script lang="ts">
	import { Check, ChevronsUpDown, X } from 'lucide-svelte';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';

	export let selectedClass = '';

	const options = [
    {
      value: "english3",
      label: "English 3"
    },
    {
      value: "aplang",
      label: "AP Lang"
    },
    {
      value: "english2honors",
      label: "English 2 Honors"
    }
  ];

	let open = false;
	let value = '';

	let selectedValue = 'Select a Course';
	$: {
		const selected = options.find((t) => t.value === value);
		selectedValue = selected?.label || 'Select a Subject';
		selectedClass = selectedValue;
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
			class="w-[20rem] justify-between shadow-sm  text-xl"
		>
			{selectedValue}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="mt-2 w-[20rem] p-0">
		<Command.Root>
			<Command.Group>
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
