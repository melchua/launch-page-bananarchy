# A/B Testing Guide

This project now supports headline and subheadline A/B testing with UTM parameter targeting.

## How It Works

The system automatically selects which headline/subheadline variant to show based on:

1. **UTM Parameters** (highest priority) - Target specific variants for ad campaigns
2. **Random A/B Test** (if enabled) - Randomly assign variants to new visitors
3. **Default Variant** (if A/B testing disabled) - Show the same variant to everyone

## Configuration

Edit the variants in **[src/lib/variants.ts](src/lib/variants.ts)**:

```typescript
export const variantsConfig: VariantsConfig = {
	variants: [
		{
			id: 'default',
			headline: '<span class="highlight-text">Cute</span> Monkeys...',
			subheadline: 'A fast, strategic party game...'
		},
		{
			id: 'short',
			headline: '<span class="highlight-text">Fast Fun.</span>...',
			subheadline: 'The party game that ruins friendships...'
		},
		// Add more variants here
	],

	// Map UTM campaigns to specific variants
	campaignMapping: {
		facebook: 'short',
		instagram: 'short',
		google: 'strategic',
		// Add more mappings
	},

	// Default variant (shown when A/B testing is disabled)
	defaultVariantId: 'default',

	// Toggle random A/B testing ON or OFF
	// true = random variant assignment for organic traffic
	// false = all organic traffic sees defaultVariantId (DEFAULT)
	enableRandomABTesting: false
};
```

## Usage Examples

### 1. Target Specific Variant via UTM

Use `utm_variant` parameter to force a specific variant:

```
https://yourdomain.com?utm_variant=short
https://yourdomain.com?utm_variant=strategic
https://yourdomain.com?utm_variant=chaos
```

### 2. Campaign-Based Targeting

Use `utm_campaign` parameter (automatically mapped via `campaignMapping`):

```
https://yourdomain.com?utm_campaign=facebook    → Shows 'short' variant
https://yourdomain.com?utm_campaign=instagram   → Shows 'short' variant
https://yourdomain.com?utm_campaign=google      → Shows 'strategic' variant
```

### 3. Random A/B Testing (Optional)

**By default, random A/B testing is OFF.** All visitors without UTM params see the `defaultVariantId`.

To enable random A/B testing, set `enableRandomABTesting: true` in [src/lib/variants.ts](src/lib/variants.ts):

```typescript
enableRandomABTesting: true  // Enable random variant assignment
```

When enabled, visitors without UTM parameters will be randomly assigned variants:

```
https://yourdomain.com    → Randomly selects from all variants (when enabled)
```

## Analytics Tracking

Variant views are automatically tracked in:

- **Google Analytics** - Event: `variant_view` with `variant_id` and `variant_source`
- **Meta Pixel** - Custom Event: `VariantView`

Track conversions with the variant using:

```typescript
import { trackVariantConversion } from '$lib/analytics';

// Example: Track email signup
trackVariantConversion(variant.id, 'email_signup');
```

## Debugging

In development mode, variant selection is logged to the console:

```
[useVariant] Variant selected: { id: 'short', source: 'utm', headline: '...', subheadline: '...' }
[Analytics] Variant view tracked: { variantId: 'short', source: 'utm' }
```

## Toggling A/B Testing On/Off

### Current State: OFF (Default)

By default, `enableRandomABTesting: false` means:
- ✅ All organic traffic sees the `default` variant
- ✅ UTM-targeted traffic still works (e.g., `?utm_variant=short`)
- ✅ No random assignment, consistent experience for everyone

### To Enable A/B Testing

Change one line in [src/lib/variants.ts](src/lib/variants.ts):

```typescript
enableRandomABTesting: true  // Change false → true
```

Now organic traffic will be randomly assigned variants and that assignment persists for 30 days.

### When to Use Each Mode

**A/B Testing OFF (current):**
- When you're not actively running tests
- When you want a single consistent message
- For production stability after finding a winner

**A/B Testing ON:**
- When actively testing new headlines/subheadlines
- When you have sufficient traffic (1000+ visitors/week recommended)
- When you're ready to analyze results and pick a winner

## Best Practices

1. **Keep variant IDs simple**: Use descriptive names like `short`, `strategic`, `chaos`
2. **Test one thing at a time**: Change either headline OR subheadline, not both randomly
3. **Use consistent UTM parameters**: Document your campaign mapping strategy
4. **Monitor analytics**: Check Google Analytics for variant performance
5. **Give tests time**: Run for at least 1-2 weeks for statistical significance
6. **Start with A/B testing OFF**: Only enable when you're ready to run a test

## Files Modified/Created

- **[src/lib/variants.ts](src/lib/variants.ts)** - Variant configuration
- **[src/lib/useVariant.svelte.ts](src/lib/useVariant.svelte.ts)** - Variant selection logic
- **[src/lib/analytics.ts](src/lib/analytics.ts)** - Analytics tracking
- **[src/routes/+page.svelte](src/routes/+page.svelte)** - Updated to use variants

## Technical Details

- **Persistence**: Variants are stored in localStorage with 30-day expiry
- **SSG Compatible**: All variant logic runs client-side (works with static site generation)
- **Svelte 5 Runes**: Uses modern `$state` reactive primitives
- **Graceful Fallback**: Shows default content while variant loads (prevents layout shift)
- **Type Safe**: Full TypeScript support with proper types
