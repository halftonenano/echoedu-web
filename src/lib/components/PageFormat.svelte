<script lang="ts">
	import BackgroundSlant from './BackgroundSlant.svelte';

	export let title: string;
	export let description: string | undefined;

	export let noBox = false;
</script>

<BackgroundSlant />

<div class="relative md:p-10">
	<div
		class="mx-auto w-full max-w-7xl bg-[#959CFF] pt-[17vh] text-[#383838] md:bg-transparent md:pt-[20vh]"
	>
		<div class="p-5 md:p-0">
			<h1 class="-ml-[4px] text-4xl font-bold md:text-6xl">{title}</h1>
			{#if description}
				<p class="-ml-[2px] md:mb-3 mt-1 text-lg md:text-2xl">{description}</p>
			{/if}
		</div>

		{#if noBox}
			<slot />
		{:else}
			<div class="rounded-lg border bg-white p-5 shadow-lg">
				<slot />
			</div>
		{/if}
	</div>
</div>
