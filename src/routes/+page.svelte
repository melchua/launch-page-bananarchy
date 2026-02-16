<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '../components/Footer.svelte';

	let boxClass = '';
	let cardFanVisible = false;
	let cardFanElement: HTMLElement;

	onMount(() => {
		setTimeout(() => {
			boxClass = 'animate-bounce-in';
		}, 300);

		// Intersection Observer for card fan animation
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						cardFanVisible = true;
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.3 }
		);

		if (cardFanElement) {
			observer.observe(cardFanElement);
		}

		return () => observer.disconnect();
	});

	function scrollToSignup() {
		const footer = document.getElementById('signup-form');
		footer?.scrollIntoView({ behavior: 'smooth' });

		// Wait for scroll to complete, then focus the MailerLite input
		setTimeout(() => {
			const emailInput = footer?.querySelector('input[type="email"]') as HTMLInputElement | null;
			emailInput?.focus();
		}, 500);
	}
</script>

<div class="flex flex-col oback flex-grow pb-64 md:pb-40">
	<div class="relative">
		<div
			class="z-10 mx-auto flex max-w-screen-xl flex-col items-center gap-4 pt-0 pb-0 px-8 lg:flex-row lg:justify-between lg:pt-20"
		>
			<!-- Left Column: All text content (desktop) -->
			<div class="flex flex-col gap-2 md:px-24 lg:w-[75%]">
				<!-- Hero Text - order-1 on mobile -->
				<div class="order-1">
					<h2 class="text-2xl font-bold text-center md:text-left uppercase tracking-widest">
						Bananarchy
					</h2>
					<h1
						class="hero-headline mb-4 text-center md:text-left"
					>
					<span>The Card Game That Ends in <span class="highlight-text">Screaming</span> <span class="highlight-text">(the Good Kind)</span></span>
					</h1>
					<div class="rounded-xl py-2 bg-transparent text-lg sm:text-black text-center md:text-left">
						<span class="hero-subhead">
							Learn in <span class="hero-feature-highlight">60 seconds</span> <br /> Done in <span class="hero-feature-highlight">30 minutes</span> <br /> Betray friends in <span class="hero-feature-highlight">real time</span>
						</span>
					</div>
				</div>

				<!-- CTA Button - order-2 on mobile, order-4 on desktop (shown below stats) -->
				<div class="order-3 lg:order-4">
					<!-- <button onclick={scrollToSignup} class="cta-button w-full lg:w-auto">Get Early Access</button> -->
				</div>

				<!-- Deluxe Box Images - order-3 on mobile, hidden on desktop (shown in right column) -->
				<div class="relative order-2 lg:hidden">
					<enhanced:img
						src="$lib/assets/deluxe-box-3.png"
						alt="box"
						class={`${boxClass} m-2 w-fit sm:w-[500px] md:w-[600px]`}
						sizes="(min-width: 640px) 640px, 80vw"
					/>
					<enhanced:img
						src="$lib/assets/peel_1.png"
						alt="box"
						class={`${boxClass} sm:m-2 -ml-[100px] -mt-[75px] sm:-mt-[80px] w-[50vw]`}
						sizes="(min-width: 400px), 50vw"
					/>
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
					src="$lib/assets/deluxe-box-3.png"
					alt="box"
					class={`${boxClass} m-2 w-fit lg:w-[675px]`}
					sizes="675px"
				/>
				<enhanced:img
					src="$lib/assets/banana-peels.png"
					alt="box"
					class={`${boxClass} m-2 -mt-[80px] w-fit lg:w-[675px]`}
					sizes="675px"
				/>
			</div>
		</div>
	</div>

	<div class="py-12 px-4 flex flex-col items-center justify-center">
		
		<h2 class="text-center">Your Next Game Night Starts Here</h2>

		<div class="flex flex-col items-center justify-center md:flex-row">

			<!-- Card fan -->
			<div bind:this={cardFanElement} class="relative flex-shrink-0 w-[320px] h-[300px] md:w-[400px] md:h-[420px]">
				<enhanced:img 
						src="$lib/assets/cards/card_action_banana_republic.jpg"
						alt="Banana Republic card"
						class="card-fan w-[150px] md:w-[216px] rounded-xl shadow-2xl left-1/2 -ml-[84px] md:-ml-[108px] {cardFanVisible ? 'card-fan-1' : ''}"
						sizes="(min-width: 768px) 216px, 150px"
					/>
					<enhanced:img 
						src="$lib/assets/cards/card_anytime_toss.jpg"
						alt="Toss card"
						class="card-fan w-[150px] md:w-[216px] rounded-xl shadow-2xl left-1/2 -ml-[84px] md:-ml-[108px] {cardFanVisible ? 'card-fan-2' : ''}"
						sizes="(min-width: 768px) 216px, 150px"
					/>
					<enhanced:img 
						src="$lib/assets/cards/card_reaction_denied.jpg"
						alt="Denied card"
						class="card-fan w-[150px] md:w-[216px] rounded-xl shadow-2xl left-1/2 -ml-[84px] md:-ml-[108px] {cardFanVisible ? 'card-fan-3' : ''}"
						sizes="(min-width: 768px) 216px, 150px"
					/>
					<enhanced:img 
						src="$lib/assets/cards/card_scoring_banana_smoothie.jpg"
						alt="Banana Smoothie card"
						class="card-fan w-[150px] md:w-[216px] rounded-xl shadow-2xl left-1/2 -ml-[84px] md:-ml-[108px] {cardFanVisible ? 'card-fan-4' : ''}"
						sizes="(min-width: 768px) 216px, 150px"
					/>
			</div>

			<!-- Game description -->
			<div class="flex flex-col items-center md:gap-8 text-center md:items-start md:text-left md:ml-24 md:w-[400px]">
					<div>
						A <span class="font-bold">fast chaotic</span> card game about stealing bananas and ruining friendships.
					</div>
					<ul class="text-left p-6">
						<li class="flex flex-row items-center">
							<enhanced:img src="$lib/assets/icons/monkeyhead-128x128.png" alt="Monkey Head" class="w-7 h-7 inline-block mr-2" /><span class="highlight-text">Steal &nbsp;</span> bananas
						</li>
						<li class="flex flex-row items-center">
							<enhanced:img src="$lib/assets/icons/denied-icon-128x128.png" alt="Denied" class="w-7 h-7 inline-block mr-2" /><span class="highlight-text">Interrupt &nbsp;</span> anyone, anytime
						</li>
						<li class="flex flex-row items-center">
							<enhanced:img src="$lib/assets/icons/banana-icon-128x128.png" alt="Banana" class="w-7 h-7 inline-block mr-2" />
							<span class="highlight-text">Score &nbsp;</span> big when the moment's right
						</li>
					</ul>

					<div class="font-bold">Win by collecting the most bananas.</div>
			</div>
		</div>
	</div>
	
	<!-- How to Play Section -->
	<div class="py-6 px-2 md:px-4">
		<div class="mx-auto max-w-5xl">
			<h2 class="text-center">
				Learn in 60 Seconds
			</h2>
			
			<!-- Steps grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8">
				<!-- Step 1: Collect Bananas -->
				<div class="flex flex-col items-center text-center px-2 py-4 md:p-4">
					<enhanced:img 
						src="$lib/assets/cards/card_action_pick_&_pluck.jpg"
						alt="Pick & Pluck card"
						class="w-full max-w-[280px] md:w-[280px] rounded-xl shadow-2xl -rotate-1 mb-4"
						sizes="(min-width: 768px) 280px, 280px"
					/>
					<div class="flex items-center justify-center gap-3 mb-2">
						<div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#f26b4e] text-white font-bold text-lg shadow-lg flex-shrink-0">1</div>
						<h3 class="step-title">Collect Bananas</h3>
					</div>
					<p class="description-text">
						Whoever has <span class="description-text-bold">the most bananas</span> wins!
					</p>
				</div>

			<!-- Step 2: Sabotage friends -->
			<div class="flex flex-col items-center text-center px-2 py-4 md:p-4">
					<enhanced:img 
						src="$lib/assets/cards/card_action_banana_split.jpg"
						alt="Banana Split card"
						class="w-full max-w-[280px] md:w-[280px] rounded-xl shadow-2xl rotate-1 mb-4"
						sizes="(min-width: 768px) 280px, 280px"
					/>
					<div class="flex items-center justify-center gap-3 mb-2">
						<div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#f26b4e] text-white font-bold text-lg shadow-lg flex-shrink-0">2</div>
						<h3 class="step-title">Sabotage Friends</h3>
					</div>
					<p class="description-text">
						Use <span class="description-text-bold">Action Cards</span> to bamboozle your friends.
					</p>
				</div>
		

			<!-- Step 3: Play anytime -->
			<div class="flex flex-col items-center text-center px-2 py-4 md:p-4">
					<enhanced:img 
						src="$lib/assets/cards/card_anytime_smash.jpg"
						alt="Smash card"
						class="w-full max-w-[280px] md:w-[280px] rounded-xl shadow-2xl -rotate-1 mb-4"
						sizes="(min-width: 768px) 280px, 280px"
					/>
					<div class="flex items-center justify-center gap-3 mb-2">
						<div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#4CAF50] text-white font-bold text-lg shadow-lg flex-shrink-0">3</div>
						<h3 class="step-title">Play Anytime</h3>
					</div>
		
					<p class="description-text">
						Players can use <span class="description-text-bold">Anytime Cards</span> to sabotage you even when it's your turn!
					</p>
				</div>

			<!-- Step 4: Chain reactions -->
			<div class="flex flex-col items-center text-center px-2 py-4 md:p-4">
					<enhanced:img 
						src="$lib/assets/cards/card_reaction_yoink.jpg"
						alt="Yoink card"
						class="w-full max-w-[280px] md:w-[280px] rounded-xl shadow-2xl rotate-1 mb-4"
						sizes="(min-width: 768px) 280px, 280px"
					/>
					<div class="flex items-center justify-center gap-3 mb-2">
						<div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#2196F3] text-white font-bold text-lg shadow-lg flex-shrink-0">4</div>
						<h3 class="step-title">Chain Reactions</h3>
					</div>
					<p class="description-text">
						Chain cards together or use <span class="description-text-bold">Reaction Cards</span> to interrupt the best laid plans.
					</p>
			</div>

			<!-- Step 5: Score points -->
			<div class="flex flex-col items-center text-center px-2 py-4 md:p-4 md:col-span-2 md:max-w-md md:mx-auto">
					<enhanced:img 
						src="$lib/assets/cards/card_scoring_banana_manifesto.jpg"
						alt="Banana Manifesto card"
						class="w-full max-w-[280px] md:w-[280px] rounded-xl shadow-2xl -rotate-1 mb-4"
						sizes="(min-width: 768px) 280px, 280px"
					/>
					<div class="flex items-center justify-center gap-3 mb-2">
						<div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#FFC107] text-white font-bold text-lg shadow-lg flex-shrink-0">5</div>
						<h3 class="step-title">Score Points</h3>
					</div>
					<p class="description-text">
						Bananarchy ends immediately when the last Banana Card is drawn. Add your <span class="description-text-bold">Scoring Cards</span> to secure your victory.
					</p>
			</div>
		</div>
		</div>
	</div>

	<div class="full">
		<h2 class="text-center">
			There's more...
		</h2>
		<div class="flex flex-col gap-4 px-4 py-0 lg:mx-24 xl:mx-48">
			<div class="w-full">
				<div class="flex flex-col-reverse items-center sm:gap-4 xl:flex-row">
					<div class="w-[100vw] flex-1 sm:w-3/4">
						<enhanced:img
							src="$lib/assets/artwork-bg.png"
							alt="Disney artist illustration"
							class="w-full"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
					<div class="flex-1 pt-0 pb-4 items-center flex flex-col">
						<h3 class="text-center md:text-left">
						Illustrated by a former Disney artist
						</h3>
						<p class="mt-6 sm:mx-10 lg:mx-20 leading-relaxed sm:max-w-[80%] w-full">
							Every character is thoughtfully illustrated by a <span class="highlight-text">real human artist</span>,
							packed with charm, expression, and playful detail.
							These characters may look friendly,
							but they are <span class="highlight-text">not on your side</span>.
						</p>
					</div>
				</div>
			</div>
			<div class="w-full pt-4">
				<div class="flex flex-col-reverse items-center sm:gap-4 xl:flex-row-reverse">
					<div class="w-[100vw] flex-1 sm:w-3/4">
						<enhanced:img
							src="$lib/assets/betrayal.png"
							alt="placeholder"
							class="w-full"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
					<div class="flex-1 items-center flex flex-col pt-0 pb-4">
						<h3
							class="text-center md:text-left"
						>
						Great for parties. Terrible for friendships.
						</h3>
						<p class="mt-6 sm:mx-10 lg:mx-20 leading-relaxed sm:max-w-[80%] w-full">
							It's all fun and games until someone loses a banana. Sneaky, hilarious, and <span class="highlight-text">impossible to stop playing</span>,
							this is the party game that tests friendships with every clever move,
							every stolen banana, and every <span class="highlight-text">unexpected betrayal</span>.
						</p>
					</div>
				</div>
			<div class="w-full pt-4">
				<div class="flex flex-col items-center sm:gap-4 xl:flex-row-reverse">
					<div class="flex-1 pt-0 pb-4 items-center flex flex-col">
						<h3
							class="text-center md:text-left"
						>
						Waiting your turn is for other games.
						</h3>
						<p class="mt-6 sm:mx-10 lg:mx-20 leading-relaxed sm:max-w-[80%] w-full">
							<span class="highlight-text">Anytime cards</span> mean nobody is safe, even when it's not your turn. 
							Interrupt. Counter. Sabotage. The table stays loud, tense, 
							and <span class="highlight-text">completely unhinged</span> until the final draw.
						</p>
					</div>
					<div class="w-[100vw] flex-1 sm:w-3/4">
						<enhanced:img
							src="$lib/assets/grab.png"
							alt="placeholder"
							class="w-full"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
				</div>
			</div>


			<!-- Try Before You Buy CTA Section -->
			<div class="pt-6 pb-0 px-4 flex justify-center">
				<div class="description-box max-w-3xl text-center">
					<h2 class="mb-4 text-center">Try It Free—No Strings Attached</h2>
					<p class="description-text mb-6">
						We believe in this game so much, we want you to <span class="description-text-bold">try it for free first</span>.
						Sign up and get an instant print-at-home taster deck—no credit card, no strings attached,
						just pure <span class="description-text-bold">banana-stealing chaos</span>.
					</p>
				</div>
			</div>
			
			
			</div>
		</div>
	</div>

	<Footer />
</div>
