<script lang="ts">
	import { PinInput } from 'bits-ui';

	let value: string[] = [];
</script>

<PinInput.Root bind:value class="mx-auto flex items-center gap-2" placeholder="0">
	<PinInput.Input
		class="h-input rounded-input font-alt placeholder-shown:border-border-input focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover flex w-10 select-none rounded-md border bg-background px-2 py-3 text-center text-[17px] tracking-[0.01em] text-foreground"
	/>
	<PinInput.Input
		class="h-input rounded-input font-alt placeholder-shown:border-border-input focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover flex w-10 select-none rounded-md border bg-background px-2 py-3 text-center text-[17px] tracking-[0.01em] text-foreground"
	/>
	<PinInput.Input
		class="h-input rounded-input font-alt placeholder-shown:border-border-input focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover flex w-10 select-none rounded-md border bg-background px-2 py-3 text-center text-[17px] tracking-[0.01em] text-foreground"
	/>
	<PinInput.Input
		class="h-input rounded-input font-alt placeholder-shown:border-border-input focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover flex w-10 select-none rounded-md border bg-background px-2 py-3 text-center text-[17px] tracking-[0.01em] text-foreground"
	/>
	<PinInput.HiddenInput />
</PinInput.Root>
