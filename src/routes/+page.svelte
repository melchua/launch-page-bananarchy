<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '../components/Footer.svelte';
	import ThinSocialProofBar from '../components/ThinSocialProofBar.svelte';
	import MailerForm from '$lib/MailerForm/page.svelte';
	import { subscriberCount, fetchSubscriberCount } from '$lib/stores/subscriberCount';
	import LifestyleBar from '../components/LifestyleBar.svelte';
	import deluxeBox from '$lib/assets/deluxe-box-render-kick.png?enhanced';
	import { useVariant } from '$lib/useVariant.svelte';
	import StorySection from '../components/StorySection.svelte';
	import GameSummarySection from '../components/GameSummarySection.svelte';
	import SocialProofBar from '../components/SocialProofBar.svelte';
	import CopyrightFooter from '../components/CopyrightFooter.svelte';

	// Initialize variant for A/B testing
	const { variant, isReady } = useVariant();

	let boxClass = $state('');

	// Count-up animation state
	let displayCount = $state(0);

	// Easing function for smooth animation (ease-out cubic)
	function easeOutCubic(t: number): number {
		return 1 - Math.pow(1 - t, 3);
	}

	// Count-up animation function
	function animateCount(target: number, duration: number = 1500) {
		const startTime = performance.now();
		const startValue = 0;

		function updateCount(currentTime: number) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const easedProgress = easeOutCubic(progress);

			displayCount = Math.floor(startValue + (target - startValue) * easedProgress);

			if (progress < 1) {
				requestAnimationFrame(updateCount);
			} else {
				displayCount = target;
			}
		}

		requestAnimationFrame(updateCount);
	}

	onMount(() => {
		void fetchSubscriberCount().then(() => {
			const unsubscribe = subscriberCount.subscribe((count) => {
				animateCount(count);
			});
			unsubscribe();
		});
	});
</script>

<div class="oback flex flex-grow flex-col">
	<div class="relative pb-12">
		<div
			class="mx-auto flex max-w-screen-xl flex-col items-center gap-4 px-8 pb-0 pt-0 lg:flex-row lg:justify-between lg:pt-8"
		>
			<!-- Left Column: All text content (desktop) -->
			<div class="flex flex-col gap-2 md:px-24 lg:w-[75%]">
				<!-- Hero Text - order-1 on mobile -->
				<div class="order-1">
					<h2
						class="pb-1 pt-0 text-center text-2xl font-bold uppercase tracking-widest lg:text-left"
					>
						Bananarchy
					</h2>

					<h1 class="hero-headline mb-3 text-center lg:text-left">
						{#if isReady}
							<span>{@html variant.headline}</span>
						{:else}
							<!-- Fallback while loading -->
							<span
								><span class="highlight-text">Cute</span> Monkeys. <br /><span
									class="highlight-text">Clever</span
								>
								Tricks. <br /><span class="highlight-text">Wild</span> Plays.</span
							>
						{/if}
					</h1>
					<h4 class="text-center lg:text-left">
						{#if isReady}
							{@html variant.subheadline}
						{:else}
							A fast, strategic party game where every move matters.
						{/if}
					</h4>
				</div>

				<!-- Deluxe Box Images - order-2 on mobile, hidden on desktop (shown in right column) -->
				<div class="relative order-2 overflow-hidden lg:hidden">
					<enhanced:img
						src={deluxeBox}
						alt="box"
						class={`m-2 w-fit sm:w-[500px] md:w-[600px]`}
						sizes="(max-width: 430px) 320px, (max-width: 586px) 400px, (min-width: 640px) 640px, 80vw"
						fetchpriority="high"
					/>
					<enhanced:img
						src="$lib/assets/peel_1.png"
						alt="box"
						class={`-ml-[60px] -mt-[75px] w-[45%] sm:m-2 sm:-mt-[80px] sm:w-[50vw]`}
						sizes="(max-width: 430px) 180px, (max-width: 586px) 240px, 50vw"
						fetchpriority="high"
					/>
				</div>

				<!-- Hero subhead - order-3 on mobile (below image), visible inline on desktop -->
				<div
					class="order-3 flex flex-col items-center rounded-xl bg-transparent pt-2 text-center lg:order-2 lg:items-start lg:text-left"
				>
					<div class="hero-subhead py-4">
						<div class="text-md pb-1 font-semibold">
							Join {displayCount}+ monkeys already playing
						</div>
						<div class="text-xs text-gray-900">
							🎁 Get the Free Print & Play Mini-Game<br /> 🔓 Early access + exclusive launch
							rewards
							<!-- <br /> ⏳ Only {900 - displayCount} spots left. -->
						</div>
					</div>

					<MailerForm />
				</div>
			</div>

			<!-- Right Column: Deluxe Box Images (desktop only) -->
			<div class="relative hidden lg:block">
				<enhanced:img
					src={deluxeBox}
					alt="box"
					class={`${boxClass} m-2 w-fit lg:w-[675px]`}
					sizes="675px"
					loading="lazy"
				/>
				<enhanced:img
					src="$lib/assets/banana-peels.png"
					alt="box"
					class={`${boxClass} m-2 -mt-[80px] w-fit lg:w-[675px]`}
					sizes="675px"
					loading="lazy"
				/>
			</div>
		</div>
	</div>

	<LifestyleBar />

	<ThinSocialProofBar />

	<GameSummarySection />

	<StorySection />

	<Footer />

	<SocialProofBar />

	<div class="full z-10 bg-white/85">
		<!-- Try Before You Buy CTA Section -->
		<div class="flex justify-center px-4 pt-6">
			<div class="description-box max-w-3xl text-center">
				<h2 class="mb-4 text-center">
					Try It Free — <span class="highlight-text-light-mode">No Strings Attached</span>
				</h2>
				<p class="description-text mb-6">
					We believe in this game so much, we want you to <span class="description-text-bold"
						>try it for free first</span
					>. Sign up and get an instant print-at-home mini-game. No credit card, no strings
					attached, just pure <span class="description-text-bold">banana-stealing chaos</span>.
				</p>
			</div>
		</div>

		<Footer />
	</div>

	<CopyrightFooter />
</div>
