<script lang="ts">
	import 'locomotive-scroll/locomotive-scroll.css';
	import { AlignVerticalDistributeCenter, GraduationCap, Handshake, User2 } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import FeatureCard from './FeatureCard.svelte';
	import Footer from '$lib/components/Footer.svelte';

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
	<title>EchoEDU</title>
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
				<h1 class="-ml-[4px] mb-10 skew-y-[-8deg] text-6xl font-bold md:text-8xl">EchoEDU</h1>
			</div>
			<div data-scroll data-scroll-speed={0.1}>
				<p class="-mt-6 skew-y-[-8deg] text-lg md:mb-3 md:text-2xl">Echoing teacher expectations</p>
			</div>
		</div>
	</div>
</div>

<div class="mx-auto mt-28 w-full max-w-2xl p-7 text-[#383838]">
	<div>
		<div
			class="mx-auto w-fit overflow-hidden rounded-md bg-[#383838] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
		>
			<a href="/book">
				<div class="hover-slide -my-0.5 px-10 py-5 text-center font-bold text-white md:text-lg">
					View Avaiable Tutoring Sessions →
				</div>
			</a>
		</div>
	</div>

	<div class="mt-10 flex flex-col gap-2.5 rounded-lg border bg-zinc-50 p-5 shadow-lg">
		<FeatureCard>
			<div class="aspect-square rounded bg-[#cec3f7]/30 p-3 text-[#b8ace2]">
				<AlignVerticalDistributeCenter size={22} />
			</div>
			Flexible Booking
		</FeatureCard>
		<FeatureCard>
			<div class="aspect-square rounded bg-[#cec3f7]/30 p-3 text-[#b8ace2]">
				<GraduationCap size={22} />
			</div>
			Familiarity with the Curriculum
		</FeatureCard>
		<FeatureCard>
			<div class="aspect-square rounded bg-[#cec3f7]/30 p-3 text-[#b8ace2]">
				<Handshake size={22} />
			</div>
			Personalized Support
		</FeatureCard>
	</div>

	<h2 class="mb-2 mt-20 text-center text-xl font-bold">What is EchoEDU?</h2>
	<p class="text-center">
		EchoEDU is a non-profit tutoring organization powered by high school students, dedicated to
		supporting our peers through free, one-time English tutoring sessions primarily focused on essay
		revisions and larger projects. While other tutoring organizations may seem nearly identical or
		even superior, we employ a relatively unique approach to tutoring that cannot be replicated:
		self selection. Students are able to match with tutors who have had their teacher previously,
		ensuring tailored support which echos the expectations of their teacher. In a world where
		writing is everything but objective, it is imperative to understand the criteria that your
		teacher has provided. Unfortunately, this cannot be achieved through a simple rubric. Rather, it
		must be learned through direct and extensive experience with the teacher; thus, to no fault of
		their own, the average tutor will be unable to assist a student to the best of their abilities
		in writing. Here at EchoEDU, we have the tools which empower students to excel as writers,
		allowing students to thrive academically while collaborating with their peers.
	</p>
</div>

<div class="h-20"></div>
<Footer />

<style>
	.hover-slide {
		background: linear-gradient(0deg, #959cff, #959cff) no-repeat right bottom / 0 var(--bg-h);
		transition: background-size 350ms;
		--bg-h: 100%;
	}
	.hover-slide:where(:hover, :focus-visible) {
		background-size: 100% var(--bg-h);
		background-position-x: left;
	}
</style>
