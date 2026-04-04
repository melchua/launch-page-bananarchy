# Variant Examples

Here are some example headlines and subheadlines you can add to your A/B testing configuration.

## How to Add New Variants

Edit **[src/lib/variants.ts](src/lib/variants.ts)** and add new objects to the `variants` array:

```typescript
{
	id: 'your-variant-id',
	headline: 'Your Headline with <span class="highlight-text">Highlights</span>',
	subheadline: 'Your subheadline text'
}
```

## Example Variants

### 1. Value Proposition Focused

```typescript
{
	id: 'value',
	headline: '<span class="highlight-text">Learn in 60 Seconds.</span> <br /><span class="highlight-text">Play for Hours.</span> <br /><span class="highlight-text">Laugh All Night.</span>',
	subheadline: 'The party game that gets everyone playing instantly.'
}
```

### 2. Social Proof Angle

```typescript
{
	id: 'social',
	headline: '<span class="highlight-text">10,000+</span> Backers. <br /><span class="highlight-text">5-Star</span> Reviews. <br /><span class="highlight-text">Endless</span> Fun.',
	subheadline: 'Join thousands who made this their favorite party game.'
}
```

### 3. Competitive Angle

```typescript
{
	id: 'competitive',
	headline: '<span class="highlight-text">Beat</span> Your Friends. <br /><span class="highlight-text">Steal</span> Their Bananas. <br /><span class="highlight-text">Claim</span> Victory.',
	subheadline: 'Think you can outsmart everyone at the table? Prove it.'
}
```

### 4. Simplicity Focused

```typescript
{
	id: 'simple',
	headline: '<span class="highlight-text">Easy</span> to Learn. <br /><span class="highlight-text">Hard</span> to Master. <br /><span class="highlight-text">Impossible</span> to Stop.',
	subheadline: 'A card game so simple, yet so satisfying.'
}
```

### 5. Party Focus

```typescript
{
	id: 'party',
	headline: '<span class="highlight-text">Perfect</span> for Parties. <br /><span class="highlight-text">Great</span> with Friends. <br /><span class="highlight-text">Terrible</span> for Alliances.',
	subheadline: 'The only game night essential you need this year.'
}
```

### 6. Emotional Hook

```typescript
{
	id: 'emotional',
	headline: '<span class="highlight-text">Your Friends</span> Will Hate You. <br /><span class="highlight-text">Your Game Nights</span> Will Love You. <br /><span class="highlight-text">Everyone</span> Wins.',
	subheadline: 'Create memories worth remembering (and friendships worth betraying).'
}
```

### 7. Action-Oriented

```typescript
{
	id: 'action',
	headline: '<span class="highlight-text">Steal.</span> <br /><span class="highlight-text">Block.</span> <br /><span class="highlight-text">Win.</span>',
	subheadline: 'Every card is a decision. Every decision matters.'
}
```

### 8. Benefit Stack

```typescript
{
	id: 'benefits',
	headline: '<span class="highlight-text">Quick</span> Setup. <br /><span class="highlight-text">Fast</span> Rounds. <br /><span class="highlight-text">Infinite</span> Replay.',
	subheadline: 'Everything you want in a party game, nothing you don\'t.'
}
```

## Testing Strategy

### Start with 2-3 Variants

Don't test too many at once. Start with:

1. **Control** (your current headline)
2. **Short & punchy** variant
3. **Benefit-focused** variant

### UTM Targeting Examples

```typescript
campaignMapping: {
	// Facebook/Instagram - emotion & social proof
	facebook: 'emotional',
	instagram: 'social',

	// Google Ads - value proposition
	google: 'value',

	// Reddit - competitive/strategic angle
	reddit: 'competitive',

	// Twitter - short & punchy
	twitter: 'action',

	// Email campaigns
	email_newsletter: 'benefits',
	email_cart_abandonment: 'value'
}
```

## Tips for Writing Good Variants

1. **Use the rule of 3** - Three lines, three beats
2. **Mix emotion with logic** - Appeal to both heart and mind
3. **Include power words** - Steal, Win, Master, Perfect, Instant
4. **Use contrast** - "Easy to learn, hard to master"
5. **Create curiosity** - Make them want to know more
6. **Match your audience** - Competitive players vs casual partiers
7. **Keep it scannable** - Use line breaks strategically

## A/B Testing Best Practices

- Run each test for **at least 1,000 visitors** per variant
- Wait **1-2 weeks** minimum for statistical significance
- Track **conversion rates** (email signups, purchases)
- Don't change variants **mid-campaign**
- Document **which variants won** and why
