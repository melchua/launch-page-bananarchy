<script>
	import MailerForm from '$lib/MailerForm/page.svelte';
	import { onMount } from 'svelte';
	import ConcentricCircles from '../components/ConcentricCircles.svelte';

	let boxClass = '';

	onMount(() => {
		setTimeout(() => {
			boxClass = 'animate-bounce-in';
		}, 300);
	});
</script>

<div class="oback flex min-h-screen flex-col pb-[250px] sm:pb-0">
	<footer
		class="fixed bottom-0 left-0 right-0 z-50 flex flex-col justify-between gap-4 bg-black p-6 sm:sticky sm:top-0 sm:flex-row"
	>
		<span
			><h1 class="text-2xl text-white">We're launching soon</h1>
			<p class="text-sm text-white">
				Signup now to be the first to know when the Kickstarter launches and unlock the extra cards
			</p></span
		>
		<MailerForm />
	</footer>

	<div
		class="absolute left-[-320px] top-[-40px] z-0 flex h-max justify-center p-10 opacity-60 sm:top-[-200px] md:left-[25%] lg:left-[32%] xl:left-[35%] 2xl:left-[38%]"
	>
		<ConcentricCircles />
	</div>
	<div
		class="z-10 mx-auto flex max-w-screen-xl flex-col items-center gap-4 p-8 pt-20 sm:flex-row sm:justify-between"
	>
		<div class="flex flex-col gap-2 sm:w-[750px]">
			<h1 class="text-center font-londrinaSolid text-7xl text-white sm:text-left">
				Unleash your inner Chimpanze!
			</h1>
			<div class="relative sm:hidden">
				<enhanced:img
					src="$lib/assets/box-single.png"
					alt="box"
					class={`${boxClass} sm:flex-2 m-2 w-3/5 sm:w-[300px]`}
					sizes="(min-width: 640px) 640px, 80vw"
				/>
			</div>
			<h2 class="py-2 text-center font-londrinaSolid text-xl sm:text-left">
				<span class="text-4xl text-baorange-50"
					>Snatch, Stash, Snack & Smash your way to victory in this fast-paced, mischievous party
					game.</span
				>
			</h2>
			<div class="rounded-xl bg-white p-4 font-londrinaSolid text-2xl text-browntext">
				Dive into a world of clever strategies and mischief. Collect monkey cards, outsmart
				opponents, and make wild moves to gain the upper hand. With unpredictable twists and plenty
				of surprises, every round is a fresh challenge. Perfect for players who love a mix of
				cunning strategy and all-out-laughter!
			</div>
		</div>
		<div class="relative hidden sm:block">
			<enhanced:img
				src="$lib/assets/box-single.png"
				alt="box"
				class={`${boxClass} sm:flex-2 m-2 w-3/5 sm:w-[300px]`}
				sizes="(min-width: 640px) 640px, 80vw"
			/>
		</div>
	</div>
</div>
