<script>
	import MailerForm from '$lib/MailerForm/page.svelte';
</script>

<footer
	id="signup-form"
	class="z-50 flex w-full items-center justify-center bg-black p-4 text-center sm:mx-auto sm:pb-20 sm:text-start"
>
	<div
		class="flex flex-col items-center justify-between gap-6 text-center md:w-full md:flex-row md:items-start md:text-start lg:w-[90%] xl:w-[72%]"
	>
		<!-- Left column: headline + description -->
		<div class="flex flex-col gap-2 md:flex-1">
			<h1 class="py-2 footer-headline whitespace-nowrap" id="footer-headline">Play <span class="highlight-text">today</span> for <span class="highlight-text">free</span>.</h1>
			<p class="w-full text-lg text-white" id="footer-description">
				<span class="highlight-text font-bold">Instant</span> Print & Play PDF with all <span class="highlight-text font-bold">108 cards</span>, rules, and art.
				Plus <span class="highlight-text font-bold">early access</span> & <span class="highlight-text font-bold">first dibs</span> on our <span class="highlight-text font-bold">$1 VIP Banana Expansion</span>.
			</p>
		</div>

		<!-- Right column: signup form -->
		<div class="w-full md:flex-1">
			<MailerForm />
		</div>
	</div>
</footer>
