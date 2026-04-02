/**
 * Variants Configuration for A/B Testing
 *
 * This file defines all headline and subheadline variants for the landing page.
 * Variants can be targeted via UTM parameters or randomly assigned for A/B testing.
 */

export interface HeadlineVariant {
	id: string;
	headline: string;
	subheadline: string;
	lifestyle?: string;
}

export interface VariantsConfig {
	variants: HeadlineVariant[];
	// Map UTM campaign values to specific variant IDs
	campaignMapping?: Record<string, string>;
	// Default variant ID to use if no UTM params and A/B testing is disabled
	defaultVariantId?: string;
	// Enable/disable random A/B testing (if false, uses defaultVariantId)
	enableRandomABTesting?: boolean;
}

export const variantsConfig: VariantsConfig = {
	// Define all your variants here
	variants: [
		{
			id: 'default',
			headline:
				'You are the most <span class="highlight-text">mischievous</span> monkey at the card table',
			subheadline:
				'You do NOT wait your turn. You make them fear you by yoinking, snatching, and smashing their precious bananas. YOU are BANANARCHY.',
			lifestyle:
				'<span class="italic leading-relaxed">"If you enjoy the energy of games like Uno or Exploding Kittens, this will feel right at home."</span><br /><span class="mt-2 block text-lg font-normal opacity-80">— Jim Cohen, What Board Game</span>'
		},
		{
			id: 'archived',
			headline:
				'<span class="highlight-text">Cute</span> Monkeys. <br /><span class="highlight-text">Clever</span> Tricks. <br /><span class="highlight-text">Wild</span> Plays.',
			subheadline: 'A fast, strategic party game where every move matters.'
		},
		{
			id: 'short',
			headline:
				'<span class="highlight-text">Fast Fun.</span> <br /><span class="highlight-text">Big Laughs.</span> <br /><span class="highlight-text">Zero Mercy.</span>',
			subheadline: 'The party game that ruins friendships in 30 minutes.'
		},
		{
			id: 'strategic',
			headline:
				'<span class="highlight-text">Outsmart</span> Friends. <br /><span class="highlight-text">Steal</span> Bananas. <br /><span class="highlight-text">Win</span> Big.',
			subheadline: 'A deceptively simple game with endless strategic depth.'
		},
		{
			id: 'chaos',
			headline:
				'<span class="highlight-text">Steal.</span> <br /><span class="highlight-text">Sabotage.</span> <br /><span class="highlight-text">Survive.</span>',
			subheadline: 'Pure chaos. Maximum betrayal. Instant laughter.'
		},
		{
			id: 'instigator',
			headline:
				'The turn-based game where <span class="highlight-text">no one waits their turn.</span>',
			subheadline: 'All fun and games until someone loses a banana.'
		},
		{
			id: 'storyteller',
			headline: 'You are NOT a <span class="highlight-text">wait your turn</span> kind of monkey',
			subheadline:
				"You never have been. You slam down Anytime Cards at any time, to anyone. You've earned it my friend."
		},
		{
			id: 'monkey-king',
			headline:
				'You are the most <span class="highlight-text">mischievous</span> monkey at the card table',
			subheadline:
				'You do NOT wait your turn. You make them fear you by yoinking, snatching, and smashing their precious bananas. YOU are BANANARCHY.',
			lifestyle: 'The action never stops. Neither do your friends.'
		}
	],

	// Map specific UTM campaigns to variants
	// Example: ?utm_campaign=facebook → uses 'short' variant
	campaignMapping: {
		facebook: 'short',
		instagram: 'short',
		google: 'strategic',
		twitter: 'chaos',
		reddit: 'default'
	},

	// Default variant (used when A/B testing is disabled or as fallback)
	defaultVariantId: 'default',

	// Enable/disable random A/B testing
	// true = visitors without UTM params get randomly assigned variants
	// false = all visitors without UTM params see the defaultVariantId
	enableRandomABTesting: false
};

/**
 * Get a variant by ID
 */
export function getVariantById(id: string): HeadlineVariant | undefined {
	return variantsConfig.variants.find((v) => v.id === id);
}

/**
 * Get all variant IDs
 */
export function getAllVariantIds(): string[] {
	return variantsConfig.variants.map((v) => v.id);
}
