<script lang="ts">
	const testimonials = [
		{
			quote:
				'If you enjoy the energy of games like Uno or Exploding Kittens, this will feel right at home and could easily become a family favourite.',
			author: '— Jim Cohen, What Board Game'
		},
		{
			quote:
				'10/10. When you think you have a gameplan to win it all, only to be betrayed by the sweet looking girl beside you.',
			author: '— Eric A.'
		},
		{
			quote:
				"Honestly, we kept saying the same thing over and over while we played: 'this game is so much fun!'.",
			author: '- Nicole, The Cozy Gamer.'
		},
		{
			quote:
				'The perfect mix of strategy and chaos. Just when you think you have it figured out, someone plays an Anytime card and everything falls apart!',
			author: '— Sarah M.'
		},
		{
			quote:
				'We laughed so hard we had tears streaming down our faces. This is our new go-to party game.',
			author: '— David K., Board Game Enthusiast'
		},
		{
			quote:
				'Simple to learn but with enough depth to keep things interesting. My kids keep asking to play "one more round".',
			author: '— Jennifer L.'
		},
		{
			quote:
				'The artwork is absolutely adorable and the gameplay is sneaky fun. Love how you can never feel safe!',
			author: '— Alex R., Game Night Host'
		},
		{
			quote:
				'Finally, a card game where waiting for your turn is NOT boring. The Anytime cards keep everyone engaged the whole time.',
			author: '— Marcus T.'
		},
		{
			quote:
				'Brought this to family game night and it was an instant hit. Even my teenager put down their phone to play!',
			author: '— Patricia S., Mom of 3'
		}
	];
</script>

<div class="social-proof-section transition-opacity duration-700">
	<!-- Layer 1: Eyebrow line -->
	<div class="eyebrow-line bg-[#2d2d2d] px-4 py-3 text-center">
		<p class="text-xs font-semibold uppercase tracking-widest text-white/80 md:text-sm">
			Already getting rave reviews:
		</p>
	</div>
	<!-- Layer 3: Testimonial Cards -->
	<div class="testimonials-section bg-[#3a3a3a] px-4 py-8 md:py-12">
		<div class="mx-auto max-w-6xl">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
				{#each testimonials as testimonial}
					<div class="testimonial-card rounded-lg bg-white/95 p-5 shadow-md">
						<p class="mb-3 text-sm italic leading-relaxed text-gray-800 md:text-base">
							"{testimonial.quote}"
						</p>
						<p class="text-xs font-semibold text-gray-600">{testimonial.author}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Layer 4: As Featured In -->
	<!-- <div class="featured-section bg-[#3a3a3a] px-4 pb-8 pt-4 md:pb-12">
		<div class="mx-auto max-w-5xl text-center">
			<p class="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50 md:text-sm">
				As Featured In
			</p>
			<div
				class="flex flex-wrap items-center justify-center gap-6 text-white/40 md:gap-8 md:gap-x-12"
			>
				<div class="featured-logo text-base font-bold md:text-lg">What Board Game</div>
				<div class="featured-logo text-base font-bold md:text-lg">Board Game Bites</div>
				<div class="featured-logo text-base font-bold md:text-lg">The Cosy Gamer</div>
			</div>
		</div>
	</div> -->
</div>
