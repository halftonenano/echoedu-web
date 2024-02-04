<script lang="ts">
	import stc from 'string-to-color';

	export let name: string | undefined;
	export let course: string | undefined;

	let color = stc(name);
</script>

<div
	class="flex w-fit items-center gap-1.5 rounded p-0.5 pl-2 text-xs font-bold pointer-events-none"
	style="color: {color}; background: {color}33;"
>
	{name}
	<div class="rounded-[0.15rem] bg-white px-2 py-0.5 text-xs">{course}</div>
</div>
