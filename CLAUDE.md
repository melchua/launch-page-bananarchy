# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **SvelteKit 5** landing page for Bananarchy, a party card game. The project uses:
- **Static Site Generation (SSG)** via `@sveltejs/adapter-static` configured for Cloudflare Pages deployment
- **Svelte 5** with the new runes API (`$props`, `$state`, etc.)
- **TypeScript** for type safety
- **Tailwind CSS** with custom configuration for styling
- **Enhanced Images** plugin for optimized image loading
- **Vitest** for unit testing

## Development Commands

```bash
# Start development server (runs on http://0.0.0.0:5173)
npm run dev

# Build for production (outputs to /build directory)
npm run build

# Preview production build
npm run preview

# Type checking
npm run check
npm run check:watch

# Linting and formatting
npm run lint          # Check both Prettier and ESLint
npm run format        # Auto-format with Prettier

# Testing
npm run test:unit     # Run tests in watch mode
npm run test          # Run tests once
```

## Architecture

### Static Site Generation (SSG)
- Configured with `adapter-static` to generate a static site
- The `prerender = true` export in [+layout.svelte](src/routes/+layout.svelte) enables prerendering for all routes
- Fallback set to `index.html` for SPA-style routing
- Outputs to `/build` directory for deployment to Cloudflare Pages

### Routing Structure
- **[src/routes/+page.svelte](src/routes/+page.svelte)**: Main landing page with hero section, feature highlights, and CTAs
- **[src/routes/+layout.svelte](src/routes/+layout.svelte)**: Root layout that loads fonts (Londrina Solid, Poppins), global styles, and includes third-party scripts (Google Analytics, MailerLite)
- **[src/routes/thankyou/+page.svelte](src/routes/thankyou/+page.svelte)**: Thank you page after email signup
- **[src/routes/vip/+page.svelte](src/routes/vip/+page.svelte)**: VIP expansion offer page

### Components
- **[src/components/Footer.svelte](src/components/Footer.svelte)**: Email signup footer with MailerLite form integration
- **[src/components/ConcentricCircles.svelte](src/components/ConcentricCircles.svelte)**: Decorative animated component
- **[src/lib/MailerForm/page.svelte](src/lib/MailerForm/page.svelte)**: Email capture form component

### Assets
All visual assets are stored in [src/lib/assets/](src/lib/assets/) including:
- Product images (boxes, cards, artwork)
- Background images and decorative elements
- Kickstarter branding assets

### Styling
- Global styles in [src/app.css](src/app.css)
- Custom Tailwind configuration in [tailwind.config.ts](tailwind.config.ts) with:
  - Custom color palette (`baorange`, `bapurple`, etc.)
  - Custom breakpoints for mobile (`mobile-sm`, `mobile-xs`, `mobile-xxs`)
  - Custom animations (`bounce-in` / `bounceDown`)
  - Custom font families (Londrina Solid for headlines, Poppins for body)

### Enhanced Images
- Uses `@sveltejs/enhanced-img` plugin for automatic image optimization
- Import images from `$lib/assets/` and use `<enhanced:img>` component
- Automatically generates responsive image sets and optimized formats

### Third-Party Integrations
The layout includes:
- **Google Analytics** (gtag.js)
- **MailerLite** email capture (embedded forms and universal script)
- **PostHog** analytics (currently commented out but configured)

### Environment Variables
- `.env` and `.env.production` files exist but are not tracked in git
- Used for API keys and configuration secrets

## Deployment

Deployed to **Cloudflare Pages** as a static site. The build process:
1. Runs `npm run build` which executes `vite build`
2. SvelteKit generates static HTML/CSS/JS to `/build` directory
3. Cloudflare Pages serves the static files

## Font Loading
Fonts are loaded via fontsource packages (`@fontsource/londrina-solid`, `@fontsource/poppins`). Londrina Solid is preloaded in the layout to prevent FOUT (Flash of Unstyled Text).

## Key Technical Notes
- Svelte 5 uses new runes syntax: `let { children } = $props()` instead of `$$slots`
- All routes are prerendered by default due to `export const prerender = true` in the layout
- Development server is configured to run on `0.0.0.0:5173` with CORS enabled
- Image optimization happens at build time via `enhancedImages()` vite plugin
