<script lang="ts">
    import { useFloating } from "$lib/useFloating.svelte";
    
    const context = useFloating();
</script>

<section class="container">
    <button use:context.reference={'hover'}>Reference</button>


    <div class="floating" use:context.floating>
    <p>Tooltip!</p>
    </div>
</section>

<style> 
    .floating {
        /* Float on top of the UI */
        position: absolute;
        /* Avoid layout interference */
        width: max-content;
        top: 0;
        left: 0;
    }
</style>