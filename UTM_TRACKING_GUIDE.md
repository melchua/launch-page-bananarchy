# UTM Tracking & GA4 Attribution Guide

## 🚨 Critical Issue Solved

**Problem:** GA4 was classifying paid social traffic as organic social because UTM parameters were incomplete or missing.

**Solution:** This guide ensures your paid campaigns are properly tracked in GA4.

---

## Required UTM Parameters for Paid Social

For GA4 to correctly identify paid social traffic, you **must** include these three parameters:

### 1. `utm_source` (Required)
Identifies which platform the traffic came from.

**Examples:**
- `facebook`
- `instagram`
- `linkedin`
- `twitter`
- `tiktok`
- `pinterest`

### 2. `utm_medium` (CRITICAL!)
Tells GA4 this is **paid** traffic, not organic.

**Correct values for paid social:**
- `paid-social` (recommended)
- `cpc` (cost-per-click)
- `ppc` (pay-per-click)
- `paidsocial` (no hyphen also works)

⚠️ **Without this, GA4 will classify your paid ads as organic social!**

### 3. `utm_campaign` (Required)
Your campaign name for tracking performance.

**Examples:**
- `spring_launch`
- `may_promo`
- `holiday_sale_2024`

### 4. `utm_content` (Optional but Recommended)
Differentiates ads within the same campaign.

**Examples:**
- `video_ad`
- `carousel_ad`
- `story_ad`
- `ad_set_1`

### 5. `utm_term` (Optional)
For keyword targeting or audience segmentation.

**Examples:**
- `retargeting`
- `lookalike_audience`
- `interest_card_games`

---

## Correct URL Structure

### ✅ Correct Example (Paid Social)

```
https://bananarchy.com?utm_source=facebook&utm_medium=paid-social&utm_campaign=spring_launch&utm_content=video_ad
```

**GA4 will classify this as:** Paid Social

### ❌ Wrong Example (Will Show as Organic)

```
https://bananarchy.com?utm_campaign=facebook
```

**Why it's wrong:**
- Missing `utm_source`
- Missing `utm_medium` (most critical!)
- GA4 defaults to organic traffic without `utm_medium`

---

## Platform-Specific Examples

### Facebook Ads

```
?utm_source=facebook&utm_medium=paid-social&utm_campaign=q2_acquisition&utm_content=carousel_ad&utm_term=card_game_fans
```

### Instagram Ads

```
?utm_source=instagram&utm_medium=paid-social&utm_campaign=q2_acquisition&utm_content=story_ad&utm_term=lifestyle_audience
```

### LinkedIn Ads

```
?utm_source=linkedin&utm_medium=cpc&utm_campaign=b2b_outreach&utm_content=sponsored_content
```

### TikTok Ads

```
?utm_source=tiktok&utm_medium=paid-social&utm_campaign=viral_push&utm_content=spark_ad
```

### Twitter/X Ads

```
?utm_source=twitter&utm_medium=paid-social&utm_campaign=engagement_boost&utm_content=promoted_tweet
```

---

## Testing Your UTM Parameters

### Development Mode Validation

When running `npm run dev`, the app will **automatically validate** your UTM parameters and warn you if:

1. You're using a social media source without `utm_medium`
2. Your `utm_medium` value might not be recognized as paid traffic
3. You're missing `utm_campaign`

**Example warning in console:**

```
🚨 GA4 Campaign Tracking Warning
This URL appears to be from a paid social campaign but has issues:
⚠️ Missing utm_medium - GA4 may classify this as organic traffic!
   Add utm_medium=paid-social or utm_medium=cpc to properly track paid campaigns
⚠️ Missing utm_campaign - you won't be able to track campaign performance

Current URL: http://localhost:5173?utm_source=facebook

Example correct URL: ?utm_source=facebook&utm_medium=paid-social&utm_campaign=spring_launch
```

### Test URLs

```bash
# Start dev server
npm run dev

# Test with correct parameters (no warnings)
http://localhost:5173?utm_source=facebook&utm_medium=paid-social&utm_campaign=test

# Test with incorrect parameters (shows warnings)
http://localhost:5173?utm_source=facebook
http://localhost:5173?utm_source=instagram&utm_medium=social
```

---

## How GA4 Attribution Works

### Traffic Classification Rules

| utm_medium Value | GA4 Classification |
|-----------------|-------------------|
| `paid-social` | Paid Social |
| `cpc` | Paid Search (or Paid Social if utm_source is social) |
| `ppc` | Paid Search |
| `paidsocial` | Paid Social |
| `social` | Organic Social ⚠️ |
| (missing) | Referral or Organic Social ⚠️ |

### Why `utm_medium` is Critical

GA4's default channel grouping logic:

1. **Has `utm_medium=paid-social`** → Paid Social ✅
2. **Has `utm_source=facebook` but NO `utm_medium`** → Organic Social ❌
3. **Has `utm_medium=social`** → Organic Social ❌

