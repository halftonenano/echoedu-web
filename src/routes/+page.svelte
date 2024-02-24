<script>
	import Typewriter from 'svelte-typewriter';
	import { PencilLine } from 'lucide-svelte';
	import BookingInterface from '$lib/components/booking/BookingInterface.svelte';
	import BackgroundSlant from '$lib/components/BackgroundSlant.svelte';
	import PageFormat from '$lib/components/PageFormat.svelte';
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
	<div class="absolute w-full md:-top-[20vh] md:h-[70vh] md:skew-y-[-8deg] md:bg-[#959CFF]"></div>

	<div class="relative md:p-10">
		<div class="mx-auto w-fit text-[#383838]">
			<div
				class="-mb-5 bg-[#959CFF] p-5 pb-10 pt-[17vh] md:m-0 md:bg-transparent md:p-0 md:pt-[20vh]"
			>
				<h1 class="-ml-[6px] mb-24 skew-y-[-8deg] text-4xl font-bold md:text-[10rem]">ECHO EDU</h1>
				<p class="-ml-[2px] -mt-6 skew-y-[-8deg] text-lg md:mb-3 md:text-2xl">
					Echoing teacher expectations...
				</p>
			</div>
			<div class="h-64 w-full"></div>
		</div>
		<div class="m-6 mx-auto flex w-[90%] gap-8">
			<div class="flex-1">
				<div
					class="grid h-20 w-full place-items-center rounded-lg border-y bg-[#7c83dd] text-2xl font-bold text-[#f1f1f1] shadow-lg md:border"
				>
					Get One on One Tutoring
				</div>
			</div>
			<div class="flex-1">
				<div
					class="grid h-20 w-full place-items-center rounded-lg border-y bg-[#6a72e1] text-2xl font-bold text-[#f1f1f1] shadow-lg md:border"
				>
					Learn from Upperclassmen
				</div>
			</div>
			<div class="flex-1">
				<div
					class="grid h-20 w-full place-items-center rounded-lg border-y bg-[#575ec5] text-2xl font-bold text-[#f1f1f1] shadow-lg md:border"
				>
					Earn Service Hours as a Tutor
				</div>
			</div>
		</div>

		<!-- PUT A BUTTON HERE THAT REDIRECTS PEOPLE TO SIGNUP PAGE -->
		<!-- WHAT IS ECHOEDU GOES HERE -->
		<!-- DEVELOPED BY SECTION -->

		<!-- <div class="rounded-lg border-y md:border bg-white h-fit shadow-lg w-[80%] mx-auto">
			<div class="bg-[#959CFF] w-full h-16 text-4xl font-bold text-[#383838] flex place-items-center pl-4 rounded-t-lg">
				What is EchoEDU?
			</div>
			<div class="px-4 py-2 text-[#383838] text-xl">
				Magna proident cupidatat qui est elit labore eu consequat culpa magna. In est ad labore tempor ex. Quis minim qui reprehenderit ipsum anim sit nostrud amet sit. Consequat ad minim eiusmod tempor Lorem duis est quis et duis cillum consequat eu.
			</div>
		</div> -->
	</div>
</div>
