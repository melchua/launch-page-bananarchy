<script lang="ts">
	import { onMount } from 'svelte';
	import ConcentricCircles from '../components/ConcentricCircles.svelte';
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

<div class="flex min-h-screen flex-col">
	<div class="oback relative h-[900px] overflow-hidden lg:h-[670px]">
		<div
			class="absolute left-[-100%] z-[-1] flex h-[500px] justify-center p-10 opacity-60 mobile-xxs:left-[-85%] mobile-xs:left-[-55%] mobile-sm:left-[-50%] sm:left-[-34%] sm:top-[-4%] md:left-[-10%] lg:left-[32%] lg:top-[-35%] xl:left-[39%] 2xl:left-[42%]"
		>
			<!-- <ConcentricCircles /> -->
		</div>
		<div
			class="z-10 mx-auto flex max-w-screen-xl flex-col items-center gap-4 p-8 lg:flex-row lg:justify-between lg:pt-20"
		>
			<div class="flex flex-col gap-2 md:px-24 lg:w-[75%]">
				<h1
					class="hero-headline"
				>
					UNO + Exploding Kittens <span class="highlight-text"><br/>had a monkey baby.</span>
				</h1>
				<div class="rounded-xl bg-transparent text-lg sm:text-black">
					<span class="hero-subhead">A <span class="highlight-text hightlight-text-underline">fast, always-on</span> party card game where you can <span class="highlight-text hightlight-text-underline">interrupt</span> anyone. <span class="highlight-text">
					<p><span class="highlight-text hightlight-text-underline">Cute</span> on the outside,
					<span class="highlight-text hightlight-text-underline">savage</span> on the inside.</p></span>	
					</span>
				</div>
				<div>
					<button onclick={scrollToSignup} class="cta-button w-full sm:w-auto">Get Early Access</button>
						<ul class="hero-subhead-list mx-auto w-fit sm:w-full sm:p-4">
							<li>⏰ Get notified the moment we go  	live</li>
							<li>🎥 Behind-the-scenes updates</li>
							<li>🚀 Early access to back before the public</li>
							<li>🍌 No spam, just bananas</li>
						</ul>
				</div>
			</div>
			<div class="relative">
				<enhanced:img
					src="$lib/assets/deluxe-box1.png"
					alt="box"
					class={`${boxClass} sm:flex-2 m-2 w-3/5 sm:w-[675px]`}
					sizes="(min-width: 640px) 640px, 80vw"
				/>
			</div>
		</div>
	</div>
	<Footer />

	<div class="section">
		<h1 class="section-headline ">Why People Lose Their Minds Over Bananarchy</h1>
		<!-- <ul>
			<li>🃏 Always-on gameplay — no waiting for your turn</li>
			<li>💥 Interrupt, counter, and sabotage in real time</li>
			<li>😂 Loud, social, and unhinged fun</li>
			<li>🎉 Perfect for parties, game nights, and friend betrayal</li>
		</ul> -->

		<!-- Testimonial -->
		<div class="testimonial">
			<p class="testimonial-quote">
				Bananarchy leans hard into fast, chaotic, always-on card play, and that's exactly where its appeal lies.
			</p>
			<p class="testimonial-source">
				— <a href="https://www.whatboardgame.com/post/bananarchy-card-game-review" target="_blank" rel="noopener noreferrer">WhatBoardGame</a>
			</p>
		</div>
	</div>


	<div class="full bg-baorange-300 text-white">
		<div class="flex flex-col gap-4 p-4 pt-10 lg:mx-24 xl:mx-48">
			<div class="w-full">
				<div class="flex flex-col items-center gap-4 lg:flex-row">
					<div class="flex-1 py-8">
						<h2
							class="section-subheadline sm:px-10 lg:px-20"
						>
							Always-on gameplay — no waiting for your turn
						</h2>
						<p class="mt-2 text-black sm:px-10 lg:px-20">
							Anytime cards mean you almost never have to wait your turn.
						</p>
					</div>
					<div class="w-[100vw] flex-1">
						<enhanced:img
							src="$lib/assets/shield-snatch-smash.png"
							alt="placeholder"
							class="w-full rounded-sm"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
				</div>
			</div>
			<div class="w-full">
				<div class="flex flex-col-reverse items-center gap-4 lg:flex-row">
					<div class="w-[100vw] flex-1 py-8">
						<enhanced:img
							src="$lib/assets/kitchen.png"
							alt="placeholder"
							class="w-full rounded-sm"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
					<div class="flex-1 py-8">
						<h2
							class="section-subheadline sm:px-10 lg:px-20"
						>
						Strong “take that” energy and dramatic moments
						</h2>
						<p class="mt-2 text-black sm:px-10 lg:px-20">
							Pop in, cause a little chaos, and scamper away. Interrupt, counter, and sabotage in real time.
						</p>
					</div>
				</div>
			</div>
			<div class="w-full">
				<div class="flex flex-col items-center gap-4 lg:flex-row">
					<div class="flex-1 py-8">
						<h2
							class="section-subheadline sm:px-10 lg:px-20"
						>
						Perfect for parties, game nights, and friend betrayal
						</h2>
						<p class="mt-2 text-black sm:px-10 lg:px-20">
							Cute chaos with a strong chance of emotional damage.
						</p>
					</div>
					<div class="w-[100vw] flex-1 py-8">
						<enhanced:img
							src="$lib/assets/surprisegorilla.png"
							alt="placeholder"
							class="w-full rounded-sm"
							sizes="(min-width: 640px) 640px, 100vw"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Footer />
</div>
