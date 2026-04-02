/**
 * Analytics Tracking Helper
 *
 * Sends variant information to Google Analytics and Meta Pixel for A/B testing analysis.
 */

/**
 * Track which headline variant was shown to the user
 */
export function trackVariantView(variantId: string, source: 'utm' | 'ab_test'): void {
	// Track in Google Analytics
	if (typeof window !== 'undefined' && window.gtag) {
		window.gtag('event', 'variant_view', {
			event_category: 'ab_test',
			event_label: variantId,
			variant_id: variantId,
			variant_source: source,
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
