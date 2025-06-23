<script>
	import MailerForm from '$lib/MailerForm/page.svelte';
</script>

<footer
	class="z-50 flex w-full items-center justify-center bg-black p-16 text-center sm:mx-auto sm:pb-20 sm:text-start"
>
	<div
		class="flex flex-col items-center justify-between gap-4 text-center md:w-full md:flex-row md:text-start lg:w-[90%] xl:w-[72%]"
	>
		<span>
			<h1 class="py-2 text-2xl text-white">We're launching soon!</h1>
			<p class="w-full text-sm text-white">
				Sign up now to be the <span class="font-black text-bapurple">first to know</span> when we
				launch and
				<span class="font-black text-bapurple">receive a special offer</span> for our backers.
			</p>
		</span>
		<div class="w-full sm:w-[400px]">
			<MailerForm />
		</div>
	</div>
</footer>
