<script>
	import Typewriter from 'svelte-typewriter';
	import { PencilLine } from 'lucide-svelte';
	import BookingInterface from '$lib/booking/BookingInterface.svelte';
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

<div class="">
	<div class="absolute -top-[20vh] h-[80vh] w-full skew-y-[-8deg] bg-[#959CFF]"></div>

	<div class="relative p-10">
		<div class="mx-auto mt-[20vh] w-full max-w-7xl text-[#383838]">
			<h1 class="-ml-[4px] text-6xl font-bold">EchoEDU</h1>
			<p class="-ml-[2px] mb-3 mt-1 text-2xl">Echoing teacher expectations</p>
			<BookingInterface />
		</div>
	</div>
</div>
