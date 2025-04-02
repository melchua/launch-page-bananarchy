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

<div class="flex min-h-screen flex-col">
	<div class="oback relative h-[900px] overflow-hidden lg:h-[670px]">
		<div
			class="mobile-xxs:left-[-85%] mobile-xs:left-[-55%] mobile-sm:left-[-50%] absolute left-[-100%] z-[-1] flex h-[500px] justify-center p-10 opacity-60 sm:left-[-34%] sm:top-[-4%] md:left-[-10%] lg:left-[32%] lg:top-[-35%] xl:left-[39%] 2xl:left-[42%]"
		>
			<ConcentricCircles />
		</div>
		<div
			class="z-10 mx-auto flex max-w-screen-xl flex-col items-center gap-4 p-8 lg:flex-row lg:justify-between lg:pt-20"
		>
			<div class="flex flex-col gap-2 md:px-24 lg:w-[75%]">
				<h1 class="font-londrinaSolid text-5xl text-white sm:text-left">
					Bananarchy: The Mischievious Card Game You've Been Waiting For!
				</h1>
				<div class="rounded-xl bg-transparent text-lg sm:text-black">
					<span class="text-bapurple">Snatch, Stash, Snack & Smash</span> your way to victory in this
					fast-paced, mischievous party game. Collect bananas, outwit opponents, and make wild moves
					that will have everyone laughing!
				</div>
			</div>
			<div class="relative">
				<enhanced:img
					src="$lib/assets/box-single.png"
					alt="box"
					class={`${boxClass} sm:flex-2 m-2 w-3/5 sm:w-[300px]`}
					sizes="(min-width: 640px) 640px, 80vw"
				/>
			</div>
		</div>
	</div>
	<footer
		class="z-50 flex w-full items-center justify-center bg-black p-16 text-center sm:mx-auto sm:pb-20 sm:text-start"
	>
		<div class="flex flex-col justify-between gap-4 sm:w-full sm:flex-row lg:w-[90%] xl:w-[72%]">
			<span
				><h1 class="text-2xl text-white">We're launching soon!</h1>
				<p class="w-full text-sm text-white">
					Sign up now to be the first to know when the Kickstarter launches and unlock the extra
					cards
				</p></span
			>
			<MailerForm />
		</div>
	</footer>
	<div class="full text-white">
		<div class="flex flex-col gap-4 p-4 pt-10 lg:mx-24">
			<div class="w-full">
				<div class="flex flex-col items-center gap-4 lg:flex-row">
					<div class="flex-1 py-8">
						<h2 class="font-londrinaSolid text-3xl sm:px-10 lg:px-20">
							It's everyone for themselves in this Jungle!
						</h2>
						<p class="mt-2 sm:px-10 lg:px-20">
							Use a mixture of strategy, cunning tricks, and social play to ensure your victory in a
							game that can change in a heartbeat. Shield a competitor to gain their trust before
							stealing all their bananas on the very next turn. It's a Monkey eat banana world out
							there!
						</p>
					</div>
					<div class="flex-1">
						<enhanced:img
							src="$lib/assets/placeholder.png"
							alt="placeholder"
							class="w-full rounded-sm"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
				</div>
			</div>
			<div class="w-full">
				<div class="flex flex-col-reverse items-center gap-4 lg:flex-row">
					<div class="flex-1 py-8">
						<enhanced:img
							src="$lib/assets/placeholder.png"
							alt="placeholder"
							class="w-full rounded-sm"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
					<div class="flex-1 py-8">
						<h2 class="font-londrinaSolid text-3xl sm:px-10 lg:px-20">
							Relish in the cheeky humour and cute anthropomorphic monkeys.
						</h2>
						<p class="mt-2 sm:px-10 lg:px-20">
							Monkey's in blue jeans, monkeys playing football, and even a Surprise Gorilla! This
							jungle ain't no Banana Republic but at least you'll enjoy yoinking your friend's
							fruit!
						</p>
					</div>
				</div>
			</div>
			<div class="w-full">
				<div class="flex flex-col items-center gap-4 md:flex-row">
					<div class="flex-1 py-8">
						<h2 class="font-londrinaSolid text-3xl sm:px-10 lg:px-20">
							A game where you don't have to wait your turn!
						</h2>
						<p class="mt-2 sm:px-10 lg:px-20">
							Tired of waiting for slowpoke McFly to trade his flipping sheep? In Bananarchy you can
							play Anytime cards pretty much anytime to encourage those slowpokes to pick up the
							pace or just to keep the action going!
						</p>
					</div>
					<div class="flex-1 py-8">
						<enhanced:img
							src="$lib/assets/placeholder.png"
							alt="placeholder"
							class="w-full rounded-sm"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
