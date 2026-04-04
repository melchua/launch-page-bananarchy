<script lang="ts">
	import whatBoardGameLogo from '$lib/assets/logos/what_board_game_logo.png?enhanced';
	import boardGameBiteLogo from '$lib/assets/logos/board_game_bite_logo.png?enhanced';
	import theHowlingMeepleLogo from '$lib/assets/logos/the_howling_meeple_logo.png?enhanced';

	const testimonials = [
		{
			quote:
				'If you enjoy the energy of games like Uno or Exploding Kittens, this will feel right at home and could easily become a family favourite.',
			author: '— Jim Cohen, What Board Game',
			logo: whatBoardGameLogo,
			logoAlt: 'What Board Game logo'
		},
		{
			quote:
				'It kept my whole family involved from start to finish, with plenty of sudden turnarounds. A great fit for groups that enjoy lively, unpredictable games.',
			author: '— The Howling Meeple',
			logo: theHowlingMeepleLogo,
			logoAlt: 'The Howling Meeple logo'
		},
		{
			quote:
				'Chaotic and engaging party game for those who enjoy a frentic play style in their card games. The clever cards create lots of humorous and unexpected momennts.',
			author: '— Board Game Bite',
			logo: boardGameBiteLogo,
			logoAlt: 'Board Game Bite logo'
		},
		{
			quote:
				'Ridiculously fun! When you think you have a gameplan to win it all, only to be betrayed by the sweet looking girl beside you. 10/10',
			author: '— Elvis Amisi, Playtester'
		},
		{
			quote:
				"This game nails it in terms of being both easy to learn and chaotic enough to keep things interesting each time you play! Highly recommend - I'd give it ⭐️⭐️⭐️⭐️⭐️ but let's go with 🍌🍌🍌🍌🍌 to stay on theme.",
			author: '— Laine Anderson, Playtester'
		},
		{
			quote:
				"Honestly, we kept saying the same thing over and over while we played: 'this game is so much fun!'.",
			author: '- Nicole, The Cozy Gamer.'
		}
	];
</script>

<div class="social-proof-section bg-[#3a3a3a] transition-opacity duration-700">
	<!-- Layer 1: Eyebrow line -->
	<div class="px-4 pb-0 pt-12 text-center">
		<p class="stat-number mb-1 text-4xl font-bold text-[#F6A31A] md:text-5xl">
			Already getting rave reviews:
		</p>
	</div>
	<!-- Layer 3: Testimonial Cards -->
	<div class="testimonials-section px-4 py-8 md:py-12">
		<div class="mx-auto max-w-6xl">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
				{#each testimonials as testimonial}
					<div class="testimonial-card rounded-lg bg-white/95 p-5 shadow-md">
						{#if testimonial.logo}
							<div class="mb-4">
								<enhanced:img
									src={testimonial.logo}
									alt={testimonial.logoAlt || ''}
									class="h-10 w-auto object-contain opacity-70 grayscale transition-opacity hover:opacity-100 md:h-12"
								/>
							</div>
						{/if}
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
