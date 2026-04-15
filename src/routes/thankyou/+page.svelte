<!-- After sucessful payment, we should redirect back to the final page in the funnel to get them to sign-up to facebook or discord
 exclusive VIP page. https://docs.stripe.com/payment-links/post-payment#:~:text=After%20a%20successful%20payment%2C%20your,or%20editing%20a%20payment%20link.
  
  -->

<script context="module" lang="ts">
	declare const fbq: (command: string, event: string, params?: Record<string, any>) => void;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import cards from '$lib/assets/vip-exclusive.png?enhanced';
	import { Award, Handshake, ShieldCheck } from 'lucide-svelte';
	import { ConfettiExplosion } from 'svelte-confetti-explosion';

	let showConfetti = true;

	const benefits = [
		{
			title: '100% Refund Guarantee',
			description:
				'Changed your mind? No problem. Get a full refund anytime before the Kickstarter campaign ends—no questions asked.',
			icon: Award
		},
		{
			title: 'Transparency Guarantee',
			description:
				'We will keep you in the loop with regular updates on production, shipping timelines, and any bumps along the way. No surprises.',
			icon: Handshake
		},
		{
			title: 'Secure Payment',
			description:
				'Payments are processed by Stripe. Your card details are encrypted and never stored on our servers.',
			icon: ShieldCheck
		}
	];

	const SUBTITLE = 'You unlocked the exclusive Monkey Business mini-expansion!';
	const TITLE = 'Claim your FREE Monkey Business expansion — just $1 to reserve.';

	// Track Lead event when landing on thank you page (means they signed up)
	onMount(() => {
		if (!browser) return;

		// Only track Lead once per session to prevent duplicate tracking on page refresh
		const leadTrackedKey = 'lead_tracked';
		const alreadyTracked = sessionStorage.getItem(leadTrackedKey);

		if (!alreadyTracked) {
			// Wait for window.fbq to be available (handles race condition with layout onMount)
			let attempts = 0;
			const maxAttempts = 20; // 2 seconds max (20 * 100ms)

			const checkFbq = setInterval(() => {
				attempts++;

				if (typeof window.fbq !== 'undefined') {
					// fbq is ready - track the Lead event
					clearInterval(checkFbq);
					window.fbq('track', 'Lead');
					// console.log('Meta Pixel: Lead event tracked (email signup confirmed)');
					sessionStorage.setItem(leadTrackedKey, 'true');
				} else if (attempts >= maxAttempts) {
					// Timeout - fbq didn't load
					clearInterval(checkFbq);
					// console.warn('Meta Pixel: Timeout waiting for fbq to load');
				}
			}, 100); // Check every 100ms
		} else {
			// console.log('Meta Pixel: Lead already tracked this session (skipping duplicate)');
		}
	});

	function handleBuyButtonClick(location: 'header' | 'main') {
		if (typeof window.fbq !== 'undefined') {
			window.fbq('track', 'InitiateCheckout', {
				content_name: 'Bananarchy VIP Bonus Cards',
				value: 1.0,
				currency: 'USD',
				button_location: location
			});
		}
	}
</script>

<svelte:head>
	<script async src="https://js.stripe.com/v3/buy-button.js"></script>
</svelte:head>

