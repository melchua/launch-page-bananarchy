<script>
	import MailerForm from '$lib/MailerForm/page.svelte';
	import { onMount } from 'svelte';

	let boxClass = '';

	onMount(() => {
		setTimeout(() => {
			boxClass = 'animate-bounce-in';
		}, 300);
	});
</script>

<div class="flex flex-col pb-[250px] sm:mt-20 sm:pb-0">
	<div
		class="bg-primary mx-auto flex max-w-screen-xl flex-col items-center gap-4 p-8 sm:flex-row sm:justify-between"
	>
		<div class="sm:w-[750px]">
			<h1 class="font-londrinaSolid text-center text-7xl sm:text-left">
				This <span class="text-8xl text-white">SH$T</span> is BANANAS!
			</h1>
			<h2 class="font-londrinaSolid py-2 text-center text-xl sm:text-left">
				<span class="text-2xl text-white/90">Snatch, Stash, Snack & Smash</span> your way to victory
				in this fast-paced, mischievous party game.
			</h2>
		</div>
		<enhanced:img
			src="$lib/assets/box.png"
			alt="box"
			class={`${boxClass} sm:flex-2 m-2 w-4/5 sm:w-[300px]`}
			sizes="(min-width: 640px) 300px, 80vw"
		/>
	</div>
	<footer
		class="fixed bottom-0 left-0 right-0 flex flex-col justify-between gap-4 bg-black p-6 sm:fixed sm:bottom-0 sm:top-auto sm:flex-row"
	>
		<span
			><h1 class="text-2xl text-white">We're launching soon</h1>
			<p class="text-sm text-white">
				Signup now to be the first to know when the Kickstarter launches and unlock the extra cards
			</p></span
		>
		<MailerForm />
	</footer>
</div>
