<script context="module" lang="ts">
	declare const fbq: (command: string, event: string, params?: Record<string, any>) => void;
</script>

<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const TITLE = `Congrats, you're a VIP!`;

	onMount(() => {
		if (!browser) return;

		// Check if this is a fresh purchase (coming from Stripe checkout)
		// Stripe adds session_id to the success URL
		const urlParams = new URLSearchParams(window.location.search);
		const sessionId = urlParams.get('session_id');

		// Check if we've already tracked this session
		const trackedKey = 'vip_purchase_tracked';
		const alreadyTracked = sessionStorage.getItem(trackedKey);

		// Only track if there's a session_id (indicating successful Stripe checkout)
		// AND we haven't tracked this session yet
		if (sessionId && !alreadyTracked) {
			// Wait for window.fbq to be available (handles race condition with layout onMount)
			let attempts = 0;
			const maxAttempts = 20; // 2 seconds max (20 * 100ms)

			const checkFbq = setInterval(() => {
				attempts++;

				if (typeof window.fbq !== 'undefined') {
					// fbq is ready - track the Purchase event
					clearInterval(checkFbq);
					window.fbq('track', 'Purchase', {
						content_name: 'Bananarchy VIP Bonus',
						value: 1.0,
						currency: 'USD',
						transaction_id: sessionId
					});
					// console.log('Meta Pixel: Purchase event tracked for session', sessionId);

					// Mark this session as tracked to prevent duplicate tracking on refresh
					sessionStorage.setItem(trackedKey, sessionId);
				} else if (attempts >= maxAttempts) {
					// Timeout - fbq didn't load
					clearInterval(checkFbq);
					// console.warn('Meta Pixel: Timeout waiting for fbq to load');
				}
			}, 100); // Check every 100ms
		}
	});
</script>

<svelte:head>
	<script async src="https://js.stripe.com/v3/buy-button.js"></script>
</svelte:head>

<div class="flex min-h-screen flex-col items-center overflow-y-auto pt-20">
	<div class="absolute inset-0 bg-gradient-to-r from-bapurple to-purple-700 opacity-50"></div>
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bapurple via-purple-700/50 to-transparent"
	></div>
	<div
		class="container relative mx-auto flex w-4/5 flex-col items-center justify-center gap-4 sm:flex-row"
	>
		<div class="flex-1">
			<enhanced:img
				src="$lib/assets/coming-soon.png"
				alt="row4cards"
				class="m-6 min-w-[400px] animate-bounce-in rounded-xl"
			/>
		</div>

		<div class="m-4 flex flex-1 flex-col gap-4 p-6 text-white">
			<span class="font-londrinaSolid text-7xl">{TITLE}</span>

			<p class="text-xl text-white">
				Thanks for reserving your exclusive VIP bonus! You're locked in to receive <span
					class="text-baorange-50">your exclusive mini-expansion 🍌</span
				> when you back Bananarchy on Kickstarter. Welcome to the troop! 🐵
			</p>

			<a
				href="https://www.kickstarter.com/projects/pickupandplaygames/bananarchy"
				target="_blank"
				rel="noopener noreferrer"
			>
				<button
					type="submit"
					name="subscribe"
					class="button w-full whitespace-nowrap rounded-lg bg-secondary p-2 text-white hover:bg-secondary/80"
					>Follow on Kickstarter</button
				>
			</a>
		</div>
	</div>
</div>

<style>
	.container {
		flex-direction: column-reverse;
	}

	@media (min-width: 640px) {
		.container {
			flex-direction: row;
			max-width: 90rem;
		}
	}
</style>
