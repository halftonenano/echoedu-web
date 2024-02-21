<script lang="ts">
	import { Button } from '../ui/button';
	import { Input } from '../ui/input';
	import CarrierSelector from './CarrierSelector.svelte';
	import ConfirmationCodeInput from './ConfirmationCodeInput.svelte';
	import * as Card from '../ui/card';
	import { Loader2 } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { pb, user } from '$lib/pocketbase';
	import toast from 'svelte-french-toast';

	let recordid = '';
	let number: number | undefined;
	let selectedCarrierId = '';

	let loading = true;

	onMount(async () => {
		let phone = await pb
			.collection('phones')
			.getFirstListItem(`user = "${$user?.id}"`)
			.catch(() => {});
		if (phone) {
			recordid = phone.id;
			number = phone.number;
			selectedCarrierId = phone.carrier;
		}

		loading = false;
	});
</script>

<div class="flex flex-col gap-3">
	<Card.Root>
		<Card.Header>
			<Card.Title>Link your phone number</Card.Title>
			<Card.Description>So we can send you reminders</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-3">
			<Input
				type="number"
				bind:value={number}
				disabled={loading}
				placeholder="(000) 000 0000"
				min={1000000000}
				max={9999999999}
			/>
			<div class={cn(loading && 'pointer-events-none opacity-50')}>
				<CarrierSelector bind:selectedCarrierId />
			</div>
			<Button
				class="flex w-full items-center justify-center gap-2"
				on:click={async () => {
					loading = true;

					if (!number) {
						loading = false;
						return toast.error('Please enter a number');
					}
					if (selectedCarrierId === '') {
						loading = false;
						return toast.error('Please select a carrier');
					}

					if (recordid) {
						await pb.collection('phones').update(recordid, { number, carrier: selectedCarrierId });
						toast.success('Saved phone number');
					} else {
						const phone = await pb
							.collection('phones')
							.create({ number, carrier: selectedCarrierId });
						recordid = phone.id;
						toast.success('Saved phone number');
					}
					loading = false;
				}}
				disabled={loading}
			>
				{#if loading}
					<Loader2 class="h-5 animate-spin" />
				{:else}
					Save
				{/if}
			</Button>
		</Card.Content>
	</Card.Root>
</div>
