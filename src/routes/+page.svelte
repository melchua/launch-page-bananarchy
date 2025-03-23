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

<div class="oback pb-[250px]0 flex min-h-screen flex-col">
	<div
		class="fixed left-[-320px] top-[-40px] z-0 flex h-max justify-center p-10 opacity-60 sm:top-[-200px] md:left-[25%] lg:left-[32%] xl:left-[35%] 2xl:left-[38%]"
	>
		<ConcentricCircles />
	</div>
	<div
		class="z-10 mx-auto flex max-w-screen-xl flex-col items-center gap-4 p-8 pt-20 sm:flex-row sm:justify-between"
	>
		<div class="flex flex-col gap-2 sm:w-[750px]">
			<h1 class="text-center font-londrinaSolid text-7xl text-white sm:text-left">
				Bananas, Betrayal, Total Simian Uprising! 🦧
			</h1>
			<div class="relative sm:hidden">
				<enhanced:img
					src="$lib/assets/box-single.png"
					alt="box"
					class={`${boxClass} sm:flex-2 m-2 w-3/5 sm:w-[300px]`}
					sizes="(min-width: 640px) 640px, 80vw"
				/>
			</div>
			<div
				class="rounded-xl bg-white p-4 font-londrinaSolid text-2xl text-browntext sm:bg-transparent sm:text-3xl sm:text-black"
			>
				<span class="text-bapurple">Snatch, Stash, Snack & Smash</span> your way to victory in this fast-paced,
				mischievous party game. Collect bananas, outwit opponents, and make wild moves that will have
				everyone laughing!
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
	<footer
		class="sticky bottom-0 left-0 z-50 flex w-full items-center justify-center bg-black p-8 sm:fixed sm:mx-auto sm:pb-20"
	>
		<div class="flex flex-col justify-between gap-4 sm:w-full sm:flex-row lg:w-[90%] xl:w-[72%]">
			<span
				><h1 class="text-2xl text-white">We're launching soon</h1>
				<p class="text-sm text-white">
					Signup now to be the first to know when the Kickstarter launches and unlock the extra
					cards
				</p></span
			>
			<MailerForm />
		</div>
	</footer>
</div>
