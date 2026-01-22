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
	<div class="relative h-[900px] overflow-hidden sm:h-[1000px] md:h-[1200px] lg:h-[670px] xl:h-[800px]">
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
					<span class="hero-subhead">A <span class="highlight-text hightlight-text-underline">fast, always-on</span> party card game where you can <span class="highlight-text hightlight-text-underline">interrupt</span> anyone. <span class="highlight-text">
					<p><span class="highlight-text hightlight-text-underline">Cute</span> on the outside,
					<span class="highlight-text hightlight-text-underline">savage</span> on the inside.</p></span>	
					</span>
					<p class="mt-4 text-sm font-semibold tracking-wide text-white/90">
						<span class="inline-flex items-center gap-4">
							<span>👥 3-8 players</span>
							<span>⏱️ 15-30 mins</span>
							<span>🎯 Ages 13+</span>
						</span>
					</p>
				</div>
				<div class="space-y-4">
					<button onclick={scrollToSignup} class="cta-button w-full sm:w-auto">Get Early Access</button>
						<ul class="hero-subhead-list mx-auto w-fit sm:w-full sm:p-4">
							<li>⏰ Get notified the moment we go  	live</li>
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
						You're always in the game
						</h2>
						<p class="mt-6 overlay-panel sm:mx-10 lg:mx-20 leading-relaxed">
							Anytime cards allow you to play whenever you want. Interrupt anyone. Flip the table in real time. 
							Loud, lively, and unpredictable until the final draw.
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
							Don’t let the adorable art fool you. This game is built for mischievous moves, sudden reversals, 
							and perfectly timed backstabs. It’s sweet, savage, and impossible to play just once.						</p>
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
							Expressive, mischievous, and full of personality. These aren't stock illustrations — they're characters you'll recognize by the end of your first game.
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
						Just when you think you're safe...
						</h2>
						<p class="mt-6 overlay-panel sm:mx-10 lg:mx-20 leading-relaxed">
							<!-- Cute chaos with a strong chance of emotional damage. -->
							Someone pulls the rug out. Steal bananas, flip them rotten, counter the counter. The lead changes constantly. No one runs away with it.
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
