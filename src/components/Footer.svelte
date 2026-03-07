<script>
	import MailerForm from '$lib/MailerForm/page.svelte';
</script>

<footer
	id="signup-form"
	class="fixed bottom-0 left-0 right-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-90 p-2 text-center sm:mx-auto sm:p-4 sm:text-start"
>
	<div
		class="flex w-full flex-col items-center justify-between gap-6 text-center md:w-full md:flex-row md:items-start md:text-start lg:w-[90%] xl:w-[72%]"
	>
		<!-- Left column: headline + description -->
		<div class="flex flex-col items-center gap-1 md:flex-1 md:items-start">
			<h1 class="footer-headline relative inline-flex items-center gap-2" id="footer-headline">
				<!-- <enhanced:img src="$lib/assets/arrow-down.png" class="absolute z-10 top-11 -left-6 w-[40px] md:hidden animate-arrow-bounce-rotated" alt="arrow down"/>  -->
				<span>
					Get My Free Mini-Game: <br />
					<span class="whitespace-nowrap sm:whitespace-normal">
						<span class="text-red-500">Play Tonight</span></span
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
				<MailerForm />
			</div>

			<p
				class="w-full px-4 py-0 pb-1 text-xs leading-none text-white md:px-2"
				id="footer-description"
			>
				264 founding monkeys and counting. Instant download. Early access disappears once we launch.
			</p>
		</div>

		<!-- Right column: signup form (desktop only) -->
		<div class="hidden md:block md:flex-1">
			<MailerForm />
		</div>
	</div>
</footer>
