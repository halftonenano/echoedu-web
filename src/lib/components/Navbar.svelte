<script lang="ts">
	import { page } from '$app/stores';
	import { pb, user } from '$lib/pocketbase';
</script>

<div class="nav-selector absolute right-5 top-5 z-[99]">
	<a href="/book" data-state={$page.route.id?.startsWith('/book') && 'active'}>Book</a>
	<a href="/tutoring" data-state={$page.route.id === '/tutoring' && 'active'}>Tutoring</a>
	<a href="/tutoring/schedule" data-state={$page.route.id === '/tutoring/schedule' && 'active'}>Schedule</a>
	<a href="/account">
		Account
		{#if $user}
			: {$user.name}
		{/if}
	</a>
</div>

<style>
	.nav-selector {
		@apply inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground;
	}
	.nav-selector > a {
		@apply inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm;
	}
</style>
