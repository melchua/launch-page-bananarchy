<script>
	import MailerForm from '$lib/MailerForm/page.svelte';
</script>

<footer
	id="signup-form"
	class="z-50 flex w-full items-center justify-center bg-black p-16 text-center sm:mx-auto sm:pb-20 sm:text-start"
>
	<div
		class="flex flex-col items-center justify-between gap-4 text-center md:w-full md:flex-row md:text-start lg:w-[90%] xl:w-[72%]"
	>
		<span>
			<h1 class="py-2 footer-headline"><span class="highlight-text">Get in</span> before <span class="highlight-text">the chaos</span> begins.</h1>
			<p class="w-full text-lg text-white">
				Join <span class="highlight-text font-bold">free</span> for early access, sneak peaks, and <span class="highlight-text font-bold">first dibs</span> on our <span class="highlight-text font-bold">$1 VIP Banana expansion</span>.
			</p>
		</span>
		<MailerForm />
	</div>
</footer>
