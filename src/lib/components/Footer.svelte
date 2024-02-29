<script>
	import { Code2, ExternalLink } from 'lucide-svelte';
</script>

<footer class="border-t bg-zinc-50 p-7">
	<div class="mx-auto my-10 flex max-w-7xl justify-between gap-20 md:flex-row flex-col">
		<div class="text-4xl font-bold text-[#383838]">EchoEDU</div>

		<div class="flex flex-wrap justify-between gap-14">
			<div class="flex gap-3 md:flex-row flex-col">
				<Code2 />
				<div>
					<h2>Built by Continuity Labs</h2>
					<ul>
						<li>
							<a href="https://www.instagram.com/genethegreatish/" target="_blank">
								Gene Iwasaki <ExternalLink class="mb-1" size={15} />
							</a>
						</li>
						<li>
							<a href="https://www.instagram.com/actuallyalecc/" target="_blank">
								Vidhu Venugopal <ExternalLink class="mb-1" size={15} />
							</a>
						</li>
						<li>
							<a href="https://vidhusvilla.vercel.app/" target="_blank">
								Alexander Bonev <ExternalLink class="mb-1" size={15} />
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div>
				<h2>EchoEDU</h2>
				<ul>
					<li>
						<a href="/charities">Charities</a>
					</li>
					<li>
						<a href="https://www.instagram.com/echoedu.npo/" target="_blank"
							>Instagram <ExternalLink class="mb-1" size={15} /></a
						>
					</li>
				</ul>
			</div>

			<div>
				<h2>Tutoring</h2>
				<ul>
					<li>
						<a href="/tutoring/signup">Sign up as a tutor</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>

<style>
	h2 {
		@apply mb-2 font-bold;
	}

	li {
		@apply my-1 text-zinc-600;
	}

	a {
		@apply flex items-center gap-2 underline-offset-2 hover:underline;
	}
</style>
