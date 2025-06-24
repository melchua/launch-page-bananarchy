<script context="module" lang="ts">
	declare const fbq: (command: string, event: string, params?: Record<string, any>) => void;
</script>

<script>
	const TITLE = `Congrats, you're a VIP!`;
</script>

<svelte:head>
	<script async src="https://js.stripe.com/v3/buy-button.js"></script>
	<script>
		fbq('track', 'Purchase', {
			content_name: 'Bananarchy VIP Bonus',
			value: 1.0,
			currency: 'USD'
		});
	</script>
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
					class="text-baorange-50">two GMO-free Banana Cards 🍌</span
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
