# GA4 Paid Social Attribution Fix - Changelog

## Date: 2026-04-06

## Problem Identified
GA4 was incorrectly classifying paid social traffic as organic social because:
1. UTM parameters were incomplete or missing from ad URLs
2. GA4 configuration wasn't explicitly enabling campaign parameter tracking
3. Critical `utm_medium` parameter was missing from URLs

## Changes Made

### 1. Updated GA4 Configuration
**File:** [src/routes/+layout.svelte](src/routes/+layout.svelte)

Added proper GA4 configuration to enable automatic campaign tracking:
```javascript
gtag('config', 'G-PRBBNH8JRZ', {
  campaign_parameters: 'auto',      // Enable automatic UTM tracking
  enhanced_measurement: true,        // Better attribution
  allow_linker: true                // Cross-domain support
});
```

### 2. Enhanced Analytics Tracking
**File:** [src/lib/analytics.ts](src/lib/analytics.ts)

Added three new functions:

**a) `getUTMParameters()`**
- Captures all UTM parameters from URL (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`)
- Captures click IDs (`gclid`, `fbclid`, `msclkid`, `ttclid`)

**b) `trackCampaignParameters()`**
- Sends UTM parameters explicitly to GA4 on page load
- Ensures proper attribution even if automatic tracking fails
- Called automatically in production mode

**c) `validateUTMParameters()`**
- Development-mode validator that checks for missing or incorrect UTM parameters
- Warns if paid social sources are missing `utm_medium`
- Provides helpful suggestions in console

### 3. Integration with Layout
**File:** [src/routes/+layout.svelte](src/routes/+layout.svelte)

- Added automatic UTM validation in development mode
- Added automatic campaign parameter tracking in production mode
- Ensures tracking fires on every page load

### 4. Documentation Created
**New File:** [UTM_TRACKING_GUIDE.md](UTM_TRACKING_GUIDE.md)

Comprehensive guide covering:
- Required UTM parameters for paid social
- Correct URL structure examples
- Platform-specific examples (Facebook, Instagram, TikTok, LinkedIn, Twitter)
- Common mistakes and how to fix them
- Testing and validation instructions
- GA4 verification steps

### 5. Updated Existing Documentation
**File:** [AB_TESTING_QUICK_START.md](AB_TESTING_QUICK_START.md)

- Updated UTM parameter examples to show correct format
- Added reference to new UTM_TRACKING_GUIDE.md

## What You Need to Do

### Immediate Action Required
Update all your paid social ad URLs to include proper UTM parameters:

**❌ Current (incorrect):**
```
https://bananarchy.com?utm_campaign=facebook
```

**✅ New (correct):**
```
https://bananarchy.com?utm_source=facebook&utm_medium=paid-social&utm_campaign=spring_launch
```

### Platform-Specific Templates

**Facebook/Instagram:**
```
?utm_source=facebook&utm_medium=paid-social&utm_campaign=CAMPAIGN_NAME&utm_content=AD_NAME
```

**TikTok:**
```
?utm_source=tiktok&utm_medium=paid-social&utm_campaign=CAMPAIGN_NAME&utm_content=AD_NAME
```

**LinkedIn:**
```
?utm_source=linkedin&utm_medium=cpc&utm_campaign=CAMPAIGN_NAME&utm_content=AD_NAME
```

## Testing Instructions

### Development Mode
```bash
npm run dev

# Test with correct parameters (no warnings):
http://localhost:5173?utm_source=facebook&utm_medium=paid-social&utm_campaign=test

# Test with incorrect parameters (shows warnings):
http://localhost:5173?utm_source=facebook
```

If you visit a URL with a social media source but missing `utm_medium`, you'll see a warning in the console explaining the issue.

### Production Verification

1. Deploy changes to production
2. Visit your site with proper UTM parameters
3. Check GA4 reports:
   - **Acquisition → Traffic acquisition**
   - Look for "Session source/medium"
   - Should show: `facebook / paid-social` (not just `facebook`)

## Expected Results

### Before Fix
- Paid social traffic showed as: **Organic Social**
- No campaign attribution
- Impossible to measure ROI

### After Fix
- Paid social traffic shows as: **Paid Social**
- Full campaign attribution with source, medium, campaign, content
- Accurate ROI measurement
- Clear campaign performance data

## Important Notes

1. **Historical data cannot be changed** - Only new traffic with correct UTM parameters will be properly attributed
2. **Wait 24-48 hours** - GA4 may take time to process and display corrected data
3. **Update all ad platforms** - Every paid social campaign needs updated URLs
4. **Consistency is key** - Use the same naming convention across all campaigns

## Files Modified

1. `src/routes/+layout.svelte` - GA4 config and tracking initialization
2. `src/lib/analytics.ts` - UTM capture and validation functions
3. `AB_TESTING_QUICK_START.md` - Updated examples and references

## Files Created

1. `UTM_TRACKING_GUIDE.md` - Comprehensive UTM tracking guide
2. `CHANGELOG_GA4_FIX.md` - This file

## Support Resources

- [UTM_TRACKING_GUIDE.md](UTM_TRACKING_GUIDE.md) - Full documentation
- [Google Campaign URL Builder](https://ga-dev-tools.google/campaign-url-builder/)
- [GA4 Documentation](https://support.google.com/analytics/answer/10917952)

## Questions?

If you're still seeing incorrect attribution after implementing:
1. Verify UTM parameters are present in the browser URL
2. Check GA4 DebugView in real-time
3. Ensure parameters aren't being stripped by redirects
4. Clear browser cache and test again
