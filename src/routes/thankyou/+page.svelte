<!-- After sucessful payment, we should redirect back to the final page in the funnel to get them to sign-up to facebook or discord
 exclusive VIP page. https://docs.stripe.com/payment-links/post-payment#:~:text=After%20a%20successful%20payment%2C%20your,or%20editing%20a%20payment%20link.
  
  -->

<script context="module" lang="ts">
	declare const fbq: (command: string, event: string, params?: Record<string, any>) => void;
</script>

<script lang="ts">
	import cards from '$lib/assets/cards.png?enhanced';
	import { Award, Handshake, ShieldCheck } from 'lucide-svelte';

	const benefits = [
		{
			title: '100% Refund Guarantee',
			description:
				'If you cancel your reservation, we guarantee you a full refund at any time before the project moves into production',
			icon: Award
		},
		{
			title: 'Transparency Guarantee',
			description:
				'If you cancel your reservation, we guarantee you a full refund at any time before the project moves into production',
			icon: Handshake
		},
		{
			title: 'Secure Payment',
			description:
				'If you cancel your reservation, we guarantee you a full refund at any time before the project moves into production',
			icon: ShieldCheck
		}
	];

	const TITLE = 'Thanks for Signing Up!';
	const SUBTITLE = 'Want exclusive cards included in your pledge?';

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
					buy-button-id="buy_btn_1R4t7SPPIJAaixg8kKHFwSZm"
					publishable-key="pk_test_51R4sxoPPIJAaixg8YvZtmNEcmVmzitoMlK9DAMS8LI7AwwlLs4F1w5usO9DUeqs8ifXZdDf2BRtMjDHUQlZZj24O00Cod4QbJz"
					on:click={() => handleBuyButtonClick('header')}
					on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && handleBuyButtonClick('header')}
					role="button"
					tabindex="0"
				>
				</stripe-buy-button>
			</div>
		</div>
		<div class="mx-4 my-4 flex flex-col items-center sm:my-16 sm:flex-row">
			<div class="p-4 font-londrinaSolid text-5xl text-white sm:hidden">
				<span>{TITLE} <span class="text-baorange-50">{SUBTITLE}</span></span>
			</div>
			<enhanced:img
				src={cards}
				alt="cards"
				class="m-6 w-1/2 animate-bounce-in sm:hidden"
				sizes="(min-width: 640px) 700px, 80vw"
			/>

			<div class="hidden h-full flex-1 font-londrinaSolid sm:block">
				<enhanced:img
					src={cards}
					alt="cards"
					class="m-6 w-1/2 animate-bounce-in"
					sizes="(min-width: 640px) 700px, 80vw"
				/>
			</div>

			<div class="flex flex-1 flex-col rounded-xl sm:items-start">
				<div class="hidden p-4 font-londrinaSolid text-5xl text-white sm:flex">
					<span>{TITLE} <span class="text-baorange-50">{SUBTITLE}</span></span>
				</div>

				<p class="p-4 font-londrinaSolid text-xl text-white">
					Place a <span class="font-bold text-baorange-50">$1 refundable deposit</span> and receive
					two bonus cards with your copy of
					<span class="font-bold text-baorange-50">Bananarchy</span>, adding a unique twist to mess
					with your friends.
				</p>
				<p class="p-4 font-londrinaSolid text-xl text-white">
					Lock in <span class="font-bold text-baorange-50">Bananarchy</span> at the
					<span class="font-bold text-baorange-50">Kickstarter price of $22.50</span> (+ shipping) ~
					a banana-load 🍌 of savings!
				</p>
				<div class="flex w-full flex-col items-center justify-center">
					<stripe-buy-button
						buy-button-id="buy_btn_1R4t7SPPIJAaixg8kKHFwSZm"
						publishable-key="pk_test_51R4sxoPPIJAaixg8YvZtmNEcmVmzitoMlK9DAMS8LI7AwwlLs4F1w5usO9DUeqs8ifXZdDf2BRtMjDHUQlZZj24O00Cod4QbJz"
						on:click={() => handleBuyButtonClick('main')}
						on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && handleBuyButtonClick('main')}
						role="button"
						tabindex="0"
					>
					</stripe-buy-button>
					<a href="#" class="underline hover:text-gray-400">No thanks! I'll just follow along</a>
				</div>
			</div>
		</div>
		<!-- // TODO: Lines between boxes, and margin between boxes for the text -->
		<div
			class="mx-4 my-4 flex flex-col items-start gap-2 rounded bg-black p-6 text-gray-300 md:flex-row"
		>
			{#each benefits as benefit}
				<div class="flex flex-col gap-2 p-2">
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
