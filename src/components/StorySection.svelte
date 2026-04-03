<script lang="ts">
	import monkeymayhem from '$lib/assets/storysection/monkey_mayhem_fire.png?enhanced';
	import bananaSplitCartoon from '$lib/assets/storysection/banana_split_cartoon.png?enhanced';
	import smash from '$lib/assets/storysection/smash.png?enhanced';
	import grab from '$lib/assets/storysection/grab_glow.png?enhanced';
	import shield from '$lib/assets/storysection/shield.png?enhanced';
	import slip from '$lib/assets/storysection/slip.png?enhanced';
	import bakeBananaBread from '$lib/assets/storysection/bake_banana_bread.png?enhanced';
	import bananaManifesto from '$lib/assets/storysection/banana_manifesto.png?enhanced';
	import monkeyKing from '$lib/assets/monkey_king.png?enhanced';

	import type { Picture } from 'vite-imagetools';

	type TextSegment = { text: string; bold?: boolean; color?: string };
	type Paragraph = TextSegment[];

	interface Section {
		emoji: string;
		title: string;
		paragraphs: Paragraph[];
		image1Color: string;
		image2Color: string;
		image1: Picture;
		image2: Picture;
	}

	// Placeholder data structure - images will be replaced later
	const sections: Section[] = [
		{
			emoji: '🔄',
			title: 'Flip the table on your rival monkeys',
			paragraphs: [
				[{ text: 'Monkeys are ' }, { text: 'not to be trusted', bold: true }, { text: '.' }],
				[
					{ text: 'Play ' },
					{ text: 'powerful action cards', bold: true },
					{ text: ' to distribute the banana wealth evenly using the ' },
					{ text: 'Bolshevik Banana', bold: true, color: '#f26b4e' },
					{ text: ' card, or just disrupt your neighbours with a ' },
					{ text: 'Banana Split', bold: true, color: '#f26b4e' },
					{ text: '!' }
				],
				[
					{ text: 'Luck got you down? Play ' },
					{ text: 'Monkey Mayhem', bold: true, color: '#f26b4e' },
					{ text: ' and ' },
					{ text: 'rotate the hoard of bananas', bold: true },
					{ text: ' to yourself right before the end of the game.' }
				]
			],
			image1Color: '#F6A31A',
			image2Color: '#A060AF',
			image1: monkeymayhem,
			image2: bananaSplitCartoon
		},
		{
			emoji: '⚡',
			title: "Interrupt their turn. It's your turn now.",
			paragraphs: [
				[
					{ text: 'Play an ' },
					{ text: 'Anytime Card', bold: true, color: '#05ce78' },
					{ text: ' to ' },
					{ text: 'smash', bold: true },
					{ text: " a rival's bananas, " },
					{ text: 'snatch them mid-turn', bold: true },
					{ text: ', or just toss them around the table for fun.' }
				],
				[{ text: 'No permission needed. No mercy required.', bold: true }],
				[
					{ text: "Chaos doesn't happen to you - " },
					{ text: 'YOU happen to chaos', bold: true, color: '#05ce78' },
					{ text: '.' }
				]
			],
			image1Color: '#05ce78',
			image2Color: '#FFC627',
			image1: grab,
			image2: smash
		},
		{
			emoji: '🛡️',
			title: 'Protect your friends… and punish the rest',
			paragraphs: [
				[
					{ text: 'Play ' },
					{ text: 'Reaction Cards', bold: true, color: '#2196F3' },
					{ text: ' to ' },
					{ text: 'shield your neighbours', bold: true },
					{ text: ' and build new alliances, or to ' },
					{ text: 'block your own banana collection', bold: true },
					{ text: ' from being smashed.' }
				],
				[
					{ text: 'Used banana peels are perfect traps for rivals to ' },
					{ text: 'slip', bold: true, color: '#FFD700' },
					{ text: " on. It's a TRAP!" }
				]
			],
			image1Color: '#2196F3',
			image2Color: '#FF5722',
			image1: shield,
			image2: slip
		},
		{
			emoji: '🍌',
			title: 'Collect bananas and special scoring cards',
			paragraphs: [
				[{ text: 'Been dealt a rotten hand (of bananas)? ' }, { text: 'No problem!', bold: true }],
				[
					{ text: 'Collect ' },
					{ text: 'special scoring cards', bold: true, color: '#9C27B0' },
					{ text: ' like ' },
					{ text: 'Bake Banana Bread', bold: true, color: '#9C27B0' },
					{ text: ' to turn all your rotten bananas into yummy banana bread and ' },
					{ text: 'enhance your score', bold: true },
					{ text: '!' }
				],
				[
					{ text: 'Use scoring cards to ' },
					{ text: 'play possum' },
					{ text: ', and then ' },
					{ text: 'surprise the room', bold: true, color: '#9C27B0' },
					{
						text: ' by writing your '
					},
					{ text: 'Banana Manifesto', bold: true, color: '#9C27B0' },
					{ text: ' which doubles your points at the end of the game!' }
				]
			],
			image1Color: '#9C27B0',
			image2Color: '#FFEB3B',
			image1: bakeBananaBread,
			image2: bananaManifesto
		}
	];
