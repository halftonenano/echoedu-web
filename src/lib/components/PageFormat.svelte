<script lang="ts">
	import BackgroundSlant from './BackgroundSlant.svelte';
	import Footer from './Footer.svelte';

	export let title: string;
	export let description: string | undefined;

	export let noBox = false;
</script>

<BackgroundSlant />

<div class="relative md:p-10">
	<div class="mx-auto w-full max-w-7xl text-[#383838]">
		<div
			class="-mb-5 bg-[#959CFF] p-5 pb-10 pt-[17vh] md:m-0 md:bg-transparent md:p-0 md:pt-[20vh]"
		>
			<h1 class="-ml-[4px] text-4xl font-bold md:text-6xl">{title}</h1>
			{#if description}
				<p class="-ml-[2px] mt-1 text-lg md:mb-3 md:text-2xl">{description}</p>
			{/if}
		</div>

		{#if noBox}
			<slot />
		{:else}
			<div class="rounded-lg border-t md:border bg-white p-5 md:shadow-lg min-h-[80vh] md:min-h-fit">
				<slot />
			</div>
		{/if}
	</div>
</div>

<div class="h-20"></div>
<Footer />
