<script>
	import MailerForm from '$lib/MailerForm/page.svelte';
</script>

<footer
	class="z-50 flex w-full items-center justify-center bg-black p-16 text-center sm:mx-auto sm:pb-20 sm:text-start"
>
	<div class="flex flex-col justify-between gap-4 sm:w-full sm:flex-row lg:w-[90%] xl:w-[72%]">
		<span>
			<h1 class="text-2xl text-white">We're launching soon!</h1>
			<p class="w-full text-sm text-white">
				Sign up now to be the first to know when the Kickstarter launches and unlock the extra cards
			</p>
		</span>
		<MailerForm />
	</div>
</footer>