</script>

<div class="story-section-wrapper z-10 bg-white/80 px-4 py-12 sm:px-8 lg:py-16">
	<div class="mx-auto max-w-7xl">
		<!-- Sections -->
		{#each sections as section, index}
			<div class="mb-20 last:mb-0 lg:mb-32">
				<!-- Centered Headline - always first -->
				<div class="mb-8 flex items-center justify-center gap-4 lg:mb-12 lg:gap-6">
					<h3
						class="story-headline max-w-2xl text-center font-londrinaSolid text-3xl leading-tight text-gray-900 sm:text-4xl lg:text-5xl"
					>
						{section.emoji}
						{section.title}
					</h3>
				</div>

				<!-- First Image (mobile only - above text) -->
				<div class="mb-8 flex justify-center lg:hidden">
					<div class="w-full max-w-[500px] rounded-xl">
						<div class="flex h-full items-center justify-center text-white/30">
							{#if section.image1}
								<enhanced:img
									src={section.image1}
									alt={section.title}
									class="h-full w-full rounded-xl object-cover"
								/>
							{:else}
								<span class="text-xs font-semibold">Image {index * 2 + 1}</span>
							{/if}
						</div>
					</div>
				</div>

				<!-- Desktop layout with text between images -->
				<div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
					<!-- First Image (desktop only) -->
					<div class="hidden w-1/4 rounded-xl lg:block">
						<div class="flex h-full items-center justify-center text-white/30">
							{#if section.image1}
								<enhanced:img
									src={section.image1}
									alt={section.title}
									class="h-full w-full rounded-xl object-cover"
								/>
							{:else}
								<span class="text-sm font-semibold">Image {index * 2 + 1}</span>
							{/if}
						</div>
					</div>

					<!-- Text Content -->
					<div class="lg:flex-1">
						{#each section.paragraphs as paragraph}
							<p
								class="mb-6 px-4 text-left text-base leading-relaxed text-gray-800 sm:px-6 sm:text-lg sm:leading-loose lg:px-0 lg:text-xl lg:leading-loose"
							>
								{#each paragraph as segment}
									{#if segment.bold && segment.color}
										<strong class="font-bold" style="color: {segment.color}">{segment.text}</strong>
									{:else if segment.bold}
										<strong class="font-bold">{segment.text}</strong>
									{:else if segment.color}
										<span style="color: {segment.color}">{segment.text}</span>
									{:else}
										{segment.text}
									{/if}
								{/each}
							</p>
						{/each}
					</div>

					<!-- Second Image (desktop only) -->
					<div class="hidden aspect-[3/3] w-1/4 rounded-xl lg:block">
						<div class="flex h-full items-center justify-center text-white/30">
							{#if section.image2}
								<enhanced:img
									src={section.image2}
									alt={section.title}
									class="h-full w-full rounded-xl object-cover"
								/>
							{:else}
								<span class="text-sm font-semibold">Image {index * 2 + 2}</span>
							{/if}
						</div>
					</div>
				</div>

				<!-- Second Image (mobile only - below text) -->
				<div class="mt-8 flex justify-center lg:hidden">
					<div class="w-full max-w-[500px] rounded-xl">
						<div class="flex h-full items-center justify-center text-white/30">
							{#if section.image2}
								<enhanced:img
									src={section.image2}
									alt={section.title}
									class="h-full w-full rounded-xl object-cover"
								/>
							{:else}
								<span class="text-xs font-semibold">Image {index * 2 + 2}</span>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/each}

		<!-- Closing statement -->
		<div class="mt-16 text-center text-2xl lg:mt-20">
			<p class=" ont-bold text-gray-900 sm:text-3xl lg:text-4xl">
				When the bananas are gone, one monkey will rule the Bananarchy.
			</p>

			<enhanced:img src={monkeyKing} alt="Monkey King" class="mt-4 rounded-xl p-4" />
			<p class="mt-4 font-bold text-gray-900">Will it be you?</p>
		</div>
	</div>
</div>

<style>
	.story-headline {
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		letter-spacing: -0.02em;
	}

	.description-text {
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		letter-spacing: -0.01em;
	}
</style>
