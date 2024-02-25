<script>
	import Typewriter from 'svelte-typewriter';
	import { ChevronDown, Github, GithubIcon, Link, LucideGithub } from 'lucide-svelte';
	import BookingInterface from '$lib/components/booking/BookingInterface.svelte';
	import BackgroundSlant from '$lib/components/BackgroundSlant.svelte';
	import PageFormat from '$lib/components/PageFormat.svelte';
	import * as HoverCard from '$lib/components/ui/hover-card';
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
			<div class="h-16 w-full"></div>
		</div>
		<div class="grid w-full place-items-center">
			<a href="/signin"
				class="rounded-xl border-4 border-[#959CFF] bg-white p-4 px-6 text-4xl font-bold text-[#383838] transition-colors duration-300 hover:border-[#646ce3] hover:bg-[#959CFF] hover:text-[#f1f1f1]"
			>
				Join now
			</a>
		</div>
		<div class="h-32 w-full"></div>
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
		<div class="h-32 w-full"></div>
		<div class="bounce grid w-full place-items-center">
			<div class="scale-[2] text-[#575ec5]">
				<ChevronDown />
			</div>
		</div>
		<div class="h-16 w-full"></div>
		<div class="mx-auto w-[90%] flex justify-between">
			<div class="h-fit w-[50%] rounded-lg border-y bg-white shadow-lg md:border">
				<div
					class="flex h-16 w-full place-items-center rounded-t-lg bg-[#959CFF] pl-4 text-4xl font-bold text-[#383838]"
				>
					What is EchoEDU?
				</div>
				<div class="px-4 py-2 text-xl text-[#383838]">
					Magna proident cupidatat qui est elit labore eu consequat culpa magna. In est ad labore
					tempor ex. Quis minim qui reprehenderit ipsum anim sit nostrud amet sit. Consequat ad
					minim eiusmod tempor Lorem duis est quis et duis cillum consequat eu. Magna proident
					cupidatat qui est elit labore eu consequat culpa magna. In est ad labore tempor ex. Quis
					minim qui reprehenderit ipsum anim sit nostrud amet sit. Consequat ad minim eiusmod tempor
					Lorem duis est quis et duis cillum consequat eu. Magna proident cupidatat qui est elit labore eu consequat culpa magna. In est ad labore
					tempor ex. Quis minim qui reprehenderit ipsum anim sit nostrud amet sit. Consequat ad
					minim eiusmod tempor Lorem duis est quis et duis cillum consequat eu. Magna proident
					cupidatat qui est elit labore eu consequat culpa magna. In est ad labore tempor ex. Quis
					minim qui reprehenderit ipsum anim sit nostrud amet sit. Consequat ad minim eiusmod tempor
					Lorem duis est quis et duis cillum consequat eu.
					
				</div>
			</div>
			<div class="h-fit w-[40%] rounded-lg border-y bg-white shadow-lg md:border mt-16 mr-4">
				<img src={'/assets/tutoringpicture.jpeg'} alt="Alex" class="rounded-xl" />
			</div>
		</div>
		<div class="h-48 w-full"></div>
		<!-- <div class="w-24 mx-auto aspect-square rounded-full bg-red-500"></div> -->
	</div>
	<!-- <div class="w-full h-32 bg-[#959CFF] -skew-y-6"></div> -->
	<div class="relative w-full overflow-y-hidden bg-[#959CFF] py-6 text-[#383838]">
		<div class="text mx-auto flex w-[90%] flex-col gap-0">
			<div class="text-4xl font-bold text-[#383838]">Website Developed by ContinuityLabs</div>
			<div class="mt-6 grid grid-cols-3 place-items-center gap-2">
				<div class="flex flex-col gap-4">
					<div class="w-64 text-center text-2xl font-bold">
						<HoverCard.Root>
							<HoverCard.Trigger>
								<div class="hover:scale-125 transition-transform duration-300">
									Gene Iwasaki
								</div>
							</HoverCard.Trigger>
							<HoverCard.Content>
								<div class="flex flex-col gap-2 tracking-wide">
									<div class="w-full text-xl font-bold">
										Gene Iwasaki
									</div>
									<div class="flex justify-between">
										<div class="w-16 mx-auto aspect-square rounded-full bg-red-500">
											<img src={'/assets/genepicture.png'} alt="Gene" class="w-16 aspect-square rounded-full" />
										</div>
										<div class="flex justify-evenly flex-1 pl-10 place-items-center scale-150">
											<a href="https://github.com/halftonenano" class="w-12"><Github /></a>
											<a href="https://www.instagram.com/genethegreatish/" class="w-12"><Link /></a>
										</div>
									</div>
									<div class="text-[#383838] text-lg mt-4">
										Fullstack Developer
									</div>
								</div>
							</HoverCard.Content>
						</HoverCard.Root>
					</div>
				</div>
				<div class="flex flex-col gap-4">
					<div class="w-64 text-center text-2xl font-bold">
						<HoverCard.Root>
							<HoverCard.Trigger>
								<div class="hover:scale-125 transition-transform duration-300">
									Alexander Bonev
								</div>
							</HoverCard.Trigger>
							<HoverCard.Content>
								<div class="flex flex-col gap-2 tracking-wide">
									<div class="w-full text-xl font-bold">
										Alexander Bonev
									</div>
									<div class="flex justify-between">
										<div class="w-16 mx-auto aspect-square rounded-full bg-red-500 grid place-items-center">
											<img src={'/assets/alexpicture.jpg'} alt="Alex" class="w-16 aspect-square rounded-full" />
										</div>
										<div class="flex justify-evenly flex-1 pl-10 place-items-center scale-150">
											<a href="https://github.com/Alex-Bonev" class="w-12"><Github /></a>
											<a href="https://www.instagram.com/actuallyalecc/" class="w-12"><Link /></a>
										</div>
									</div>
									<div class="text-[#383838] text-base">
										Fullstack Developer<br/>President of Leigh Robotics and Interact
									</div>
								</div>
							</HoverCard.Content>
						</HoverCard.Root>
					</div>
				</div>
				<div class="flex flex-col gap-4">
					<div class="w-64 text-center text-2xl font-bold">
						<HoverCard.Root>
							<HoverCard.Trigger>
								<div class="hover:scale-125 transition-transform duration-300">
									Vidhu Venugopal
								</div>
							</HoverCard.Trigger>
							<HoverCard.Content>
								<div class="flex flex-col gap-2 tracking-wide">
									<div class="w-full text-xl font-bold">
										Vidhu Venugopal
									</div>
									<div class="flex justify-between">
										<div class="w-16 mx-auto aspect-square rounded-full bg-red-500">
											<img src={'/assets/vidhupicture.jpeg'} alt="Vidhu" class="w-16 aspect-square rounded-full" />
										</div>
										<div class="flex justify-evenly flex-1 pl-10 place-items-center scale-150">
											<a href="https://github.com/vidhu-vv" class="w-12"><Github /></a>
											<a href="https://www.instagram.com/_vidhu.v_/" class="w-12"><Link /></a>
										</div>
									</div>
									<div class="text-[#383838] text-lg mt-4">
										Fullstack Developer
									</div>
								</div>
							</HoverCard.Content>
						</HoverCard.Root>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes bounce {
		0%,
		100% {
			transform: translateY(-80%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		50% {
			transform: none;
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}
	.bounce {
		animation: bounce 2s infinite;
	}
</style>
