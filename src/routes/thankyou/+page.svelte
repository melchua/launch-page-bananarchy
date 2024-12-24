<!-- After sucessful payment, we should redirect back to the final page in the funnel to get them to sign-up to facebook or discord
 exclusive VIP page. https://docs.stripe.com/payment-links/post-payment#:~:text=After%20a%20successful%20payment%2C%20your,or%20editing%20a%20payment%20link.
  
  -->

<script>
	import cards from '$lib/assets/cards.png';
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
</script>

<svelte:head>
	<script async src="https://js.stripe.com/v3/buy-button.js"></script>
</svelte:head>

<div class="bg-primary flex flex-col items-center">
	<div class="bg-secondary mb-6 w-full p-2 text-center text-white">
		<h3 class="font-semibold">Thank you for signing up</h3>
	</div>
	<div class="m-4 flex flex-col items-center">
		<h1 class="font-londrinaSolid text-center text-3xl">Bananarchy Kickstarter VIP pass</h1>
		<h2 class="font-londrinaSolid text-center text-xl">
			🔓 Lock in your opportunity to get these <span class="text-white">exclusive</span> alternate-art
			promos today!
		</h2>
		<img src={cards} alt="cards" class="animate-bounce-in m-6 w-1/2" />

		<p class="px-4 pb-8 text-center text-sm">
			To receive your Kickstarter VIP pass, simply place a $10 deposit and you will be locked into
			these exclusive promos, yada yada yada...
		</p>

		<stripe-buy-button
			buy-button-id="buy_btn_1QYjCkK03lCEYbx4HSstdsqW"
			publishable-key="pk_test_1mjRyVDesrQP0cH8ezMwmoMJ"
		>
		</stripe-buy-button>
	</div>
	<div class="mx-4 flex flex-col items-center gap-2">
		{#each benefits as benefit}
			<div class="flex items-center gap-2">
				{#if benefit.icon}
					<svelte:component this={benefit.icon} class="h-20 w-20" />
				{/if}
				<h3 class="text-2xl">{benefit.title}</h3>
			</div>
			<p class="mx-10 mb-6">{benefit.description}</p>
		{/each}
	</div>
</div>
