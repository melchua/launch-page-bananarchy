<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '../components/Footer.svelte';

	let boxClass = $state('');
	let cardFanVisible = $state(false);
	let cardFanElement: HTMLElement;
	let stepCardsVisible = $state({
		step1: false,
		step2: false,
		step3: false,
		step4: false,
		step5: false
	});

	onMount(() => {
		setTimeout(() => {
			boxClass = 'animate-bounce-in';
		}, 300);
		// Card fan observer
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
				threshold: 0.3,
				rootMargin: '0px 0px -180px 0px' // Account for fixed footer
			}
		);

		if (cardFanElement) {
			observer.observe(cardFanElement);
		}

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
				threshold: 0.5,
				rootMargin: '0px 0px -180px 0px' // Account for fixed footer
			}
		);

		// Observe all step cards
		document.querySelectorAll('[data-step-card]').forEach((el) => {
			cardObserver.observe(el);
		});

		return () => {
			observer.disconnect();
			cardObserver.disconnect();
		};
	});
</script>

<div class="oback flex flex-grow flex-col pb-64 md:pb-40">
	<div class="relative">
		<div
			class="z-10 mx-auto flex max-w-screen-xl flex-col items-center gap-4 px-8 pb-0 pt-0 lg:flex-row lg:justify-between lg:pt-8"
		>
			<!-- Left Column: All text content (desktop) -->
			<div class="flex flex-col gap-2 md:px-24 lg:w-[75%]">
				<!-- Hero Text - order-1 on mobile -->
				<div class="order-1">
					<h2
						class="pb-1 pt-0 text-center text-2xl font-bold uppercase tracking-widest lg:text-left"
					>
						Bananarchy
					</h2>

					<h1 class="hero-headline mb-4 text-center lg:text-left">
						<span
							><span class="highlight-text">Cute</span> Monkeys. <br /><span class="highlight-text"
								>Clever</span
							>
							Tricks. <br /><span class="highlight-text">Wild</span> Plays.</span
						>
					</h1>
					<h4 class="text-center lg:text-left">
						A fast, strategic party game where every move matters.
					</h4>
				</div>

				<!-- Deluxe Box Images - order-2 on mobile, hidden on desktop (shown in right column) -->
				<div class="relative order-2 overflow-hidden lg:hidden">
					<enhanced:img
						src="$lib/assets/deluxe-box-render-kick.png"
						alt="box"
						class={`${boxClass} m-2 w-fit sm:w-[500px] md:w-[600px]`}
						sizes="(max-width: 430px) 320px, (max-width: 586px) 400px, (min-width: 640px) 640px, 80vw"
						fetchpriority="high"
					/>
					<enhanced:img
						src="$lib/assets/peel_1.png"
						alt="box"
						class={`${boxClass} -ml-[60px] -mt-[75px] w-[45%] sm:m-2 sm:-mt-[80px] sm:w-[50vw]`}
						sizes="(max-width: 430px) 180px, (max-width: 586px) 240px, 50vw"
						fetchpriority="high"
					/>
				</div>

				<!-- Hero subhead - order-3 on mobile (below image), visible inline on desktop -->
				<div
					class="order-3 rounded-xl bg-transparent pb-2 pt-4 text-center lg:order-2 lg:text-left"
				>
					<span class="hero-subhead">
						⚡️ Learn in <span class="hero-feature-highlight">60 seconds</span> <br /> ⏰ Done in
						<span class="hero-feature-highlight">30 minutes</span> <br /> 💔 Betray friends in
						<span class="hero-feature-highlight">real time</span>
					</span>
				</div>

				<!-- Game Stats - order-4 on mobile, order-2 on desktop -->
				<!-- <div class="order-4 lg:order-2">
					<p class="text-sm font-semibold tracking-wide text-white/90 text-center lg:text-left">
						<span class="inline-flex items-center gap-4">
							<span>👥 3-8 players</span>
							<span>⏱️ 15-30 mins</span>
							<span>🎯 Ages 8+</span>
						</span>
					</p>
				</div> -->
			</div>

			<!-- Right Column: Deluxe Box Images (desktop only) -->
			<div class="relative hidden lg:block">
				<enhanced:img
					src="$lib/assets/deluxe-box-render-kick.png"
					alt="box"
					class={`${boxClass} m-2 w-fit lg:w-[675px]`}
					sizes="675px"
					loading="lazy"
				/>
				<enhanced:img
					src="$lib/assets/banana-peels.png"
					alt="box"
					class={`${boxClass} m-2 -mt-[80px] w-fit lg:w-[675px]`}
					sizes="675px"
					loading="lazy"
				/>
			</div>
		</div>
	</div>

	<div class="flex flex-col items-center justify-center px-4 py-8">
		<h2 class="text-center">Your Next Game Night Starts Here</h2>

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
				class="flex flex-col items-center text-center md:ml-24 md:w-[400px] md:items-start md:gap-8 md:text-left"
			>
				<div>
					A deceptively cute card game where banana theft leads to betrayal, backstabbing, and
					hysterical laughter. Short, vicious rounds of high-energy chaos: the kind that ruins
					alliances and makes you beg for “just one more game.”
				</div>
				<ul class="space-y-2 px-2 py-6 text-left">
					<li class="flex items-start gap-2">
						<enhanced:img
							src="$lib/assets/icons/monkeyhead-128x128.png"
							alt="Monkey Head"
							class="mt-0.5 h-7 w-7 flex-shrink-0"
							sizes="28px"
							loading="lazy"
						/>
						<span
							><span class="highlight-text">Steal</span> bananas from your friends (and don't get caught!)</span
						>
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
							><span class="highlight-text">Interrupt</span> anyone, anytime, for maximum chaos</span
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
							><span class="highlight-text">Score big</span> when the moment's right—plan carefully or
							lose it all</span
						>
					</li>
				</ul>

				<div class="font-bold">Win by collecting the most bananas... if you survive the chaos</div>
			</div>
		</div>
	</div>

	<!-- How to Play Section -->
	<div class="px-2 py-6 md:px-4">
		<div class="mx-auto max-w-5xl">
			<h2 class="text-center">Learn in 60 Seconds</h2>

			<!-- Steps grid -->
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8">
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
									src="$lib/assets/cards/card_back_monkey_card.jpg?w=360;280;260;240"
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
									src="$lib/assets/cards/card_back_monkey_card.jpg?w=360;280;260;240"
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
									src="$lib/assets/cards/card_back_monkey_card.jpg?w=360;280;260;240"
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
									src="$lib/assets/cards/card_back_monkey_card.jpg?w=360;280;260;240"
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
						Chain cards together or use <span class="description-text-bold">Reaction Cards</span> to
						interrupt the best laid plans.
					</p>
				</div>

				<!-- Step 5: Score points -->
				<div
					class="flex flex-col items-center px-2 py-4 text-center md:col-span-2 md:mx-auto md:max-w-md md:p-4"
					data-step-card
					data-step="5"
				>
					<div class="card-flip-container mb-4 max-w-[280px] md:w-[280px]">
						<div class="card-flip-inner -rotate-1 {stepCardsVisible.step5 ? 'flipped' : ''}">
							<div class="card-back">
								<enhanced:img
									src="$lib/assets/cards/card_back_monkey_card.jpg?w=360;280;260;240"
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

	<div class="full">
		<h2 class="text-center">There's more...</h2>
		<div class="flex flex-col gap-4 px-4 py-0 sm:mx-36 xl:mx-48">
			<div class="w-full">
				<div class="flex flex-col-reverse items-center pb-4 sm:gap-8 lg:flex-row">
					<div class="w-full flex-1 sm:w-3/4">
						<enhanced:img
							src="$lib/assets/artwork-bg.png"
							alt="Disney artist illustration"
							class="w-full"
							sizes="(max-width: 430px) 400px, (max-width: 586px) 520px, (min-width: 640px) 640px, 100vw"
							loading="lazy"
						/>
					</div>
					<div class="flex flex-1 flex-col pb-4 pt-0">
						<h3 class="text-center xl:text-left">Illustrated by a former Disney artist</h3>
						<p class="mt-6 w-full leading-relaxed">
							Every character is thoughtfully illustrated by a <span class="highlight-text"
								>real human artist</span
							>, packed with charm, expression, and playful detail. These characters may look
							friendly, but they are <span class="highlight-text">not on your side</span>.
						</p>
					</div>
				</div>
			</div>
			<div class="w-full pt-4">
				<div class="flex flex-col-reverse items-center pb-4 sm:gap-8 lg:flex-row-reverse">
					<div class="w-full flex-1 sm:w-3/4">
						<enhanced:img
							src="$lib/assets/betrayal.png"
							alt="placeholder"
							class="w-full"
							sizes="(max-width: 430px) 400px, (max-width: 586px) 520px, (min-width: 640px) 640px, 100vw"
							loading="lazy"
						/>
					</div>
					<div class="flex flex-1 flex-col pb-4 pt-0">
						<h3 class="text-center xl:text-left">Great for parties. Terrible for friendships.</h3>
						<p class="mt-6 w-full leading-relaxed">
							It's all fun and games until someone loses a banana. Sneaky, hilarious, and <span
								class="highlight-text">impossible to stop playing</span
							>, this is the party game that tests friendships with every clever move, every stolen
							banana, and every <span class="highlight-text">unexpected betrayal</span>.
						</p>
					</div>
				</div>
			</div>
			<div class="w-full pt-4">
				<div class="flex flex-col items-center pb-4 sm:gap-8 lg:flex-row-reverse">
					<div class="flex flex-1 flex-col pb-4 pt-0">
						<h3 class="text-center xl:text-left">Waiting your turn is for other games.</h3>
						<p class="mt-6 w-full leading-relaxed">
							<span class="highlight-text">Anytime cards</span> mean nobody is safe, even when it's
							not your turn. Interrupt. Counter. Sabotage. The table stays loud, tense, and
							<span class="highlight-text">completely unhinged</span> until the final draw.
						</p>
					</div>
					<div class="w-full flex-1 sm:w-3/4">
						<enhanced:img
							src="$lib/assets/grab.png"
							alt="placeholder"
							class="w-full"
							sizes="(max-width: 430px) 400px, (max-width: 586px) 520px, (min-width: 640px) 640px, 100vw"
							loading="lazy"
						/>
					</div>
				</div>
			</div>

			<!-- Try Before You Buy CTA Section -->
			<div class="flex justify-center px-4 pt-6 md:pb-8">
				<div class="description-box max-w-3xl text-center">
					<h2 class="mb-4 text-center">
						Try It Free — <span class="highlight-text">No Strings Attached</span>
					</h2>
					<p class="description-text mb-6">
						We believe in this game so much, we want you to <span class="description-text-bold"
							>try it for free first</span
						>. Sign up and get an instant print-at-home mini-game. No credit card, no strings
						attached, just pure <span class="description-text-bold">banana-stealing chaos</span>.
					</p>
				</div>
			</div>
		</div>
	</div>

	<Footer />
</div>
