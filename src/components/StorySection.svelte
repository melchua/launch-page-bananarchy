<script lang="ts">
	// Placeholder data structure - images will be replaced later
	const sections = [
		{
			number: 1,
			title: 'Flip the table on your rival monkeys',
			paragraphs: [
				'Monkeys are not to be trusted. Play powerful action cards to distribute the banana wealth evenly using the Bolshevik Banana card, or just disrupt your neighbours with a Banana split!',
				'Luck got you down? Play Monkey Mayhem and rotate the hoard of bananas to yourself right before the end of the game.'
			],
			imageLeft: true
		},
		{
			number: 2,
			title: "Interrupt their turn. It's your turn now.",
			paragraphs: [
				"Play an Anytime Card to smash a rival's bananas, snatch them mid-turn, or just toss them around the table for fun. No permission needed. No mercy required. Chaos doesn't happen to you - YOU happen to chaos."
			],
			imageLeft: false
		},
		{
			number: 3,
			title: 'Protect your friends… and punish the rest',
			paragraphs: [
				'Play reaction cards to shield your neighbours to build new alliances, or to block your own banana collection from being smashed.',
				"Toss ripe bananas from your foes to the cute monkey across the table… or toss a rotten one to that monkey that's been mean to the whole night."
			],
			imageLeft: true
		},
		{
			number: 4,
			title: 'Collect bananas and special scoring cards',
			paragraphs: [
				'Been dealt a rotten hand (of bananas)? No problem! Collect special scoring cards like Bake Banana bread to turn all your rotten bananas into yummy Banana bread to enhance your score!',
				'Use scoring cards to play possum, and then surprise the room by doubling your points at the end of the game!'
			],
			imageLeft: false
		}
	];

	// Color palette for placeholder images
	const placeholderColors = ['#F6A31A', '#A060AF', '#05ce78', '#FFC627'];
</script>

<div class="story-section-wrapper bg-white/85 px-4 py-12 sm:px-8">
	<div class="mx-auto max-w-7xl">
		<!-- Sections -->
		{#each sections as section, index}
			<div class="mb-16 last:mb-0 lg:mb-24">
				<!-- Mobile Layout: Stacked -->
				<div class="flex flex-col gap-6 lg:hidden">
					<!-- Centered Headline (mobile) -->
					<div class="flex items-center justify-center gap-3">
						<div
							class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#f26b4e] text-xl font-bold text-white shadow-lg"
						>
							{section.number}
						</div>
						<h3 class="text-2xl">{section.title}</h3>
					</div>

					<!-- First placeholder image (mobile) -->
					<div
						class="aspect-[2/3] w-full max-w-[280px] self-center rounded-xl shadow-lg"
						style="background: linear-gradient(135deg, {placeholderColors[
							index
						]} 0%, {placeholderColors[(index + 1) % 4]} 100%);"
					>
						<div class="flex h-full items-center justify-center text-white/30">
							<enhanced:img
								src="$lib/assets/storysection/monkeymayhem.jpg"
								alt="Monkey Mayhem"
								class="h-full w-full object-cover"
							/>
						</div>
					</div>

					<!-- Text content (mobile) -->
					<div class="text-center">
						{#each section.paragraphs as paragraph}
							<p class="description-text mb-4 text-left">{paragraph}</p>
						{/each}
					</div>

					<!-- Second placeholder image (mobile) -->
					<div
						class="aspect-[2/3] w-full max-w-[280px] self-center rounded-xl shadow-lg"
						style="background: linear-gradient(135deg, {placeholderColors[
							(index + 2) % 4
						]} 0%, {placeholderColors[(index + 3) % 4]} 100%);"
					>
						<div class="flex h-full items-center justify-center text-white/30">
							<span class="text-sm font-semibold">Placeholder Image 2</span>
						</div>
					</div>
				</div>

				<!-- Desktop Layout: Alternating -->
				<div class="hidden lg:block">
					<!-- Centered Headline -->
					<div class="mb-6 flex items-center justify-center gap-3">
						<div
							class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#f26b4e] text-xl font-bold text-white shadow-lg"
						>
							{section.number}
						</div>
						<h3 class="text-2xl">{section.title}</h3>
					</div>

					<!-- Images and Text Row -->
					<div class="flex items-center gap-8">
						<!-- Left Image -->
						<div
							class="aspect-[2/3] w-1/4 flex-shrink-0 rounded-xl shadow-lg"
							style="background: linear-gradient(135deg, {placeholderColors[
								index
							]} 0%, {placeholderColors[(index + 1) % 4]} 100%);"
						>
							<div class="flex h-full items-center justify-center text-white/30">
								<span class="text-sm font-semibold">Placeholder 1</span>
							</div>
						</div>

						<!-- Text column (middle) -->
						<div class="flex-1">
							{#each section.paragraphs as paragraph}
								<p class="description-text mb-4">{paragraph}</p>
							{/each}
						</div>

						<!-- Right Image -->
						<div
							class="aspect-[2/3] w-1/4 flex-shrink-0 rounded-xl shadow-lg"
							style="background: linear-gradient(135deg, {placeholderColors[
								(index + 2) % 4
							]} 0%, {placeholderColors[(index + 3) % 4]} 100%);"
						>
							<div class="flex h-full items-center justify-center text-white/30">
								<span class="text-sm font-semibold">Placeholder 2</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}

		<!-- Closing statement -->
		<div class="mt-12 text-center">
			<p class="description-text text-xl font-bold">
				When the bananas are gone, one monkey will rule the Bananarchy. Will it be you?
			</p>
		</div>
	</div>
</div>
