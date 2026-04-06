/**
 * Analytics Tracking Helper
 *
 * Sends variant information to Google Analytics and Meta Pixel for A/B testing analysis.
 * Also handles UTM parameter tracking for proper campaign attribution.
 */

/**
 * Get all UTM parameters from the current URL
 */
function getUTMParameters(): Record<string, string> {
	if (typeof window === 'undefined') return {};

	const params = new URLSearchParams(window.location.search);
	const utmParams: Record<string, string> = {};

	// Capture all standard UTM parameters
	const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

	utmKeys.forEach((key) => {
		const value = params.get(key);
		if (value) {
			utmParams[key] = value;
		}
	});

	// Also capture click IDs for attribution
	const clickIdKeys = ['gclid', 'fbclid', 'msclkid', 'ttclid'];
	clickIdKeys.forEach((key) => {
		const value = params.get(key);
		if (value) {
			utmParams[key] = value;
		}
	});

	return utmParams;
}

/**
 * Send UTM parameters to GA4 on initial page load
 * This ensures proper campaign attribution even if automatic tracking fails
 */
export function trackCampaignParameters(): void {
	if (typeof window === 'undefined' || !window.gtag) return;

	const utmParams = getUTMParameters();

	// Only track if we have UTM parameters
	if (Object.keys(utmParams).length > 0) {
		window.gtag('event', 'campaign_parameters', {
			...utmParams,
			page_location: window.location.href,
			page_referrer: document.referrer || '(none)'
		});

		// Log for debugging in development
		if (import.meta.env.DEV) {
			console.log('[Analytics] Campaign parameters tracked:', utmParams);
		}
	}
}

/**
 * Validate UTM parameters and warn if paid traffic is missing critical params
 */
export function validateUTMParameters(): void {
	if (typeof window === 'undefined' || !import.meta.env.DEV) return;

	const params = new URLSearchParams(window.location.search);
	const utmSource = params.get('utm_source');
	const utmMedium = params.get('utm_medium');
	const utmCampaign = params.get('utm_campaign');

	// Check if this looks like paid traffic
	const paidSources = ['facebook', 'instagram', 'linkedin', 'twitter', 'tiktok', 'pinterest'];
	const isPaidSource = utmSource && paidSources.some((s) => utmSource.toLowerCase().includes(s));

	if (isPaidSource) {
		const warnings: string[] = [];

		if (!utmMedium) {
			warnings.push('⚠️ Missing utm_medium - GA4 may classify this as organic traffic!');
			warnings.push(
				'   Add utm_medium=paid-social or utm_medium=cpc to properly track paid campaigns'
			);
		} else if (!['cpc', 'paid-social', 'paidsocial', 'ppc'].includes(utmMedium.toLowerCase())) {
			warnings.push(
				`⚠️ utm_medium="${utmMedium}" may not be recognized as paid traffic by GA4`
			);
			warnings.push('   Consider using: paid-social, cpc, or ppc');
		}

		if (!utmCampaign) {
			warnings.push('⚠️ Missing utm_campaign - you won\'t be able to track campaign performance');
		}

		if (warnings.length > 0) {
			console.group('🚨 GA4 Campaign Tracking Warning');
			console.warn('This URL appears to be from a paid social campaign but has issues:');
			warnings.forEach((w) => console.warn(w));
			console.warn('\nCurrent URL:', window.location.href);
			console.warn(
				'\nExample correct URL: ?utm_source=facebook&utm_medium=paid-social&utm_campaign=spring_launch'
			);
			console.groupEnd();
		}
	}
}

/**
 * Track which headline variant was shown to the user
 */
export function trackVariantView(variantId: string, source: 'utm' | 'ab_test'): void {
	// Get UTM parameters for enriched tracking
	const utmParams = getUTMParameters();
	// Track in Google Analytics
	if (typeof window !== 'undefined' && window.gtag) {
		window.gtag('event', 'variant_view', {
			event_category: 'ab_test',
			event_label: variantId,
			variant_id: variantId,
			variant_source: source,
			// Include UTM parameters for correlation analysis
			...utmParams,
			// Custom dimension for better segmentation
			dimension1: variantId
		});
	}

	// Track in Meta Pixel
	if (typeof window !== 'undefined' && window.fbq) {
		window.fbq('trackCustom', 'VariantView', {
			variant_id: variantId,
			variant_source: source
		});
	}

	// Log for debugging in development
	if (import.meta.env.DEV) {
		console.log('[Analytics] Variant view tracked:', { variantId, source });
	}
}

/**
 * Track variant-specific conversions (e.g., email signup)
 */
export function trackVariantConversion(variantId: string, conversionType: string): void {
	// Track in Google Analytics
	if (typeof window !== 'undefined' && window.gtag) {
		window.gtag('event', 'conversion', {
			event_category: 'ab_test',
			event_label: `${variantId}_${conversionType}`,
			variant_id: variantId,
			conversion_type: conversionType
		});
	}

	// Track in Meta Pixel
	if (typeof window !== 'undefined' && window.fbq) {
		window.fbq('trackCustom', 'VariantConversion', {
			variant_id: variantId,
			conversion_type: conversionType
		});
	}

	// Log for debugging in development
	if (import.meta.env.DEV) {
		console.log('[Analytics] Variant conversion tracked:', { variantId, conversionType });
	}
}

// Type definitions for window objects
declare global {
	interface Window {
		gtag?: (
			command: string,
			eventName: string,
			params?: Record<string, string | number | boolean>
		) => void;
		fbq?: (command: string, eventName: string, params?: Record<string, string>) => void;
	}
}
