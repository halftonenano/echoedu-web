<script lang="ts">
	import PageFormat from '$lib/components/PageFormat.svelte';
	import TutoringSessionsList from './TutoringSessionsList.svelte';
	import TutorProfileEditor from './schedule/TutorProfileEditor.svelte';
</script>

<PageFormat title="EchoEDU" description="Tutoring Dashboard">
	<TutorProfileEditor />
	<div class="my-10"></div>
	<TutoringSessionsList />
</PageFormat>
