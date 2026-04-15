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

/**
 * Track lead generation event (email signup)
 */
export function trackLead(value: number = 0): void {
	// Track in Meta Pixel
	if (typeof window !== 'undefined' && window.fbq) {
		window.fbq('track', 'Lead');
	}

	// Track in Google Analytics (GA4)
	if (typeof window !== 'undefined' && window.gtag) {
		window.gtag('event', 'generate_lead', {
			currency: 'USD',
			value: value,
			method: 'email_signup'
		});
	}

	// Log for debugging in development
	if (import.meta.env.DEV) {
		console.log('[Analytics] Lead tracked:', { value });
	}
}

/**
 * Track e-commerce purchase event (for VIP bonus)
 */
export function trackPurchase(transactionId: string, value: number = 1.0): void {
	// Track in Meta Pixel
	if (typeof window !== 'undefined' && window.fbq) {
		window.fbq('track', 'Purchase', {
			content_name: 'Bananarchy VIP Bonus',
			content_ids: ['vip_bonus'],
			content_type: 'product',
			content_category: 'expansion_pack',
			value: value,
			currency: 'USD',
			num_items: 1,
			transaction_id: transactionId
		});
	}

	// Track in Google Analytics (GA4)
	if (typeof window !== 'undefined' && window.gtag) {
		window.gtag('event', 'purchase', {
			transaction_id: transactionId,
			value: value,
			currency: 'USD',
			items: [
				{
					item_id: 'vip_bonus',
					item_name: 'Bananarchy VIP Bonus Expansion',
					item_category: 'expansion_pack',
					price: value,
					quantity: 1
				}
			]
		});
	}

	// Log for debugging in development
	if (import.meta.env.DEV) {
		console.log('[Analytics] Purchase tracked:', { transactionId, value });
	}
}

/**
 * Track checkout initiation (for VIP bonus)
 */
export function trackBeginCheckout(buttonLocation?: string, value: number = 1.0): void {
	// Track in Meta Pixel
	if (typeof window !== 'undefined' && window.fbq) {
		const fbqParams: Record<string, string | number | boolean | Array<string>> = {
			content_name: 'Bananarchy VIP Bonus Cards',
			content_ids: ['vip_bonus'],
			content_type: 'product',
			content_category: 'expansion_pack',
			value: value,
			currency: 'USD',
			num_items: 1
		};
		if (buttonLocation) {
			fbqParams.button_location = buttonLocation;
		}
		window.fbq('track', 'InitiateCheckout', fbqParams);
	}

	// Track in Google Analytics (GA4)
	if (typeof window !== 'undefined' && window.gtag) {
		const gtagParams: Record<string, string | number | boolean | object | Array<unknown>> = {
			value: value,
			currency: 'USD',
			items: [
				{
					item_id: 'vip_bonus',
					item_name: 'Bananarchy VIP Bonus Expansion',
					item_category: 'expansion_pack',
					price: value,
					quantity: 1
				}
			]
		};
		if (buttonLocation) {
			gtagParams.button_location = buttonLocation;
		}
		window.gtag('event', 'begin_checkout', gtagParams);
	}

	// Log for debugging in development
	if (import.meta.env.DEV) {
		console.log('[Analytics] Begin checkout tracked:', { buttonLocation, value });
	}
}

// Type definitions for window objects
declare global {
	interface Window {
		gtag?: (
			command: string,
			eventName: string,
			params?: Record<string, string | number | boolean | object | Array<unknown>>
		) => void;
		fbq?: (
			command: string,
			eventName: string,
			params?: Record<string, string | number | boolean | Array<string>>
		) => void;
	}
}