---

## URL Builder Tools

### Google's Campaign URL Builder
https://ga-dev-tools.google/campaign-url-builder/

### Quick Copy Templates

#### Facebook:
```
?utm_source=facebook&utm_medium=paid-social&utm_campaign=CAMPAIGN_NAME&utm_content=CONTENT_ID
```

#### Instagram:
```
?utm_source=instagram&utm_medium=paid-social&utm_campaign=CAMPAIGN_NAME&utm_content=CONTENT_ID
```

#### TikTok:
```
?utm_source=tiktok&utm_medium=paid-social&utm_campaign=CAMPAIGN_NAME&utm_content=CONTENT_ID
```

---

## A/B Testing Integration

This landing page also supports variant testing via UTM parameters:

### `utm_variant` Parameter

Force a specific headline variant:

```
?utm_source=facebook&utm_medium=paid-social&utm_campaign=test&utm_variant=monkey-king-short
```

**Available variants:**
- `default`
- `monkey-king-short`

See [AB_TESTING_GUIDE.md](AB_TESTING_GUIDE.md) for full variant documentation.

---

## Verifying in GA4

### Check Your Reports

1. **Acquisition → Traffic acquisition**
   - Look for "Session source/medium" dimension
   - Paid social should show as: `facebook / paid-social`

2. **Acquisition → User acquisition**
   - Check "First user source/medium"
   - Should show proper attribution

3. **Reports → Engagement → Events**
   - Look for `campaign_parameters` event
   - Check event parameters include all UTM values

### Debug View (Real-time Testing)

1. Enable GA4 Debug Mode in Chrome DevTools
2. Visit your URL with UTM parameters
3. Check GA4 DebugView in real-time
4. Verify `campaign_parameters` event fires

---

## Common Mistakes

### ❌ Mistake 1: Using `utm_medium=social`
```
?utm_source=facebook&utm_medium=social
```
**Fix:** Change to `utm_medium=paid-social`

### ❌ Mistake 2: Only using `utm_campaign`
```
?utm_campaign=facebook_ad
```
**Fix:** Add source and medium:
```
?utm_source=facebook&utm_medium=paid-social&utm_campaign=facebook_ad
```

### ❌ Mistake 3: Inconsistent naming
```
Day 1: ?utm_campaign=Spring_Launch
Day 2: ?utm_campaign=spring-launch
```
**Fix:** Use consistent naming (e.g., lowercase with underscores)

### ❌ Mistake 4: Spaces in parameters
```
?utm_campaign=Spring Launch 2024
```
**Fix:** Use URL encoding or replace spaces:
```
?utm_campaign=spring_launch_2024
```

---

## Best Practices

### ✅ Naming Conventions

**Use lowercase:**
```
utm_campaign=spring_launch  ✅
utm_campaign=Spring_Launch  ❌
```

**Use underscores or hyphens (be consistent):**
```
utm_campaign=spring_launch_2024  ✅
utm_campaign=SpringLaunch2024    ❌
```

**Be descriptive:**
```
utm_content=video_ad_60s  ✅
utm_content=ad1           ❌
```

### ✅ Organization

Create a tracking spreadsheet with:
- Campaign name
- Platform
- Full UTM URL
- Launch date
- Performance metrics

---

## Implementation Checklist

- [ ] All paid social ads include `utm_source`
- [ ] All paid social ads include `utm_medium=paid-social`
- [ ] All paid social ads include `utm_campaign`
- [ ] UTM parameters use consistent naming
- [ ] Tested URLs in development mode (no warnings)
- [ ] Verified in GA4 Acquisition reports
- [ ] Created tracking spreadsheet

---

## Technical Details

### What the Code Does

1. **[+layout.svelte:81-88](src/routes/+layout.svelte#L81-L88)**: GA4 config enables automatic campaign tracking
2. **[analytics.ts:43-61](src/lib/analytics.ts#L43-L61)**: Manual UTM tracking for redundancy
3. **[analytics.ts:66-108](src/lib/analytics.ts#L66-L108)**: Development mode validator warns about issues
4. **[+layout.svelte:19-34](src/routes/+layout.svelte#L19-L34)**: Initialization on page load

### Auto-Captured Parameters

GA4 automatically captures:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `gclid` (Google Ads)
- `fbclid` (Facebook Ads)
- `msclkid` (Microsoft Ads)
- `ttclid` (TikTok Ads)

---

## Support

If GA4 is still showing incorrect attribution after implementing these changes:

1. Clear browser cache
2. Wait 24-48 hours for GA4 to process data
3. Check GA4 DebugView in real-time
4. Verify URL parameters are preserved through redirects

For historical data, note that **past traffic cannot be re-attributed**. Only new traffic with correct UTM parameters will be properly classified.
