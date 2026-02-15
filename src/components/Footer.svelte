<script>
	import MailerForm from '$lib/MailerForm/page.svelte';
</script>

<footer
	id="signup-form"
	class="fixed bottom-0 left-0 right-0 z-50 flex w-full items-cente justify-center bg-black p-2 sm:p-4 text-center sm:mx-auto sm:text-start"
>
	<div
		class="flex flex-col items-center w-full justify-between gap-6 text-center md:w-full md:flex-row md:items-start md:text-start lg:w-[90%] xl:w-[72%]"
	>
		<!-- Left column: headline + description -->
		<div class="flex flex-col gap-1 md:flex-1 items-center md:items-start">
			<h1 class="footer-headline inline-flex relative items-center gap-2" id="footer-headline">
				<!-- <enhanced:img src="$lib/assets/arrow-down.png" class="absolute z-10 top-11 -left-6 w-[40px] md:hidden animate-arrow-bounce-rotated" alt="arrow down"/>  -->
				<span>
					Get a Free Taster: <br/>
					<span class="whitespace-nowrap sm:whitespace-normal">Print, Cut, <span class="text-red-500">Play Tonight</span></span>
				</span>
				
				<enhanced:img src="$lib/assets/arrow-right.png" class="hidden md:inline-block w-[100px] min-w-[80px] animate-arrow-bounce-right" alt="arrow right"/>
			</h1>
			
			<!-- Mobile only: form between headline and description -->
			<div class="w-full md:hidden">
				<MailerForm />
			</div>

			<p class="w-full py-0 px-4 pb-1 md:px-2 text-white text-xs leading-none" id="footer-description">
				Free PDF delivered instantly. No credit card. No spam.
			</p>
		</div>

		<!-- Right column: signup form (desktop only) -->
		<div class="hidden md:block md:flex-1">
			<MailerForm />
		</div>
	</div>
</footer>
