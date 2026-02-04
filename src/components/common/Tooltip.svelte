<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  
  export let text: string
  export let position: 'top' | 'bottom' | 'left' | 'right' = 'top'
  
  let showTooltip = false
  let timeout: ReturnType<typeof setTimeout>
  
  function show() {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      showTooltip = true
    }, 300) // Delay to avoid instant tooltips
  }
  
  function hide() {
    clearTimeout(timeout)
    showTooltip = false
  }

  $: positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }

  $: arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent'
  }
</script>

<div 
  class="relative inline-block"
  on:mouseenter={show}
  on:mouseleave={hide}
  on:focus={show}
  on:blur={hide}
  role="tooltip"
  tabindex="0"
>
  <!-- Trigger slot -->
  <slot />
  
  <!-- Tooltip -->
  {#if showTooltip}
    <div 
      class="absolute {positionClasses[position]} z-50 pointer-events-none"
      transition:fly={{ duration: 200, y: position === 'top' ? 5 : -5 }}
    >
      <div class="bg-gray-900 dark:bg-gray-700 text-white text-sm px-3 py-2 rounded-lg shadow-xl max-w-xs">
        {text}
        <!-- Arrow -->
        <div class="absolute {arrowClasses[position]} border-4 border-gray-900 dark:border-gray-700"></div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Ensure tooltips don't overflow */
  :global(body) {
    position: relative;
  }
</style>
