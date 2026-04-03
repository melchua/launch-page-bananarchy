<script>
	import MailerForm from '$lib/MailerForm/page.svelte';
</script>

<footer
	id="signup-form"
	class="py-15 z-10 flex w-full items-center justify-center bg-black p-4 py-8 text-center sm:mx-auto sm:text-start"
>
	<div
		class="flex w-full flex-col items-center justify-between gap-6 text-center md:w-full md:flex-row lg:w-[90%] xl:w-[72%]"
	>
		<!-- Left column: headline + description -->
		<div class="flex flex-col items-center gap-1 py-4 md:flex-1 md:items-start">
			<h1 class="footer-headline relative inline-flex items-center gap-2" id="footer-headline">
				<!-- <enhanced:img src="$lib/assets/arrow-down.png" class="absolute z-10 top-11 -left-6 w-[40px] md:hidden animate-arrow-bounce-rotated" alt="arrow down"/>  -->
				<span class="text-center text-white">
					Get My Free Mini-Game:
					<span class="whitespace-nowrap sm:whitespace-normal">
						<span class="text-red-500">Play Now</span></span
					>
				</span>

				<enhanced:img
					src="$lib/assets/arrow-right.png"
					class="animate-arrow-bounce-right hidden w-[100px] min-w-[80px] md:inline-block"
					alt="arrow right"
				/>
			</h1>

			<!-- Mobile only: form between headline and description -->
			<div class="w-full md:hidden">
				<MailerForm disablePulse darkMode />
			</div>
		</div>

		<!-- Right column: signup form (desktop only) -->
		<div class="hidden md:block md:flex-1">
			<MailerForm disablePulse darkMode />
		</div>
	</div>
</footer>
