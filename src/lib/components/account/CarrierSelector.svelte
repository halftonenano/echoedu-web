<script lang="ts">
	import { Check, ChevronsUpDown, X } from 'lucide-svelte';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { onMount, tick } from 'svelte';
	import { PhonesCarrierOptions, type PhonesRecord } from '$lib/types/db';

	const options: { label: string; value: PhonesCarrierOptions }[] = [
		{ label: 'AT&T', value: PhonesCarrierOptions.att },
		{ label: 'Google Fi', value: PhonesCarrierOptions.googlefi },
		{ label: 'T-Mobile', value: PhonesCarrierOptions.tmobile },
		{ label: 'XFinity Mobile', value: PhonesCarrierOptions.xfinity },
		{ label: 'Verizon', value: PhonesCarrierOptions.verizon },
		{ label: 'Mint Mobile', value: PhonesCarrierOptions.mint },
		{ label: 'Alltel', value: PhonesCarrierOptions.alltel },
		{ label: 'Boost Mobile', value: PhonesCarrierOptions.boost },
		{ label: 'Consumer Cellular', value: PhonesCarrierOptions.consumer },
		{ label: 'Cricket Wireless', value: PhonesCarrierOptions.cricket },
		{ label: 'MetroPCS', value: PhonesCarrierOptions.metropcs },
		{ label: 'Republic Wirelesss', value: PhonesCarrierOptions.republic },
		{ label: 'Sprint', value: PhonesCarrierOptions.sprint },
		{ label: 'Ting', value: PhonesCarrierOptions.ting },
		{ label: 'U.S. Cellullar', value: PhonesCarrierOptions.uscellular }
	];

	let open = false;
	export let selectedCarrierId = '';

	let selectedValue = 'Select Carrier';
	$: {
		const selected = options.find((t) => t.value === selectedCarrierId);
		selectedValue = selected?.label || 'Select Carrier';
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
			<Command.Input placeholder="Search courses" />
			<Command.Empty>Carrier not found.</Command.Empty>
			<Command.Group>
				<Command.Item
					value=""
					onSelect={(currentValue) => {
						selectedCarrierId = currentValue;
						closeAndFocusTrigger(ids.trigger);
					}}
				>
					<X class={cn('mr-2 h-4 w-4')} />
					Clear
				</Command.Item>
				<Command.Separator class="my-1" />
				<div class="max-h-56 overflow-y-scroll">
					{#each options as carrier}
						<Command.Item
							value={carrier.value}
							onSelect={(currentValue) => {
								selectedCarrierId = currentValue;
								closeAndFocusTrigger(ids.trigger);
							}}
						>
							<Check
								class={cn(
									'mr-2 h-4 w-4',
									selectedCarrierId !== carrier.value && 'text-transparent'
								)}
							/>
							{carrier.label}
						</Command.Item>
					{/each}
				</div>
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
