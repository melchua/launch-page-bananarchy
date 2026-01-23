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
	<div class="relative h-[900px] overflow-hidden sm:h-[1000px] md:h-[1300px] lg:h-[800px]">
		<div
			class="z-10 mx-auto flex max-w-screen-xl flex-col items-center gap-4 p-8 lg:flex-row lg:justify-between lg:pt-20"
		>
			<div class="flex flex-col gap-2 md:px-24 lg:w-[75%]">
				<h1
					class="hero-headline mb-4"
				>
					UNO + Exploding Kittens <span class="highlight-text"><br/>had a monkey baby.</span>
				</h1>
				<div class="mb-5 rounded-xl bg-transparent text-lg sm:text-black">
					<span class="hero-subhead">
						<span class="highlight-text hightlight-text-underline">
							Bananarchy
						</span> 
						is a 
						<span class="highlight-text hightlight-text-underline">
							fast, always-on
						</span> 
						party card game where you can 
							<span class="highlight-text hightlight-text-underline">deny
							</span> anyone. 
						<span class="highlight-text">
							<span class="highlight-text hightlight-text-underline">Cute</span> on the outside,
							<span class="highlight-text hightlight-text-underline">savage</span> on the inside.
						</span>	
						Can you grab all the bananas before your friends turn on you?
					</span>

					<p class="mt-4 text-sm font-semibold tracking-wide text-white/90">
						<span class="inline-flex items-center gap-4">
							<span>👥 3-8 players</span>
							<span>⏱️ 15-30 mins</span>
							<span>🎯 Ages 14+</span>
						</span>
					</p>
				</div>
				<div class="space-y-4">
					<button onclick={scrollToSignup} class="cta-button w-full sm:w-auto">Get Early Access</button>
						<ul class="hero-subhead-list mx-auto w-fit sm:w-full sm:p-4 tracking-wide md:tracking-normal">
							<li>⏰ Get notified the moment we go live</li>
							<li>🎥 Behind-the-scenes updates</li>
							<!-- <li>🚀 Early access to back before the public</li> -->
							<li>🍌 No spam, just bananas</li>
						</ul>
				</div>
			</div>
			<div class="relative">
				<enhanced:img
					src="$lib/assets/deluxe-box-2.png"
					alt="box"
					class={`${boxClass} m-2 w-fit sm:w-[500px] md:w-[600px] lg:w-[675px]`}
					sizes="(min-width: 640px) 640px, 80vw"
				/>
				<enhanced:img
					src="$lib/assets/banana-peels.png"
					alt="box"
					class={`${boxClass} m-2 -mt-[80px] w-fit sm:w-[500px] md:w-[600px] lg:w-[675px]`}
					sizes="(min-width: 640px) 640px, 80vw"
				/>
			</div>
		</div>
			<!-- Kickstarter Launch Badge -->
		<div class="absolute bottom-6 left-1/2 -translate-x-1/2 lg:bottom-8">
			<div class="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 rounded-2xl sm:rounded-full bg-black/25 backdrop-blur-lg px-4 py-2 sm:px-5 sm:py-2.5 border border-white/30 shadow-lg">
				<span class="text-white text-sm font-semibold tracking-wide drop-shadow-sm hidden sm:block">Launching on</span>
				<enhanced:img
					src="$lib/assets/kickstarter-full-logo.png"
					alt="kickstarter logo"
					sizes="(min-width: 100px) 100px"
					class="h-3 sm:h-4 w-auto drop-shadow-md"
				/>
				<span class="text-white text-xs sm:text-sm font-semibold tracking-wide drop-shadow-sm">
					May 2026
				</span>
			</div>
		</div>
	</div>
	<Footer />


	<!-- Testimonial -->
	<div class="relative mx-auto max-w-[850px]">
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
	</div>



	<div class="full text-white">
		<div class="flex flex-col gap-4 p-4 lg:mx-24 xl:mx-48">
			<div class="w-full">
				<div class="flex flex-col items-center gap-8 lg:flex-row">
					<div class="flex-1 py-4">
						<h2
							class="section-subheadline sm:px-10 lg:px-20"
						>
						Waiting your turn is for other games.
						</h2>
						<p class="mt-6 overlay-panel sm:mx-10 lg:mx-20 leading-relaxed">
							Anytime cards mean nobody is safe, even when it’s not your turn. 
							Interrupt. Counter. Sabotage. The table stays loud, tense, 
							and completely unhinged until the final draw.
						</p>
					</div>
					<div class="w-[100vw] flex-1">
						<enhanced:img
							src="$lib/assets/grab.png"
							alt="placeholder"
							class="w-full rounded-xl"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
				</div>
			</div>
			<div class="w-full">
				<div class="flex flex-col-reverse items-center gap-8 lg:flex-row">
					<div class="w-[100vw] flex-1 py-4">
						<enhanced:img
							src="$lib/assets/betrayal.png"
							alt="placeholder"
							class="w-full rounded-xl"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
					<div class="flex-1 py-4">
						<h2
							class="section-subheadline sm:px-10 lg:px-20"
						>
						Great for parties. Terrible for friendships.
						</h2>
						<p class="mt-6 overlay-panel sm:mx-10 lg:mx-20 leading-relaxed">
							It’s all fun and games until someone loses a banana. Sneaky, hilarious, and impossible to stop playing, 
							this is the party game that tests friendships with every clever move, 
							every stolen banana, and every unexpected betrayal.					
						</p>
					</div>
				</div>
			</div>
			<div class="w-full">
				<div class="flex flex-col-reverse items-center gap-8 lg:flex-row">
					<div class="w-[100vw] flex-1 py-4">
						<enhanced:img
							src="$lib/assets/artwork-bg.png"
							alt="Disney artist illustration"
							class="w-full rounded-xl"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
					<div class="flex-1 py-4">
						<h2
							class="section-subheadline sm:px-10 lg:px-20"
						>
						Illustrated by a former Disney artist
						</h2>
						<p class="mt-6 overlay-panel sm:mx-10 lg:mx-20 leading-relaxed">
							Every character is thoughtfully illustrated by a real human artist, 
							packed with charm, expression, and playful detail. 
							These characters may look friendly, 
							but they are not on your side.
						</p>
					</div>
				</div>
			</div>
			<div class="w-full">
				<div class="flex flex-col items-center gap-8 lg:flex-row">
					<div class="flex-1 py-4">
						<h2
							class="section-subheadline sm:px-10 lg:px-20"
						>
						Easy to learn. Quick to get going
						</h2>
						<p class="mt-6 overlay-panel sm:mx-10 lg:mx-20 leading-relaxed">
							Pick up the rules in minutes and start playing right away, but don’t be fooled—every move counts. 
							Timing, strategy, and clever plays make this simple game surprisingly deep, keeping every player on 
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
			</div>
		</div>
	</div>

	<Footer />
</div>
