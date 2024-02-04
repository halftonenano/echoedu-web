<script lang="ts">
	import BackgroundSlant from './BackgroundSlant.svelte';

	export let title: string;
	export let description: string | undefined;

	export let noBox = false;
</script>

<BackgroundSlant />

<div class="relative p-10">
	<div class="mx-auto mt-[20vh] w-full max-w-7xl text-[#383838]">
		<h1 class="-ml-[4px] text-6xl font-bold">{title}</h1>
		{#if description}
			<p class="-ml-[2px] mb-3 mt-1 text-2xl">{description}</p>
		{/if}
		
		{#if noBox}
			<slot />
		{:else}
			<div class="rounded-lg border bg-white p-5 shadow-lg">
				<slot />
			</div>
		{/if}
	</div>
</div>
