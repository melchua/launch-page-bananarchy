# MailerLite Custom Form Integration

This project uses a **custom HTML form** that submits directly to MailerLite's API via a Cloudflare Function, replacing the previous embedded iframe approach.

## Architecture

### Components

1. **Form Component** ([src/lib/MailerForm/page.svelte](src/lib/MailerForm/page.svelte))
   - Custom HTML form with email validation
   - Loading states and error handling
   - Meta Pixel tracking on successful submission
   - Automatic redirect to thank you page

2. **Cloudflare Function** ([functions/api/mailerlite.js](functions/api/mailerlite.js))
   - Serverless function that runs on Cloudflare's edge network
   - Securely handles API key (not exposed to client)
   - Submits emails to MailerLite API
   - Maps form IDs to MailerLite group IDs

### Flow

```
User enters email → Form validates → POST to /api/mailerlite
  → Cloudflare Function → MailerLite API → Success/Error response
  → Meta Pixel tracking → Redirect to /thankyou
```

## Development

### Local Development

To test the form locally with Cloudflare Functions:

1. **Build the project first:**
   ```bash
   npm run build
   ```

2. **Run with Wrangler:**
   ```bash
   npm run preview:wrangler
   ```

This will:
- Serve the built site with Cloudflare Functions enabled
- Load the `MAILERLITE_API_KEY` from your `.env` file
- Allow testing the `/api/mailerlite` endpoint locally

### Standard Development (without Functions)

For regular development without testing the form:

```bash
npm run dev
```

**Note:** The form submission will fail in regular dev mode because the Cloudflare Function endpoint doesn't exist in Vite's dev server.

## Configuration

### Environment Variables

The following environment variables are required:

- **`.env`** (development):
  ```
  MAILERLITE_API_KEY=your_dev_api_key_here
  ```

- **`.env.production`** (production):
  ```
  MAILERLITE_API_KEY=your_production_api_key_here
  ```

### Form & Group IDs

In [functions/api/mailerlite.js](functions/api/mailerlite.js:5-8), update the form-to-group mapping:

```javascript
const FORM_TO_GROUP_MAP = {
  'PpGtBJ': '139476093355732942',  // Dev form → Dev group
  '6rXIiU': '139476095146813403'   // Prod form → Prod group
};
```

To find your MailerLite group IDs:
1. Go to MailerLite dashboard → Subscribers → Groups
2. Click on a group
3. The group ID is in the URL: `https://dashboard.mailerlite.com/subscribers/groups/{group_id}`

## Deployment to Cloudflare Pages

### 1. Set Environment Variable

In your Cloudflare Pages dashboard:
1. Go to your project → Settings → Environment variables
2. Add: `MAILERLITE_API_KEY` = `your_production_api_key`
3. Choose "Production" environment

### 2. Deploy

Cloudflare Pages will automatically:
- Build your project with `npm run build`
- Deploy the `/build` directory as a static site
- Deploy the `/functions` directory as Cloudflare Functions
- Make the function available at `/api/mailerlite`

### 3. Verify

After deployment, test the form on your live site:
1. Enter an email and submit
2. Check your MailerLite dashboard for the new subscriber
3. Verify the thank you page redirect works

## Benefits of Custom Integration

### vs. Embedded Script (Previous Approach)

✅ **Full control** over form HTML and styling
✅ **No iframe** or embedded script performance overhead
✅ **No external dependencies** (MailerLite Universal script removed)
✅ **Custom validation** and error messages
✅ **Better UX** with loading states and instant feedback
✅ **Secure** - API key never exposed to client
✅ **Fast** - runs on Cloudflare's edge network

### vs. Direct API Calls from Client

✅ **Secure** - API key stays on server
✅ **Reliable** - centralized error handling
✅ **Flexible** - easy to add features like anti-spam, rate limiting

## Troubleshooting

### Form submission fails with 404

**Problem:** The Cloudflare Function isn't running locally.

**Solution:** Use `npm run preview:wrangler` instead of `npm run dev`.

### API key error

**Problem:** `MAILERLITE_API_KEY` not configured.

**Solution:**
- Local: Check `.env` file has the API key
- Production: Check Cloudflare Pages environment variables

### Email not appearing in MailerLite

**Problem:** Wrong group ID or form ID.

**Solution:**
1. Verify group IDs in [functions/api/mailerlite.js](functions/api/mailerlite.js)
2. Check browser console for error messages
3. Verify the form ID matches in both files

## API Reference

### POST /api/mailerlite

**Request:**
```json
{
  "email": "user@example.com",
  "formId": "6rXIiU"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": { /* MailerLite subscriber data */ }
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message here"
}
```

## File Structure

```
src/
├── lib/
│   └── MailerForm/
│       └── page.svelte         # Custom form component
└── routes/
    └── +layout.svelte          # Meta Pixel (MailerLite script removed)

functions/
└── api/
    └── mailerlite.js           # Cloudflare Function for form submission

.env                            # Dev API key (gitignored)
.env.production                 # Production API key (gitignored)
```
