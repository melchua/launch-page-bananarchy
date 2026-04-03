<script lang="ts">
	import { onMount } from 'svelte';
	import cardBack from '$lib/assets/cards/card_back_monkey_card.jpg?w=360;280;260;240&enhanced';

	let stepCardsVisible = $state({
		step1: false,
		step2: false,
		step3: false,
		step4: false,
		step5: false
	});

	onMount(() => {
		// Intersection Observer for step card flip animation
		const cardObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const stepNum = (entry.target as HTMLElement).dataset.step;
						if (stepNum) {
							stepCardsVisible[`step${stepNum}` as keyof typeof stepCardsVisible] = true;
						}
						cardObserver.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.3
			}
		);

		// Observe all step cards
		document.querySelectorAll('[data-step-card]').forEach((el) => {
			cardObserver.observe(el);
		});

		return () => {
			cardObserver.disconnect();
		};
	});
</script>

<!-- How to Play Section -->
<div class="px-2 py-6 md:px-4">
	<div class="mx-auto max-w-5xl">
		<h2 class="text-center">Learn in 60 Seconds</h2>

		<!-- Steps grid -->
		<div class="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-8">
			<!-- Step 1: Collect Bananas -->
			<div
				class="flex flex-col items-center px-2 py-4 text-center md:p-4"
				data-step-card
				data-step="1"
			>
				<div class="card-flip-container mb-4 max-w-[280px] md:w-[280px]">
					<div class="card-flip-inner -rotate-1 {stepCardsVisible.step1 ? 'flipped' : ''}">
						<div class="card-back">
							<enhanced:img
								src={cardBack}
								alt="Card back"
								class="w-full rounded-xl shadow-2xl"
								sizes="(max-width: 430px) 240px, (max-width: 586px) 260px, 280px"
								loading="lazy"
							/>
						</div>
						<div class="card-front">
							<enhanced:img
								src="$lib/assets/cards/card_action_pick_and_pluck.jpg?w=360;280;260;240"
								alt="Pick & Pluck card"
								class="w-full rounded-xl shadow-2xl"
								sizes="(max-width: 430px) 240px, (max-width: 586px) 260px, 280px"
								loading="lazy"
							/>
						</div>
					</div>
				</div>
				<div class="mb-2 flex items-center justify-center gap-3">
					<div
						class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#f26b4e] text-lg font-bold text-white shadow-lg"
					>
						1
					</div>
					<h3 class="step-title">Collect Bananas</h3>
				</div>
				<p class="description-text">
					Whoever has <span class="description-text-bold">the most bananas</span> wins!
				</p>
			</div>

			<!-- Step 2: Sabotage friends -->
			<div
				class="flex flex-col items-center px-2 py-4 text-center md:p-4"
				data-step-card
				data-step="2"
			>
				<div class="card-flip-container mb-4 max-w-[280px] md:w-[280px]">
					<div class="card-flip-inner rotate-1 {stepCardsVisible.step2 ? 'flipped' : ''}">
						<div class="card-back">
							<enhanced:img
								src={cardBack}
								alt="Card back"
								class="w-full rounded-xl shadow-2xl"
								sizes="(max-width: 430px) 240px, (max-width: 586px) 260px, 280px"
								loading="lazy"
							/>
						</div>
						<div class="card-front">
							<enhanced:img
								src="$lib/assets/cards/card_action_banana_split.jpg?w=360;280;260;240"
								alt="Banana Split card"
								class="w-full rounded-xl shadow-2xl"
								sizes="(max-width: 430px) 240px, (max-width: 586px) 260px, 280px"
								loading="lazy"
							/>
						</div>
					</div>
				</div>
				<div class="mb-2 flex items-center justify-center gap-3">
					<div
						class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#f26b4e] text-lg font-bold text-white shadow-lg"
					>
						2
					</div>
					<h3 class="step-title">Sabotage Friends</h3>
				</div>
				<p class="description-text">
					Use <span class="description-text-bold">Action Cards</span> to bamboozle your friends.
				</p>
			</div>

			<!-- Step 3: Play anytime -->
			<div
				class="flex flex-col items-center px-2 py-4 text-center md:p-4"
				data-step-card
				data-step="3"
			>
				<div class="card-flip-container mb-4 max-w-[280px] md:w-[280px]">
					<div class="card-flip-inner -rotate-1 {stepCardsVisible.step3 ? 'flipped' : ''}">
						<div class="card-back">
							<enhanced:img
								src={cardBack}
								alt="Card back"
								class="w-full rounded-xl shadow-2xl"
								sizes="(max-width: 430px) 240px, (max-width: 586px) 260px, 280px"
								loading="lazy"
							/>
						</div>
						<div class="card-front">
							<enhanced:img
								src="$lib/assets/cards/card_anytime_smash.jpg?w=360;280;260;240"
								alt="Smash card"
								class="w-full rounded-xl shadow-2xl"
								sizes="(max-width: 430px) 240px, (max-width: 586px) 260px, 280px"
								loading="lazy"
							/>
						</div>
					</div>
				</div>
				<div class="mb-2 flex items-center justify-center gap-3">
					<div
						class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#4CAF50] text-lg font-bold text-white shadow-lg"
					>
						3
					</div>
					<h3 class="step-title">Play Anytime</h3>
				</div>

				<p class="description-text">
					Players can use <span class="description-text-bold">Anytime Cards</span> to sabotage you
					even when it's your turn!
				</p>
			</div>

			<!-- Steps 4 & 5 wrapper for centering on desktop -->
			<div class="contents md:col-span-3 md:flex md:justify-center md:gap-8">
				<!-- Step 4: Chain reactions -->
				<div
					class="flex flex-col items-center px-2 py-4 text-center md:p-4"
					data-step-card
					data-step="4"
				>
					<div class="card-flip-container mb-4 max-w-[280px] md:w-[280px]">
						<div class="card-flip-inner rotate-1 {stepCardsVisible.step4 ? 'flipped' : ''}">
							<div class="card-back">
								<enhanced:img
									src={cardBack}
									alt="Card back"
									class="w-full rounded-xl shadow-2xl"
									sizes="(max-width: 430px) 240px, (max-width: 586px) 260px, 280px"
									loading="lazy"
								/>
							</div>
							<div class="card-front">
								<enhanced:img
									src="$lib/assets/cards/card_reaction_yoink.jpg?w=360;280;260;240"
									alt="Yoink card"
									class="w-full rounded-xl shadow-2xl"
									sizes="(max-width: 430px) 240px, (max-width: 586px) 260px, 280px"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
					<div class="mb-2 flex items-center justify-center gap-3">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2196F3] text-lg font-bold text-white shadow-lg"
						>
							4
						</div>
						<h3 class="step-title">Chain Reactions</h3>
					</div>
					<p class="description-text">
						Chain cards together or use <span class="description-text-bold">Reaction Cards</span>
						to interrupt the best laid plans.
					</p>
				</div>

				<!-- Step 5: Score points -->
				<div
					class="col-span-2 flex flex-col items-center px-2 py-4 text-center md:col-span-1 md:p-4"
					data-step-card
					data-step="5"
				>
					<div class="card-flip-container mb-4 max-w-[280px] md:w-[280px]">
						<div class="card-flip-inner -rotate-1 {stepCardsVisible.step5 ? 'flipped' : ''}">
							<div class="card-back">
								<enhanced:img
									src={cardBack}
									alt="Card back"
									class="w-full rounded-xl shadow-2xl"
									sizes="(max-width: 430px) 240px, (max-width: 586px) 260px, 280px"
									loading="lazy"
								/>
							</div>
							<div class="card-front">
								<enhanced:img
									src="$lib/assets/cards/card_scoring_banana_manifesto.jpg?w=360;280;260;240"
									alt="Banana Manifesto card"
									class="w-full rounded-xl shadow-2xl"
									sizes="(max-width: 430px) 240px, (max-width: 586px) 260px, 280px"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
					<div class="mb-2 flex items-center justify-center gap-3">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FFC107] text-lg font-bold text-white shadow-lg"
						>
							5
						</div>
						<h3 class="step-title">Score Points</h3>
					</div>
					<p class="description-text">
						Bananarchy ends immediately when the last Banana Card is drawn. Add your <span
							class="description-text-bold">Scoring Cards</span
						> to secure your victory.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
