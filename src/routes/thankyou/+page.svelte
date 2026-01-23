<!-- After sucessful payment, we should redirect back to the final page in the funnel to get them to sign-up to facebook or discord
 exclusive VIP page. https://docs.stripe.com/payment-links/post-payment#:~:text=After%20a%20successful%20payment%2C%20your,or%20editing%20a%20payment%20link.
  
  -->

<script context="module" lang="ts">
	declare const fbq: (command: string, event: string, params?: Record<string, any>) => void;
</script>

<script lang="ts">
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

	const SUBTITLE = 'You unlocked an exclusive mini-expansion!';
	const TITLE = 'Claim your FREE $15 expansion — just $1 to reserve.';

	function handleBuyButtonClick(location: 'header' | 'main') {
		if (typeof fbq !== 'undefined') {
			fbq('track', 'InitiateCheckout', {
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
					buy-button-id={`${process.env.NODE_ENV === 'production' ? 'buy_btn_1RCB8XAsNXUFfbI0ZhPPYlfX' : 'buy_btn_1R4t7SPPIJAaixg8kKHFwSZm'}`}
					publishable-key={`${process.env.NODE_ENV === 'production' ? 'pk_live_51R4sxhAsNXUFfbI0fAl27QrPAtQ2nvehYLChkv76Nc5C371lHgLn89PLXuqWToXANsCiMQNlgxvRkaAfZLSZRZDS00kRHtBo8W' : 'pk_test_51R4sxoPPIJAaixg8YvZtmNEcmVmzitoMlK9DAMS8LI7AwwlLs4F1w5usO9DUeqs8ifXZdDf2BRtMjDHUQlZZj24O00Cod4QbJz'}	`}
					on:click={() => handleBuyButtonClick('header')}
					on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && handleBuyButtonClick('header')}
					role="button"
					tabindex="0"
				>
				</stripe-buy-button>
			</div>
		</div>
		<div class="mx-4 my-4 flex flex-col items-center md:my-16 md:flex-row">
			<!-- <div class="p-4 font-londrinaSolid text-5xl text-white md:hidden">
				<p>{TITLE}</p>
				<p class="text-baorange-50 text-2xl">{SUBTITLE}</p>
			</div> -->
			<!-- small screen image -->
			<enhanced:img
				src={cards}
				alt="cards"
				class="m-6 w-2/3 animate-bounce-in p-4 sm:w-2/3 md:hidden"
				sizes="80vw"
			/>

			<!-- medium screen image -->
			<div class="hidden h-full flex-none p-4 font-londrinaSolid md:block">
				<enhanced:img
					src={cards}
					alt="cards"
					class="m-6 w-2/3 min-w-[420px] animate-bounce-in"
					sizes="500px"
				/>
			</div>

			<div class="flex flex-1 flex-col gap-6 rounded-xl p-4 sm:items-start sm:p-6">
				<div class="title md:flex flex-col text-center">
					<p>Now claim your <span class="highlight-basic">VIP Banana</span> expansion</p>
					<p class="title-subhead">Get a 6-card exclusive expansion (worth $15)</p>
					<p class="title-subsubhead">Reserve it today with a $1 fully refundable deposit</p>
				</div>


				<div class="flex w-full flex-col items-center justify-center gap-4">
					<!-- <p class="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-200">
						<span class="animate-pulse">⚠️</span> Only 420 of 500 VIP slots available
					</p> -->
					
					<stripe-buy-button
						buy-button-id={`${process.env.NODE_ENV === 'production' ? 'buy_btn_1RCB8XAsNXUFfbI0ZhPPYlfX' : 'buy_btn_1R4t7SPPIJAaixg8kKHFwSZm'}`}
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
						No thanks, I don't want the free expansion
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
