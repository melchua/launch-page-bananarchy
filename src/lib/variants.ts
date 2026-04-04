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
				'The turn-based game where <span class="text-red-500">no one waits their turn.</span>',
			subheadline: "It's all fun and games until someone loses a banana.",
			lifestyle:
				'<span class="italic leading-relaxed">"If you enjoy the energy of games like <span class="text-[#F6A31A]">Uno</span> or <span class="text-[#F6A31A]">Exploding Kittens</span>, this will feel right at home."</span><br /><span class="mt-2 block text-sm font-normal opacity-80">— Jim Cohen, What Board Game</span>'
		},
		{
			id: 'monkey-king-short',
			headline:
				'You are the most <span class="text-red-500">mischievous</span> monkey at the card table',
			subheadline: 'You make them fear you by yoinking, snatching, and smashing their bananas.',
			lifestyle:
				'<span class="italic leading-relaxed">"If you enjoy the energy of games like <span class="text-[#F6A31A]">Uno</span> or <span class="text-[#F6A31A]">Exploding Kittens</span>, this will feel right at home."</span><br /><span class="mt-2 block text-sm font-normal opacity-80">— Jim Cohen, What Board Game</span>'
		}
	],

	// Map specific UTM campaigns to variants
	// Example: ?utm_campaign=facebook → uses 'short' variant
	// Comment out campaignMapping to disable UTM targeting
	// campaignMapping: {
	// 	facebook: 'short',
	// 	instagram: 'short',
	// 	google: 'strategic',
	// 	twitter: 'chaos',
	// 	reddit: 'default'
	// },

	// Default variant (used when A/B testing is disabled or as fallback)
	defaultVariantId: 'default',

	// Enable/disable random A/B testing
	// true = visitors without UTM params get randomly assigned variants
	// false = all visitors without UTM params see the defaultVariantId
	enableRandomABTesting: true
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
