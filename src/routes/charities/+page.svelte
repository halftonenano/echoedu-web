<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import 'locomotive-scroll/locomotive-scroll.css';
	import { ExternalLink } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';

	let scroll: any;

	onMount(async () => {
		// @ts-ignore
		const LocomotiveScroll = (await import('locomotive-scroll')).default;
		scroll = new LocomotiveScroll({
			smooth: true,
			smartphone: { direction: 'vertical', smooth: true }
		});
	});
	onDestroy(() => {
		scroll?.destroy();
	});
</script>

<svelte:head>
	<title>EchoEDU — Charities</title>
	<meta name="og:title" content="EchoEDU" />
	<meta name="description" content="Personalized Tutoring for Your Success" />
	<meta name="og:description" content="Personalized Tutoring for Your Success" />
	<!-- <meta property="og:image" content="/assets/essaymode.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="901" />
	<meta property="og:image:height" content="340" />
	<meta name="twitter:site" content="EssayMode" />
	<meta name="twitter:title" content="EssayMode - Coming Next Semester! 🎉" />
	<meta name="twitter:description" content="Personalized Tutoring for Your Success" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content="/assets/essaymode.png" /> -->
</svelte:head>

<div class="absolute -top-[20vh] h-[calc(50vh_+_300px)] w-full skew-y-[-8deg] bg-[#959CFF]"></div>

<div class="relative p-10">
	<div class="mx-auto w-fit text-[#383838]">
		<div class="pt-[35vh]">
			<div data-scroll data-scroll-speed={0.2}>
				<h1 class="-ml-[4px] mb-10 skew-y-[-8deg] text-6xl font-bold md:text-8xl">Charities</h1>
			</div>
		</div>
	</div>
</div>

<div class="mx-auto mt-28 w-full max-w-2xl p-7 text-[#383838]">
	<div class="mx-auto flex w-fit flex-col gap-20 md:flex-row">
		<div>
			<img
				class="mx-auto h-60"
				src="https://assets.classy.org/15693713/92f0da4e-075f-11eb-89e9-0aedfc3557ab.png"
				alt="second harvest logo"
			/>
			<a class=" mx-auto mt-10 text-xl" href="https://impact.shfb.org/team/564243" target="_blank">
				Second Harvest <ExternalLink class="mb-1" size={15} />
			</a>
		</div>
		<div>
			<img
				class="h-60"
				src="https://jedfoundation.org/wp-content/uploads/2021/07/jed-logo-placeholder-1.png"
				alt="second harvest logo"
			/>
			<a
				class=" mx-auto mt-10 text-xl"
				href="https://jedfoundation.crowdchange.co/39092"
				target="_blank"
			>
				JED Foundation <ExternalLink class="mb-1" size={15} />
			</a>
		</div>
	</div>
</div>

<div class="h-20"></div>
<Footer />

<style>
	a {
		@apply flex w-fit items-center gap-2 underline-offset-2 hover:underline;
	}
</style>
