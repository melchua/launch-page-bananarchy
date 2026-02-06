<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '../components/Footer.svelte';

	let boxClass = '';

	onMount(() => {
		setTimeout(() => {
			boxClass = 'animate-bounce-in';
		}, 300);
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

<div class="flex min-h-screen flex-col oback">
	<div class="relative">
		<div
			class="z-10 mx-auto flex max-w-screen-xl flex-col items-center gap-4 pt-0 pb-0 px-8 lg:flex-row lg:justify-between lg:pt-20"
		>
			<!-- Left Column: All text content (desktop) -->
			<div class="flex flex-col gap-2 md:px-24 lg:w-[75%]">
				<!-- Hero Text - order-1 on mobile -->
				<div class="order-1">
					<h3 class="text-2xl font-bold text-center md:text-left uppercase tracking-widest">
						Bananarchy
					</h3>
					<h1
						class="hero-headline mb-4 text-center md:text-left"
					>
					<span>Easy to learn. Don't trust anyone.</span>
					</h1>
					<div class="rounded-xl bg-transparent text-lg sm:text-black text-center md:text-left">
						<span class="hero-subhead">
							Think UNO meets Exploding Kittens with way more betrayal... and monkeys.
							<span class="highlight-text">A fast, chaotic party card game.</span>
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

				<!-- Early Access Benefits - order-5 on mobile, order-5 on desktop -->
				<div class="order-5 space-y-4 mt-4 hidden lg:block">
					<!-- Early Access Benefits -->
					<ul class="hero-subhead-list mx-auto w-fit sm:w-full sm:p-4 tracking-wide md:tracking-normal hidden md:block">
						<li>🆓 Free Print & Play PDF — play tonight</li>
						<li>🚀 Launch day alert + early bird access</li>
						<li>🍌 First dibs on $1 VIP Banana Expansion</li>
						<li>🍌 No spam, just bananas</li>
					</ul>
				</div>
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
		<Footer />
			<!-- Kickstarter Launch Badge -->
		<!-- <div class="absolute bottom-6 left-1/2 -translate-x-1/2 lg:bottom-8">
			<div class="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 rounded-2xl sm:rounded-full bg-black/25 backdrop-blur-lg px-4 py-2 sm:px-5 sm:py-2.5 border border-white/30 shadow-lg">
				<span class="text-white text-sm font-semibold tracking-wide drop-shadow-sm hidden sm:block whitespace-nowrap">Launching on</span>
				<enhanced:img
					src="$lib/assets/kickstarter-full-logo.png"
					alt="kickstarter logo"
					sizes="(min-width: 100px) 100px"
					class="h-3 sm:h-4 w-auto drop-shadow-md"
				/>
				<span class="text-white text-xs sm:text-sm font-semibold tracking-wide drop-shadow-sm whitespace-nowrap">
					May 2026
				</span>
			</div>
		</div> -->
	</div>

	<!-- About Bananarchy Section -->
	<div class="py-12 px-4">
		<div class="mx-auto max-w-4xl">
			<h2 class="section-headline text-center mb-8">
				About <span class="highlight-text">Bananarchy</span>
			</h2>
			<div class="flex flex-col md:flex-row items-center gap-8">
				<!-- Card image -->
				<div class="flex-shrink-0">
					<enhanced:img 
						src="$lib/assets/cards/card_action_pick_&_pluck.jpg"
						alt="Pick & Pluck card"
						class="w-[220px] md:w-[280px] rounded-xl shadow-2xl -rotate-3"
						sizes="(min-width: 768px) 280px, 220px"
					/>
				</div>
				<!-- Description -->
				<div class="text-white text-center md:text-left">
					<p class="text-lg md:text-xl leading-relaxed">
						In Bananarchy, <span class="desc-highlight">cheeky monkeys</span> steal bananas and disrupt each other at every turn. 
						Play cards to <span class="desc-highlight">act, interrupt, and react</span> as chaos unfolds, then score when the moment is right.
					</p>
					<p class="text-lg md:text-xl leading-relaxed mt-4">
						Your goal: <span class="desc-highlight">collect the most bananas</span> to win.
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- How to Play Section -->
	<div class="py-12 px-2 md:px-4">
		<div class="mx-auto max-w-5xl">
			<h2 class="section-headline text-center mb-10">
				How to <span class="highlight-text">Play</span>
			</h2>
			
			<!-- Steps grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8">
				<!-- Step 1: Collect Bananas -->
				<div class="flex flex-col items-center text-center px-2 md:p-4">
					<enhanced:img 
						src="$lib/assets/cards/card_action_pick_&_pluck.jpg"
						alt="Pick & Pluck card"
						class="w-full max-w-[280px] md:w-[200px] rounded-xl shadow-2xl -rotate-1 mb-4"
						sizes="(min-width: 768px) 200px, 280px"
					/>
					<div class="flex items-center justify-center gap-3 mb-2">
						<div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#f26b4e] text-white font-bold text-lg shadow-lg flex-shrink-0">1</div>
						<h3 class="step-title">Collect Bananas</h3>
					</div>
					<p class="text-white/90 leading-relaxed text-lg">
						The goal of Bananarchy is simple: <span class="desc-highlight">collect the most bananas</span> to win.
					</p>
				</div>

				<!-- Step 2: Sabotage friends -->
				<div class="flex flex-col items-center text-center px-2 md:p-4">
					<enhanced:img 
						src="$lib/assets/cards/card_action_banana_split.jpg"
						alt="Banana Split card"
						class="w-full max-w-[280px] md:w-[200px] rounded-xl shadow-2xl rotate-1 mb-4"
						sizes="(min-width: 768px) 200px, 280px"
					/>
					<div class="flex items-center justify-center gap-3 mb-2">
						<div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#f26b4e] text-white font-bold text-lg shadow-lg flex-shrink-0">2</div>
						<h3 class="step-title">Sabotage Friends</h3>
					</div>
					<p class="text-white/90 leading-relaxed text-lg">
						On your turn use powerful <span class="desc-highlight">Action Cards</span> to steal bananas and bamboozle your friends.
					</p>
				</div>

				<!-- Step 3: Play anytime -->
				<div class="flex flex-col items-center text-center px-2 md:p-4">
					<enhanced:img 
						src="$lib/assets/cards/card_anytime_smash.jpg"
						alt="Smash card"
						class="w-full max-w-[280px] md:w-[200px] rounded-xl shadow-2xl -rotate-1 mb-4"
						sizes="(min-width: 768px) 200px, 280px"
					/>
					<div class="flex items-center justify-center gap-3 mb-2">
						<div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#4CAF50] text-white font-bold text-lg shadow-lg flex-shrink-0">3</div>
						<h3 class="step-title">Play Anytime</h3>
					</div>
					<p class="text-white/90 leading-relaxed text-lg">
						Beware! Other players can use <span class="desc-highlight">Anytime Cards</span> to sabotage you even when it's your turn!
					</p>
				</div>

				<!-- Step 4: Chain reactions -->
				<div class="flex flex-col items-center text-center px-2 md:p-4">
					<enhanced:img 
						src="$lib/assets/cards/card_reaction_yoink.jpg"
						alt="Yoink card"
						class="w-full max-w-[280px] md:w-[200px] rounded-xl shadow-2xl rotate-1 mb-4"
						sizes="(min-width: 768px) 200px, 280px"
					/>
					<div class="flex items-center justify-center gap-3 mb-2">
						<div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#2196F3] text-white font-bold text-lg shadow-lg flex-shrink-0">4</div>
						<h3 class="step-title">Chain Reactions</h3>
					</div>
					<p class="text-white/90 leading-relaxed text-lg">
						Chain cards together or use <span class="desc-highlight">Reaction Cards</span> to interrupt the best laid plans.
					</p>
				</div>

				<!-- Step 5: Score points -->
				<div class="flex flex-col items-center text-center px-2 md:p-4 md:col-span-2 md:max-w-md md:mx-auto">
					<enhanced:img 
						src="$lib/assets/cards/card_scoring_banana_manifesto.jpg"
						alt="Banana Manifesto card"
						class="w-full max-w-[280px] md:w-[200px] rounded-xl shadow-2xl -rotate-1 mb-4"
						sizes="(min-width: 768px) 200px, 280px"
					/>
					<div class="flex items-center justify-center gap-3 mb-2">
						<div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#FFC107] text-white font-bold text-lg shadow-lg flex-shrink-0">5</div>
						<h3 class="step-title">Score Points</h3>
					</div>
					<p class="text-white/90 leading-relaxed text-lg">
						Bananarchy ends immediately when the last Banana Card is drawn. Add your <span class="desc-highlight">Scoring Cards</span> to secure your victory.
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Testimonial -->
	<!-- <div class="relative mx-auto max-w-[850px]">
		<div class="testimonial">
			<p class="testimonial-quote">
				Bananarchy leans hard into fast, chaotic, always-on card play, and that's exactly where its appeal lies.
			</p>
			<p class="testimonial-source">
				— <a href="https://www.whatboardgame.com/post/bananarchy-card-game-review" target="_blank" rel="noopener noreferrer">WhatBoardGame</a>
			</p>
		</div>
		<enhanced:img
			src="$lib/assets/leaf-shadow2.png"
			alt="leaf shadow"
			class="absolute -bottom-4 -right-[-2px] md:-right-2 lg:-right-4 w-24 sm:w-32"
			sizes="(min-width: 100px) 100px"
		/>
	</div> -->

	<!-- How to Play Section -->
	<!-- <div class="py-10">
		<div class="mx-auto max-w-[850px] px-4">
			<h2 class="section-headline mb-4 text-center sm:mb-6">
				<span class="highlight-text">Learn to play</span> in 1 minute
			</h2>
			<div class="relative w-full" style="aspect-ratio: 16 / 9;">
				<iframe
					class="absolute inset-0 h-full w-full rounded-xl shadow-2xl"
					src="https://www.youtube.com/embed/O-Nq7IjRo70"
					title="How to Play Bananarchy"
					frameborder="0"
					loading="lazy"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</div> -->

	<div class="full text-white">
		<div class="flex flex-col gap-4 p-4 lg:mx-24 xl:mx-48">
			<div class="w-full">
				<div class="flex flex-col-reverse items-center sm:gap-4 xl:flex-row">
					<div class="w-[100vw] flex-1 sm:w-3/4">
						<enhanced:img
							src="$lib/assets/artwork-bg.png"
							alt="Disney artist illustration"
							class="w-full rounded-xl"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
					<div class="flex-1 py-4 items-center flex flex-col">
						<h2
							class="section-subheadline sm:px-10 lg:px-20 text-center"
						>
						Illustrated by a former Disney artist
						</h2>
						<p class="mt-6 overlay-panel sm:mx-10 lg:mx-20 leading-relaxed sm:max-w-[80%] w-full">
							Every character is thoughtfully illustrated by a <span class="desc-highlight">real human artist</span>,
							packed with charm, expression, and playful detail.
							These characters may look friendly,
							but they are <span class="desc-highlight">not on your side</span>.
						</p>
					</div>
				</div>
			</div>
			<div class="w-full pt-4">
				<div class="flex flex-col-reverse items-center sm:gap-4 xl:flex-row-reverse">
					<div class="w-[100vw] flex-1 py-4 sm:w-3/4">
						<enhanced:img
							src="$lib/assets/betrayal.png"
							alt="placeholder"
							class="w-full rounded-xl"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
					<div class="flex-1 items-center flex flex-col">
						<h2
							class="section-subheadline sm:px-10 lg:px-20 text-center"
						>
						Great for parties. Terrible for friendships.
						</h2>
						<p class="mt-6 overlay-panel sm:mx-10 lg:mx-20 leading-relaxed sm:max-w-[80%] w-full">
							It's all fun and games until someone loses a banana. Sneaky, hilarious, and <span class="desc-highlight">impossible to stop playing</span>,
							this is the party game that tests friendships with every clever move,
							every stolen banana, and every <span class="desc-highlight">unexpected betrayal</span>.
						</p>
					</div>
				</div>
			<div class="w-full pt-4 pb-10">
				<div class="flex flex-col items-center sm:gap-4 xl:flex-row-reverse">
					<div class="flex-1 py-4 items-center flex flex-col">
						<h2
							class="section-subheadline sm:px-10 lg:px-20 text-center"
						>
						Waiting your turn is for other games.
						</h2>
						<p class="mt-6 overlay-panel sm:mx-10 lg:mx-20 leading-relaxed sm:max-w-[80%] w-full">
							<span class="desc-highlight">Anytime cards</span> mean nobody is safe, even when it's not your turn. 
							Interrupt. Counter. Sabotage. The table stays loud, tense, 
							and <span class="desc-highlight">completely unhinged</span> until the final draw.
						</p>
					</div>
					<div class="w-[100vw] flex-1 sm:w-3/4">
						<enhanced:img
							src="$lib/assets/grab.png"
							alt="placeholder"
							class="w-full rounded-xl"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
				</div>
			</div>
			
			
			</div>
			
			<!-- <div class="w-full">
				<div class="flex flex-col items-center gap-8 lg:flex-row">
					<div class="flex-1 py-4">
						<h2
							class="section-subheadline sm:px-10 lg:px-20"
						>
						Easy to learn. Quick to get going
						</h2>
						<p class="mt-6 overlay-panel sm:mx-10 lg:mx-20 leading-relaxed">
							Pick up the rules in <span class="desc-highlight">minutes</span> and start playing right away, but don't be fooled—every move counts. 
							Timing, strategy, and clever plays make this simple game <span class="desc-highlight">surprisingly deep</span>, keeping every player on 
							their toes.						
						</p>
					</div>
					<div class="w-[100vw] flex-1 py-4">
						<enhanced:img
							src="$lib/assets/surprisegorilla.png"
							alt="placeholder"
							class="w-full rounded-xl"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
				</div>
			</div> -->
		</div>
	</div>

	<Footer />
</div>
