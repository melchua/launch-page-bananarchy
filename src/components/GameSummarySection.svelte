<script lang="ts">
	import { onMount } from 'svelte';

	let cardFanVisible = $state(false);
	let cardFanElement: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						cardFanVisible = true;
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.3
			}
		);

		if (cardFanElement) {
			observer.observe(cardFanElement);
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<div class="flex flex-col items-center justify-center px-4 py-14">
	<h2 class="text-center">Designed for Adults, Loved by Everyone.</h2>

	<div class="flex flex-col items-center justify-center md:flex-row">
		<!-- Card fan animation -->
		<div
			bind:this={cardFanElement}
			class="relative h-[300px] w-[280px] flex-shrink-0 pt-4 mobile-xxs:w-[300px] mobile-sm:w-[320px] md:h-[420px] md:w-[400px] md:pt-8"
		>
			<enhanced:img
				src="$lib/assets/cards/card_action_banana_republic.jpg?w=280;240;160;120"
				alt="Banana Republic card"
				class="card-fan left-1/2 -ml-[64px] w-[120px] rounded-xl shadow-2xl mobile-xxs:-ml-[74px] mobile-xxs:w-[140px] mobile-sm:-ml-[79px] mobile-sm:w-[150px] md:-ml-[108px] md:w-[216px] {cardFanVisible
					? 'card-fan-1'
					: ''}"
				sizes="(max-width: 430px) 120px, (max-width: 586px) 140px, (min-width: 768px) 216px, 150px"
				loading="lazy"
			/>
			<enhanced:img
				src="$lib/assets/cards/card_anytime_toss.jpg?w=280;240;160;120"
				alt="Toss card"
				class="card-fan left-1/2 -ml-[64px] w-[120px] rounded-xl shadow-2xl mobile-xxs:-ml-[74px] mobile-xxs:w-[140px] mobile-sm:-ml-[79px] mobile-sm:w-[150px] md:-ml-[108px] md:w-[216px] {cardFanVisible
					? 'card-fan-2'
					: ''}"
				sizes="(max-width: 430px) 120px, (max-width: 586px) 140px, (min-width: 768px) 216px, 150px"
				loading="lazy"
			/>
			<enhanced:img
				src="$lib/assets/cards/card_reaction_denied.jpg?w=280;240;160;120"
				alt="Denied card"
				class="card-fan left-1/2 -ml-[64px] w-[120px] rounded-xl shadow-2xl mobile-xxs:-ml-[74px] mobile-xxs:w-[140px] mobile-sm:-ml-[79px] mobile-sm:w-[150px] md:-ml-[108px] md:w-[216px] {cardFanVisible
					? 'card-fan-3'
					: ''}"
				sizes="(max-width: 430px) 120px, (max-width: 586px) 140px, (min-width: 768px) 216px, 150px"
				loading="lazy"
			/>
			<enhanced:img
				src="$lib/assets/cards/card_scoring_banana_smoothie.jpg?w=280;240;160;120"
				alt="Banana Smoothie card"
				class="card-fan left-1/2 -ml-[64px] w-[120px] rounded-xl shadow-2xl mobile-xxs:-ml-[74px] mobile-xxs:w-[140px] mobile-sm:-ml-[79px] mobile-sm:w-[150px] md:-ml-[108px] md:w-[216px] {cardFanVisible
					? 'card-fan-4'
					: ''}"
				sizes="(max-width: 430px) 120px, (max-width: 586px) 140px, (min-width: 768px) 216px, 150px"
				loading="lazy"
			/>
		</div>

		<!-- Game description -->
		<div
			class="text-md flex flex-col items-center text-center md:ml-24 md:w-[400px] md:items-start md:gap-8 md:text-left"
		>
			<div class="text-center text-xl font-semibold">
				Expect banana theft, betrayal, backstabbing, and laughter for the whole family.
			</div>
			<ul class="text-bold space-y-2 px-2 py-6 text-left">
				<li class="flex items-start gap-2">
					<enhanced:img
						src="$lib/assets/icons/monkeyhead-128x128.png"
						alt="Monkey Head"
						class="mt-0.5 h-7 w-7 flex-shrink-0"
						sizes="28px"
						loading="lazy"
					/>
					<span
						><div class="text-xl font-bold">Hand-drawn Illustrations by a former Disney artist</div>
						Every character is thoughtfully illustrated by a
						<span class="highlight-text-light-mode">real human artist</span>, packed with charm,
						expression, and playful detail.
					</span>
				</li>
				<li class="flex items-start gap-2">
					<enhanced:img
						src="$lib/assets/icons/denied-icon-128x128.png"
						alt="Denied"
						class="mt-0.5 h-7 w-7 flex-shrink-0"
						sizes="28px"
						loading="lazy"
					/>
					<span
						><div class="text-xl font-bold">Interrupt</div>
						Anyone, anytime, for maximum chaos</span
					>
				</li>
				<li class="flex items-start gap-2">
					<enhanced:img
						src="$lib/assets/icons/banana-icon-128x128.png"
						alt="Banana"
						class="mt-0.5 h-7 w-7 flex-shrink-0"
						sizes="28px"
						loading="lazy"
					/>
					<span
						><div class="text-xl font-bold">Great for parties. Terrible for friendships.</div>
						It's all fun and games until someone loses a banana. Sneaky, hilarious, and
						<span class="highlight-text-light-mode">impossible to stop playing</span>
					</span>
				</li>
			</ul>
		</div>
	</div>
</div>
