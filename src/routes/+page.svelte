<script lang="ts">
	import { flip } from '@floating-ui/dom';
	import { useFloating } from '$lib/useFloating.svelte';

	const context = useFloating({
		middleware: [flip()]
	});
</script>

<section class="container">
	<button use:context.reference={'hover'}>Reference</button>

	{#if context.show}
		<div class="floating" use:context.floating>
			<p>Tooltip!</p>
		</div>
	{/if}
</section>

<style>
	.container {
		height: 200vh;
	}
	.floating {
		/* Float on top of the UI */
		position: absolute;
		/* Avoid layout interference */
		width: max-content;
		top: 0;
		left: 0;
		height: 100px;
		background: red;
	}
</style>
