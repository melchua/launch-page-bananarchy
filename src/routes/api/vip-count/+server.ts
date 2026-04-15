import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MAILERLITE_API_KEY, GROUP_ID } from '$env/static/private';

// Cache the count for 5 minutes to avoid excessive API calls
let cachedCount: number | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const GET: RequestHandler = async () => {
	const now = Date.now();

	// Return cached value if still fresh
	if (cachedCount !== null && now - cacheTimestamp < CACHE_DURATION) {
		return json({ count: cachedCount, cached: true });
	}

	try {
		const response = await fetch(`https://connect.mailerlite.com/api/groups/${GROUP_ID}`, {
			headers: {
				Authorization: `Bearer ${MAILERLITE_API_KEY}`,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`MailerLite API error: ${response.status}`);
		}

		const data = await response.json();
		const count = data.data?.active_count || 0;

		// Update cache
		cachedCount = count;
		cacheTimestamp = now;

		return json({ count, cached: false });
	} catch (error) {
		console.error('Error fetching VIP count:', error);

		// Return cached value if available, even if expired
		if (cachedCount !== null) {
			return json({ count: cachedCount, cached: true, stale: true });
		}

		// Fallback to a reasonable estimate
		return json({ count: 200, cached: false, fallback: true });
	}
};
