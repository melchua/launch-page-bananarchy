<script lang="ts">
	import { onMount } from 'svelte';
	import monkeyhead from '$lib/assets/icons/monkeyhead-128x128.png?enhanced';
	import deniedIcon from '$lib/assets/icons/denied-icon-128x128.png?enhanced';
	import bananaIcon from '$lib/assets/icons/banana-icon-128x128.png?enhanced';

	import type { Picture } from 'vite-imagetools';

	let cardFanVisible = $state(false);
	let cardFanElement: HTMLElement;

	interface Feature {
		icon: Picture;
		alt: string;
		title: string;
		description: string;
		highlight?: string;
		descriptionEnd?: string;
	}

	const features: Feature[] = [
		{
			icon: monkeyhead,
			alt: 'Monkey Head',
			title: 'Hand-drawn Illustrations by a former Disney artist',
			description: 'Every character is thoughtfully illustrated by a',
			highlight: 'real human artist',
			descriptionEnd: ', packed with charm, expression, and playful detail.'
		},
		{
			icon: deniedIcon,
			alt: 'Denied',
			title: 'Interrupt',
			description: 'Anyone, anytime, for maximum chaos'
		},
		{
			icon: bananaIcon,
			alt: 'Banana',
			title: 'Great for parties. Terrible for friendships.',
			description: "It's all fun and games until someone loses a banana. Sneaky, hilarious, and",
			highlight: 'impossible to stop playing'
		}
	];

	interface GameStat {
		iconType: 'calendar' | 'users' | 'clock';
		label: string;
	}

	const gameStats: GameStat[] = [
		{
			iconType: 'calendar',
			label: 'Ages 8+'
		},
		{
			iconType: 'users',
			label: 'Players 3-8'
		},
		{
			iconType: 'clock',
			label: 'Playtime 25 mins'
		}
	];

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
	<h2 class="text-center font-londrinaSolid text-5xl font-semibold tracking-wide">
		Designed for Adults, Loved by Everyone.
	</h2>

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
			class="text-md z-10 flex flex-col items-center text-center md:ml-24 md:w-[400px] md:items-start md:py-4 md:text-left"
		>
			<div
				class="highlight-text-light-mode z-10 text-center text-xl font-bold italic drop-shadow-lg md:py-4"
			>
				"Expect banana theft, betrayal, backstabbing, and laughter for the whole family.""
			</div>
			<ul class="text-bold my-6 gap-4 space-y-2 px-2 text-left">
				{#each features as feature}
					<li class="flex items-start gap-2 pb-2">
						<enhanced:img
							src={feature.icon}
							alt={feature.alt}
							class="mt-0.5 h-7 w-7 flex-shrink-0"
							sizes="28px"
							loading="lazy"
						/>
						<span>
							<div class="text-xl font-bold">{feature.title}</div>
							{feature.description}
							{#if feature.highlight}
								<span class="highlight-text-light-mode">{feature.highlight}</span>
							{/if}
							{#if feature.descriptionEnd}
								{feature.descriptionEnd}
							{/if}
						</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Game Stats Section -->
	<div class="mt-8 flex items-center justify-center gap-8 md:gap-12">
		{#each gameStats as stat}
			<div class="flex flex-col items-center gap-2">
				<div class="h-9 w-9 md:h-10 md:w-10">
					{#if stat.iconType === 'calendar'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-full w-full"
						>
							<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
							<line x1="16" y1="2" x2="16" y2="6"></line>
							<line x1="8" y1="2" x2="8" y2="6"></line>
							<line x1="3" y1="10" x2="21" y2="10"></line>
							<path d="M8 14h.01"></path>
							<path d="M12 14h.01"></path>
							<path d="M16 14h.01"></path>
							<path d="M8 18h.01"></path>
							<path d="M12 18h.01"></path>
							<path d="M16 18h.01"></path>
						</svg>
					{:else if stat.iconType === 'users'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-full w-full"
						>
							<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
							<circle cx="9" cy="7" r="4"></circle>
							<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
							<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
						</svg>
					{:else if stat.iconType === 'clock'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-full w-full"
						>
							<circle cx="12" cy="12" r="10"></circle>
							<polyline points="12 6 12 12 16 14"></polyline>
						</svg>
					{/if}
				</div>
				<span class="text-center text-sm font-semibold md:text-base">{stat.label}</span>
			</div>
		{/each}
	</div>
</div>
