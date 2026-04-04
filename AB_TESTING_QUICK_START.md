# A/B Testing Quick Start

## Current Configuration ✅

**Random A/B Testing: OFF** (Default behavior)

```typescript
// In src/lib/variants.ts
enableRandomABTesting: false  // ← Currently OFF
defaultVariantId: 'default'   // ← Everyone sees this variant
```

## What This Means

### All Visitors See:
**"Cute Monkeys. Clever Tricks. Wild Plays."**
*"A fast, strategic party game where every move matters."*

### Except When Using UTM Parameters:
- `?utm_variant=short` → Shows "short" variant
- `?utm_variant=strategic` → Shows "strategic" variant
- `?utm_campaign=facebook` → Shows "short" variant (mapped)
- `?utm_campaign=google` → Shows "strategic" variant (mapped)

## How to Toggle A/B Testing

### Option 1: Turn ON Random A/B Testing

Edit [src/lib/variants.ts](src/lib/variants.ts):

```typescript
enableRandomABTesting: true  // Change false → true
```

**Result:** Organic visitors randomly get assigned variants (persists 30 days)

### Option 2: Change Default Variant

Edit [src/lib/variants.ts](src/lib/variants.ts):

```typescript
defaultVariantId: 'short'  // Change 'default' → 'short'
```

**Result:** Everyone now sees the "short" variant by default

### Option 3: Add New Variant

Edit [src/lib/variants.ts](src/lib/variants.ts):

```typescript
variants: [
	// ... existing variants ...
	{
		id: 'new-variant',
		headline: '<span class="highlight-text">Your</span> Headline',
		subheadline: 'Your subheadline text'
	}
]
```

## Testing Your Changes

```bash
# Start dev server
npm run dev

# Test URLs:
http://localhost:5173                          # Shows default variant
http://localhost:5173?utm_variant=short        # Shows short variant
http://localhost:5173?utm_variant=strategic    # Shows strategic variant
http://localhost:5173?utm_campaign=facebook    # Shows short (mapped)
```

## Current Variants Available

1. **default** - "Cute Monkeys. Clever Tricks. Wild Plays."
2. **short** - "Fast Fun. Big Laughs. Zero Mercy."
3. **strategic** - "Outsmart Friends. Steal Bananas. Win Big."
4. **chaos** - "Steal. Sabotage. Survive."
5. **instigator** - "The turn-based game where no one waits their turn."

## Recommendation

✅ **Keep A/B testing OFF** until you're ready to run a proper test with:
- At least 1,000 visitors per week
- 1-2 week minimum test duration
- Clear conversion metrics (email signups, etc.)

📊 **Use UTM targeting** to test different messages for different ad platforms right now without affecting organic traffic.

## Files to Edit

- **[src/lib/variants.ts](src/lib/variants.ts)** - Main configuration (edit this!)
- **[AB_TESTING_GUIDE.md](AB_TESTING_GUIDE.md)** - Full documentation
- **[VARIANT_EXAMPLES.md](VARIANT_EXAMPLES.md)** - Inspiration for new variants
