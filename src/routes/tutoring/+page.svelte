<script lang="ts">
	import PageFormat from '$lib/components/PageFormat.svelte';
	import TutoringSessionsList from './TutoringSessionsList.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<PageFormat title="EchoEDU" description="Tutoring Dashboard">
	<div class="absolute top-8 left-[50%] -translate-x-[50%] font-3xl z-30 ">
		<Navbar/>
	</div>
  <TutoringSessionsList />
</PageFormat>
