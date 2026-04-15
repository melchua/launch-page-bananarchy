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
	import { Award, Handshake, ShieldCheck, CheckCircle2 } from 'lucide-svelte';
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
			class="fixed left-0 right-0 top-0 z-50 flex w-full justify-end bg-black/95 px-4 py-3 text-center text-white shadow-lg backdrop-blur-sm md:relative md:shadow-none"
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

		<!-- Thank you confirmation section -->
		<div class="mx-auto w-full max-w-4xl px-4 pb-4 pt-20 text-center md:pb-8 md:pt-8">
			<p class="text-2xl font-semibold text-white/80 md:text-3xl">🎉 You're In!</p>
			<p class="mt-2 text-base text-white/70 md:text-lg">
				Thanks for subscribing! Check your inbox for a welcome email.
			</p>
		</div>

		<div
			class="mx-auto my-8 flex max-w-7xl flex-col items-center justify-center gap-8 px-4 md:my-16 md:flex-row md:items-start md:gap-12"
		>
			<div class="hidden flex-shrink-0 md:block">
				<enhanced:img
					src={cards}
					alt="cards"
					class="w-full max-w-md animate-bounce-in"
					sizes="500px"
				/>

				<!-- What You Get box - Desktop only (left column) -->
				<div class="mt-6 w-full max-w-md rounded-lg bg-white/10 p-6 backdrop-blur-sm">
					<h3 class="value-box-heading mb-4 text-center">What You Get:</h3>
					<ul class="space-y-3 text-left text-lg">
						<li class="flex items-start gap-3">
							<CheckCircle2 class="h-6 w-6 flex-shrink-0 text-primary-100" />
							<span
								>Monkey Business Mini-Expansion <span class="font-semibold text-primary-100"
									>(6 cards, $10 value)</span
								>
								— <span class="font-bold text-white">FREE</span></span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle2 class="h-6 w-6 flex-shrink-0 text-primary-100" />
							<span>Priority Kickstarter access notification</span>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle2 class="h-6 w-6 flex-shrink-0 text-primary-100" />
							<span>Exclusive backer updates and behind-the-scenes content</span>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle2 class="h-6 w-6 flex-shrink-0 text-primary-100" />
							<span
								><span class="font-semibold text-white">100% refundable</span> $1 reservation</span
							>
						</li>
					</ul>
				</div>
			</div>

			<div class="flex w-full max-w-2xl flex-col gap-4 p-2 sm:p-6">
				<div class="flex flex-col items-center gap-3">
					<p class="title text-center">
						Now, Claim Your <span class="highlight-basic">FREE Monkey Business</span> expansion!
					</p>
					<p class="title-subhead px-10 text-center">
						Get the exclusive Monkey Business mini-expansion — <span
							class="line-through decoration-red-500 decoration-2">$10</span
						> <span class="highlight-basic font-bold text-secondary">FREE</span> when you sign up before
						the Kickstarter launch in May!
					</p>
					<enhanced:img
						src={cards}
						alt="cards"
						class="my-4 w-full animate-bounce-in sm:w-2/3 md:hidden"
						sizes="85vw"
					/>

					<p class="title-subsubhead px-10 text-center">
						Reserve your free mini expansion with a <span class="highlight-basic">$1</span> deposit.
					</p>
				</div>

				<!-- What You Get box - Mobile only (right column) -->
				<div class="mx-auto w-full max-w-xl rounded-lg bg-white/10 p-6 backdrop-blur-sm md:hidden">
					<h3 class="value-box-heading mb-4 text-center">What You Get:</h3>
					<ul class="space-y-3 text-left text-lg">
						<li class="flex items-start gap-3">
							<CheckCircle2 class="h-6 w-6 flex-shrink-0 text-primary-100" />
							<span
								>Monkey Business Mini-Expansion <span class="font-semibold text-primary-100"
									>(6 cards, $10 value)</span
								>
								— <span class="font-bold text-white">FREE</span></span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle2 class="h-6 w-6 flex-shrink-0 text-primary-100" />
							<span>Priority Kickstarter access notification</span>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle2 class="h-6 w-6 flex-shrink-0 text-primary-100" />
							<span>Exclusive backer updates and behind-the-scenes content</span>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle2 class="h-6 w-6 flex-shrink-0 text-primary-100" />
							<span
								><span class="font-semibold text-white">100% refundable</span> $1 reservation</span
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
		<div class="mx-auto my-8 w-full max-w-6xl px-4">
			<div
				class="grid gap-6 rounded bg-purple-950/50 p-6 text-white/90 backdrop-blur-sm md:grid-cols-3 md:gap-8"
			>
				{#each benefits as benefit}
					<div class="flex flex-col gap-3">
						<div class="flex items-center gap-3">
							{#if benefit.icon}
								<svelte:component
									this={benefit.icon}
									class="h-12 w-12 flex-shrink-0 md:h-14 md:w-14"
								/>
							{/if}
							<h3 class="benefit-title">{benefit.title}</h3>
						</div>
						<p class="text-sm leading-relaxed md:text-base">{benefit.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