<div class="relative flex min-h-screen flex-col items-center overflow-y-auto">
	{#if showConfetti}
		<div class="fixed left-1/2 top-1/3 z-50">
			<ConfettiExplosion
				particleCount={150}
				duration={4000}
				colors={['#FFC627', '#F6A31A', '#A060AF', '#34a931', '#FEDF23']}
			/>
		</div>
	{/if}
	<div class="absolute inset-0 bg-gradient-to-r from-bapurple to-purple-700 opacity-50"></div>
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bapurple via-purple-700/50 to-transparent"
	></div>
	<div class="relative w-full">
		<div
			class="sticky left-0 right-0 top-0 mb-6 flex w-full justify-end bg-black p-2 text-center text-white"
		>
			<div class="flex w-full justify-center">
				<stripe-buy-button
					buy-button-id={`${process.env.NODE_ENV === 'production' ? 'buy_btn_1T4GwKAsNXUFfbI0Q2bcV4Yt' : 'buy_btn_1T4H7GPPIJAaixg8JZXorcI7'}`}
					publishable-key={`${process.env.NODE_ENV === 'production' ? 'pk_live_51R4sxhAsNXUFfbI0fAl27QrPAtQ2nvehYLChkv76Nc5C371lHgLn89PLXuqWToXANsCiMQNlgxvRkaAfZLSZRZDS00kRHtBo8W' : 'pk_test_51R4sxoPPIJAaixg8YvZtmNEcmVmzitoMlK9DAMS8LI7AwwlLs4F1w5usO9DUeqs8ifXZdDf2BRtMjDHUQlZZj24O00Cod4QbJz'}	`}
					on:click={() => handleBuyButtonClick('main')}
					on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && handleBuyButtonClick('main')}
					role="button"
					tabindex="0"
				>
				</stripe-buy-button>
			</div>
		</div>
		<div class="mx-4 my-4 flex flex-col items-center justify-center md:my-16 md:flex-row">
			<div class="hidden h-full flex-none p-4 font-londrinaSolid md:block">
				<enhanced:img
					src={cards}
					alt="cards"
					class="m-6 w-2/3 min-w-[420px] animate-bounce-in"
					sizes="500px"
				/>
			</div>

			<div class="flex flex-col gap-6 rounded-xl p-2 sm:items-start sm:p-6">
				<div class="flex flex-col items-center">
					<p class="title text-center">
						🎉 Claim your <span class="highlight-basic">FREE Monkey Business</span> expansion!
					</p>
					<p class="title-subhead text-center">
						Get the exclusive Monkey Business mini-expansion — <span class="line-through decoration-red-500 decoration-2">$10</span> <span class="highlight-basic text-green-400">FREE</span> when you pre-sign up!
					</p>
					<enhanced:img
						src={cards}
						alt="cards"
						class="m-6 w-full animate-bounce-in p-4 sm:w-2/3 md:hidden"
						sizes="85vw"
					/>
					<p class="mt-2 text-center text-lg font-semibold text-yellow-300">
						⏰ Kickstarter launches in just over a month — secure yours now!
					</p>
					<p class="title-subsubhead text-center">
						Reserve your Monkey Business expansion with just <span class="highlight-basic">$1 — fully refundable!</span>
					</p>
				</div>

				<div class="mx-auto my-6 w-full max-w-xl rounded-lg bg-white/10 p-6 backdrop-blur-sm">
					<h3 class="mb-4 text-center text-2xl font-bold text-yellow-300">What You Get:</h3>
					<ul class="space-y-3 text-left text-lg">
						<li class="flex items-start gap-3">
							<span class="text-2xl">✅</span>
							<span
								>Monkey Business Mini-Expansion <span class="text-yellow-300 font-semibold"
									>(6 cards, $10 value)</span
								> — <span class="text-green-400 font-bold">FREE</span></span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-2xl">✅</span>
							<span>Priority Kickstarter access notification</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-2xl">✅</span>
							<span>Exclusive backer updates and behind-the-scenes content</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-2xl">✅</span>
							<span
								><span class="text-green-400 font-semibold">100% refundable</span> $1 reservation</span
							>
						</li>
					</ul>
				</div>

				<div class="flex w-full flex-col items-center gap-4">
					<stripe-buy-button
						buy-button-id={`${process.env.NODE_ENV === 'production' ? 'buy_btn_1T4GwKAsNXUFfbI0Q2bcV4Yt' : 'buy_btn_1T4H7GPPIJAaixg8JZXorcI7'}`}
						publishable-key={`${process.env.NODE_ENV === 'production' ? 'pk_live_51R4sxhAsNXUFfbI0fAl27QrPAtQ2nvehYLChkv76Nc5C371lHgLn89PLXuqWToXANsCiMQNlgxvRkaAfZLSZRZDS00kRHtBo8W' : 'pk_test_51R4sxoPPIJAaixg8YvZtmNEcmVmzitoMlK9DAMS8LI7AwwlLs4F1w5usO9DUeqs8ifXZdDf2BRtMjDHUQlZZj24O00Cod4QbJz'}	`}
						on:click={() => handleBuyButtonClick('main')}
						on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && handleBuyButtonClick('main')}
						role="button"
						tabindex="0"
					>
					</stripe-buy-button>
					<a
						href="https://www.kickstarter.com/projects/pickupandplaygames/bananarchy"
						target="_blank"
						rel="noopener noreferrer"
						class="underline hover:text-gray-400"
					>
						No thanks, I'll pay $10 later instead
					</a>
				</div>
			</div>
		</div>
		<!-- // TODO: Lines between boxes, and margin between boxes for the text -->
		<div
			class="mx-4 my-4 flex flex-col items-start gap-2 rounded bg-purple-950/50 p-6 text-gray-300 backdrop-blur-sm md:flex-row md:divide-x md:divide-white/20"
		>
			{#each benefits as benefit}
				<div class="flex flex-col gap-2 p-2 md:px-6 first:md:pl-2 last:md:pr-2">
					<div class="flex items-center justify-start gap-2">
						{#if benefit.icon}
							<svelte:component this={benefit.icon} class="h-20 w-20" />
						{/if}
						<h3 class="text-2xl">{benefit.title}</h3>
					</div>
					<p class="mb-6">{benefit.description}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
