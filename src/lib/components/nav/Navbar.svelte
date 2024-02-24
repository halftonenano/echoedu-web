<script lang="ts">
	import { page } from '$app/stores';
	import { pb, user } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	import { fly, scale } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	import './hamburgers.css';
	import { cn } from '$lib/utils';
	import { onNavigate } from '$app/navigation';

	let isTutor = false;

	onMount(async () => {
		try {
			await pb.collection('tutors').getFirstListItem(`user="${pb.authStore.model?.id}"`);
			isTutor = true;
		} catch {}
	});

	onNavigate(() => {
		open = false;
	});

	export let open = false;
</script>

<div class={cn('fixed top-0 z-[99] w-full')}>
	<div class="flex items-center">
		<button
			class={cn('hamburger hamburger--spin ml-0.5 mt-1.5 scale-[0.7]', open && 'is-active')}
			style="--hamburger-color: #09090B;"
			type="button"
			on:click={() => (open = !open)}
		>
			<span class="hamburger-box">
				<span class="hamburger-inner"></span>
			</span>
		</button>

		<div class="text-xl font-bold">ECHOEDU</div>
	</div>

	{#if open}
		<div transition:fly={{ y: -50 }} class="h-screen bg-[#959CFF] shadow-lg md:h-fit">
			<div class=" flex flex-col items-center gap-7 pt-7">
				<a href="/book" class={cn('text-2xl', $page.route.id?.startsWith('/book') && 'active')}>
					Book
				</a>
				{#if isTutor}
					<a href="/tutoring" class={cn('text-2xl', $page.route.id === '/tutoring' && 'active')}>
						Tutoring
					</a>
					<a
						href="/tutoring/schedule"
						class={cn('text-2xl', $page.route.id === '/tutoring/schedule' && 'active')}
					>
						Schedule
					</a>
				{/if}

				<a
					href="/account"
					class="rounded-md bg-white px-5 py-3 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
				>
					{#if $user}
						<div class="flex items-center gap-3">
							<img src={'/assets/google.png'} alt="google logo" class="h-5" />
							{$user.name}
						</div>
					{:else}
						Account
					{/if}
				</a>
			</div>

			<div
				class="mt-5 hidden border md:block"
				transition:scale={{ duration: 500, easing: quadOut, opacity: 1 }}
			/>
		</div>
	{/if}
</div>
