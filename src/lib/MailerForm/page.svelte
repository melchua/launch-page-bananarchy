<script>
	import { onMount } from 'svelte';

	let glowEffect = false;

	// Restart animation every 2 seconds
	onMount(() => {
		setInterval(() => {
			glowEffect = !glowEffect;
		}, 2000);
	});
</script>

<div id="mc_embed_shell">
	<div id="mc_embed_signup">
		<form
			action="https://gmail.us12.list-manage.com/subscribe/post?u=3b7a59a13fedb255fa561a532&amp;id=106c54f5fe&amp;f_id=005509e9f0"
			method="post"
			id="mc-embedded-subscribe-form"
			name="mc-embedded-subscribe-form"
			class="validate"
			target="_self"
		>
			<div id="mc_embed_signup_scroll">
				<div class="indicates-required gap-2 md:flex md:flex-row md:items-center">
					<div class="mc-field-group my-1">
						<label for="mce-EMAIL"></label>
						<input
							type="email"
							name="EMAIL"
							class="required email w-full rounded-lg sm:w-auto"
							id="mce-EMAIL"
							required
							value=""
							placeholder="Email address 🍌"
						/>
					</div>
					<div id="mce-responses" class="clear foot">
						<div class="response" id="mce-error-response" style="display: none;"></div>
						<div class="response" id="mce-success-response" style="display: none;"></div>
					</div>
					<div aria-hidden="true" style="position: absolute; left: -5000px;">
						/* real people should not fill this in and expect good things - do not remove this or
						risk form bot signups */
						<input
							type="text"
							name="b_3b7a59a13fedb255fa561a532_106c54f5fe"
							tabindex="-1"
							value=""
						/>
					</div>
					<div class="optionalParent">
						<div class="clear foot">
							<button
								type="submit"
								name="subscribe"
								class="button w-full whitespace-nowrap rounded-lg bg-secondary p-2 text-white hover:bg-secondary/80"
								class:glow={glowEffect}>Gimme early access!</button
							>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>

<style>
	.glow {
		transition: box-shadow 1s ease-in-out;
		box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
	}

	button {
		transition: box-shadow 1s ease-in-out;
		box-shadow: 0 0 0 rgba(255, 255, 255, 0);
	}
</style>
