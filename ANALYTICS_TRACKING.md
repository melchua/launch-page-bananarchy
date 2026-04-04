# Analytics Tracking Behavior

## Current Configuration ✅

Analytics tracking is now **properly disabled in development mode** to prevent polluting your production data with test events.

## Tracking Behavior

### Development Mode (npm run dev)

When running locally at `http://localhost:5173`:

**Google Analytics:**
- ❌ Script **NOT loaded** (saves bandwidth)
- ❌ Events **NOT sent** to Google
- ✅ Mock function logs to console: `🚫 Google Analytics (DEV - not tracked): ...`

**Meta Pixel:**
- ❌ Script **NOT loaded**
- ❌ Events **NOT sent** to Facebook
- ✅ Mock function logs to console: `🚫 Meta Pixel (DEV - not tracked): ...`

**Variant Tracking:**
- ✅ Variant selection logic still runs normally
- ✅ Console logs show: `[useVariant] Variant selected: ...`
- ✅ Console logs show: `[Analytics] Variant view tracked: ...`
- ❌ No actual data sent to analytics platforms

**What you'll see in the browser console:**
```
Google Analytics: Disabled (development mode)
Meta Pixel: Disabled (development mode)
[useVariant] Variant selected: { id: 'default', source: 'ab_test', ... }
🚫 Google Analytics (DEV - not tracked): event variant_view {...}
🚫 Meta Pixel (DEV - not tracked): trackCustom VariantView {...}
[Analytics] Variant view tracked: { variantId: 'default', source: 'ab_test' }
```

---

### Production Mode (npm run build / deployed site)

When deployed to production:

**Google Analytics:**
- ✅ Script **LOADED** from `googletagmanager.com`
- ✅ Events **SENT** to Google Analytics
- ✅ Tracks `PageView`, `variant_view`, and conversion events

**Meta Pixel:**
- ✅ Script **LOADED** from `facebook.net`
- ✅ Events **SENT** to Meta Pixel
- ✅ Tracks `PageView`, `VariantView`, and `VariantConversion` events

**Variant Tracking:**
- ✅ Full tracking enabled
- ✅ All events sent to both platforms
- ✅ Data appears in your analytics dashboards

---

## Implementation Details

### Code Changes Made

**1. Google Analytics - Disabled in Development**

In [src/routes/+layout.svelte](src/routes/+layout.svelte):

```typescript
// Initialize Google Analytics (only in production)
if (dev) {
    // Mock gtag function in development
    window.gtag = function () {
        console.log('🚫 Google Analytics (DEV - not tracked):', ...arguments);
    };
    console.log('Google Analytics: Disabled (development mode)');
}
```

**2. Google Analytics Script - Only Loads in Production**

In `<svelte:head>`:

```svelte
<!-- Google tag (gtag.js) - production only -->
{#if !dev}
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-PRBBNH8JRZ"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-PRBBNH8JRZ');
    </script>
{/if}
```

**3. Meta Pixel - Already Disabled in Development**

Meta Pixel was already configured correctly (no changes needed).

---

## Benefits

✅ **Clean analytics data** - No test events polluting production metrics
✅ **Faster dev experience** - No unnecessary network requests
✅ **Full debugging** - Console logs show what *would* be tracked
✅ **Easy testing** - Still see variant selection and tracking logic work
✅ **Production-ready** - Full tracking when deployed

---

## Testing

### Test Development Mode

```bash
npm run dev
# Open http://localhost:5173
# Open browser console
# You should see:
# - "Google Analytics: Disabled (development mode)"
# - "Meta Pixel: Disabled (development mode)"
# - Variant tracking logs with 🚫 emoji
```

### Test Production Build Locally

```bash
npm run build
npm run preview
# Open http://localhost:4173
# Open browser console & Network tab
# You should see:
# - Google Analytics script loaded
# - Meta Pixel script loaded
# - Real tracking events sent
```

---

## Troubleshooting

**Q: I don't see console logs in development**
- Check browser console (not terminal)
- Refresh the page
- Make sure dev server is running (`npm run dev`)

**Q: Analytics not tracking in production**
- Verify you ran `npm run build` (not just `npm run dev`)
- Check Network tab for analytics requests
- Verify `{#if !dev}` conditional in layout

**Q: How do I test analytics without deploying?**
- Use `npm run build && npm run preview`
- This builds production version and serves it locally
- Analytics will work as if deployed

---

## Summary

**Before:** Google Analytics tracked everything (dev + production) ❌
**After:** Only production is tracked, dev is mocked ✅

This is standard best practice for analytics implementations!
