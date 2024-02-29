<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { pb, user } from '$lib/pocketbase';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { quadOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import './hamburgers.css';

	let isTutor = false;

	onMount(async () => {
		storeScroll();

		try {
			await pb.collection('tutors').getFirstListItem(`user="${pb.authStore.model?.id}"`);
			isTutor = true;
		} catch {}
	});

	onNavigate(() => {
		open = false;
	});

	export let open = false;

	const debounce = (fn: any) => {
		let frame: number;
		// @ts-ignore
		return (...params) => {
			if (frame) {
				cancelAnimationFrame(frame);
			}
			frame = requestAnimationFrame(() => {
				fn(...params);
			});
		};
	};

	let scrollY = 0;
	function storeScroll() {
		scrollY = window.scrollY;
	}
</script>

<svelte:document on:scroll|passive={debounce(storeScroll)} />

<div class={cn('fixed top-0 z-[99] w-full')}>
	<div
		class={cn(
			'relative z-[999] flex items-center transition',
			scrollY === 0 ? 'bg-[#959CFF]' : 'shadow-lg backdrop-blur-sm',
			open && 'bg-[#959CFF] shadow-none'
		)}
	>
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

		<!-- <a href={$user ? '/book' : '/'} class="text-xl font-bold">ECHOEDU</a> -->
		<a href="/" class="text-xl font-bold">ECHOEDU</a>
	</div>

	{#if open}
		<div transition:fly={{ y: -50 }} class="h-screen bg-[#959CFF] pt-5 shadow-lg md:h-fit">
			<div
				class="w-max-md -mt-[10vh] flex h-full flex-col items-center justify-center md:mt-0 md:flex-row md:flex-wrap"
			>
				<a href="/book" class="nav-item text-center">Book</a>
				{#if isTutor}
					<a href="/tutoring" class="nav-item text-center">Tutoring</a>
					<a href="/tutoring/schedule" class="nav-item text-center">Schedule</a>
				{:else}
					<a href="/tutoring/signup" class="nav-item text-center">Sign up as a tutor</a>
				{/if}

				<a
					href={$user ? '/account' : '/signin'}
					class="mt-5 rounded-md bg-white px-5 py-3 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg md:mx-4 md:mt-0"
				>
					{#if $user}
						<div class="flex items-center gap-3">
							<img src={'/assets/google.png'} alt="google logo" class="h-5" />
							{$user.name}
						</div>
					{:else}
						Sign in
					{/if}
				</a>

				<!-- <a href="/" class="nav-item mt-5 md:mt-0"><Home class='mx-auto' /></a> -->
			</div>

			<div
				class="mt-7 hidden border md:block"
				transition:scale={{ duration: 500, easing: quadOut, opacity: 1 }}
			/>
		</div>
	{/if}
</div>

<style>
	.nav-item {
		background: linear-gradient(0deg, rgba(255, 255, 255, 0.147), rgba(255, 255, 255, 0.152))
			no-repeat right bottom / 0 var(--bg-h);
		transition: background-size 350ms;
		--bg-h: 100%;
		@apply w-64 px-2 py-2 text-2xl font-bold text-[#09090B] md:w-fit md:px-7;
	}
	.nav-item:where(:hover, :focus-visible) {
		background-size: 100% var(--bg-h);
		background-position-x: left;
	}
</style>
