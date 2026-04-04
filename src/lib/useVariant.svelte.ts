/**
 * useVariant Composable (Svelte 5 Runes)
 *
 * Handles variant selection logic for A/B testing with UTM parameter support.
 * - Checks URL for utm_variant or utm_campaign parameters
 * - Falls back to random A/B testing for organic traffic
 * - Persists selection in localStorage for consistency
 * - Tracks variant views in analytics
 */

import { browser } from '$app/environment';
import type { HeadlineVariant } from './variants';
import { variantsConfig, getVariantById } from './variants';
import { trackVariantView } from './analytics';

const STORAGE_KEY = 'bananarchy_variant';
const STORAGE_EXPIRY_KEY = 'bananarchy_variant_expiry';
const VARIANT_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

/**
 * Get URL search parameters
 */
function getUrlParams(): URLSearchParams {
	if (!browser) return new URLSearchParams();
	return new URLSearchParams(window.location.search);
}

/**
 * Get variant ID from UTM parameters
 */
function getVariantFromUTM(): string | null {
	const params = getUrlParams();

	// Check for explicit variant parameter
	const utmVariant = params.get('utm_variant');
	if (utmVariant && getVariantById(utmVariant)) {
		return utmVariant;
	}

	// Check for campaign mapping
	const utmCampaign = params.get('utm_campaign');
	if (utmCampaign && variantsConfig.campaignMapping?.[utmCampaign]) {
		const mappedVariant = variantsConfig.campaignMapping[utmCampaign];
		if (getVariantById(mappedVariant)) {
			return mappedVariant;
		}
	}

	return null;
}

/**
 * Get stored variant from localStorage (if not expired)
 */
function getStoredVariant(): string | null {
	if (!browser) return null;

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		const expiry = localStorage.getItem(STORAGE_EXPIRY_KEY);

		if (!stored || !expiry) return null;

		// Check if expired
		if (Date.now() > parseInt(expiry, 10)) {
			localStorage.removeItem(STORAGE_KEY);
			localStorage.removeItem(STORAGE_EXPIRY_KEY);
			return null;
		}

		// Validate variant still exists
		if (getVariantById(stored)) {
			return stored;
		}

		// Variant no longer exists - clean up localStorage
		localStorage.removeItem(STORAGE_KEY);
		localStorage.removeItem(STORAGE_EXPIRY_KEY);
		return null;
	} catch (e) {
		console.error('[useVariant] Error reading localStorage:', e);
		return null;
	}
}

/**
 * Store variant in localStorage with expiry
 */
function storeVariant(variantId: string): void {
	if (!browser) return;

	try {
		const expiry = Date.now() + VARIANT_TTL;
		localStorage.setItem(STORAGE_KEY, variantId);
		localStorage.setItem(STORAGE_EXPIRY_KEY, expiry.toString());
	} catch (e) {
		console.error('[useVariant] Error writing to localStorage:', e);
	}
}

/**
 * Select a random variant for A/B testing
 */
function selectRandomVariant(): string {
	const variants = variantsConfig.variants;
	const randomIndex = Math.floor(Math.random() * variants.length);
	return variants[randomIndex].id;
}

/**
 * Determine which variant to show
 */
function determineVariant(): { variant: HeadlineVariant; source: 'utm' | 'ab_test' } {
	// Priority 1: UTM parameters (for ad campaign targeting)
	const utmVariant = getVariantFromUTM();
	if (utmVariant) {
		const variant = getVariantById(utmVariant);
		if (variant) {
			storeVariant(utmVariant);
			return { variant, source: 'utm' };
		}
	}

	// Priority 2: Random A/B testing (if enabled)
	if (variantsConfig.enableRandomABTesting) {
		// Check for stored variant first (for consistency)
		const storedVariant = getStoredVariant();
		if (storedVariant) {
			const variant = getVariantById(storedVariant);
			if (variant) {
				return { variant, source: 'ab_test' };
			}
		}

		// Assign random variant
		const randomVariantId = selectRandomVariant();
		const variant = getVariantById(randomVariantId);
		if (variant) {
			storeVariant(randomVariantId);
			return { variant, source: 'ab_test' };
		}
	}

	// Priority 3: Default variant (used when A/B testing is disabled)
	if (variantsConfig.defaultVariantId) {
		const variant = getVariantById(variantsConfig.defaultVariantId);
		if (variant) {
			storeVariant(variantsConfig.defaultVariantId);
			return { variant, source: 'ab_test' };
		}
	}

	// Fallback: First variant (should never happen)
	return { variant: variantsConfig.variants[0], source: 'ab_test' };
}

/**
 * Svelte 5 composable for variant management
 */
export function useVariant() {
	let currentVariant = $state<HeadlineVariant>(variantsConfig.variants[0]);
	let variantSource = $state<'utm' | 'ab_test'>('ab_test');
	let isReady = $state(false);

	return {
		get variant() {
			return currentVariant;
		},
		get source() {
			return variantSource;
		},
		get isReady() {
			return isReady;
		},
		/**
		 * Initialize variant (should be called from onMount)
		 */
		initialize() {
			if (!browser || isReady) return;

			const { variant, source } = determineVariant();
			currentVariant = variant;
			variantSource = source;
			isReady = true;

			// Track variant view in analytics
			trackVariantView(variant.id, source);

			// Debug logging in development
			if (import.meta.env.DEV) {
				console.log('[useVariant] Variant selected:', {
					id: variant.id,
					source,
					headline: variant.headline,
					subheadline: variant.subheadline
				});
			}
		}
	};
}
