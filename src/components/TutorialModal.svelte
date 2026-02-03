<script lang="ts">
  import { 
    currentStep, 
    tutorialProgress, 
    showStepModal, 
    nextStep, 
    previousStep, 
    skipTutorial,
    currentStepIndex,
    tutorialSteps,
    tutorialActive
  } from '../stores/tutorialStore'
  import { fade, fly, scale } from 'svelte/transition'

  let isDragging = false
  let dragOffset = { x: 0, y: 0 }
  let tooltipPosition = { x: 0, y: 0 }
  let initialPosition = { x: 0, y: 0 }

  function startDrag(e: MouseEvent) {
    isDragging = true
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    dragOffset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  function drag(e: MouseEvent) {
    if (!isDragging) return
    tooltipPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    }
  }

  function stopDrag() {
    isDragging = false
  }

  function close() {
    showStepModal.set(false)
  }

  function handleNext() {
    if ($currentStepIndex < 5) {
      nextStep()
      resetPosition()
    }
  }

  function handlePrevious() {
    if ($currentStepIndex > 0) {
      previousStep()
      resetPosition()
    }
  }

  function resetPosition() {
    tooltipPosition = { x: 0, y: 0 }
  }

  // Default positions for tooltips based on component
  $: defaultPosition = ($currentStep?.component ? {
    'DataTable': { x: 50, y: 50 },
    'ScatterPlot': { x: 50, y: 300 },
    'LineAdjuster': { x: window.innerWidth - 400, y: 50 },
    'FormulaExplainer': { x: window.innerWidth - 400, y: 250 },
    'PredictionCalculator': { x: window.innerWidth - 400, y: 450 },
  }[$currentStep.component] : null) || { x: window.innerWidth / 2 - 175, y: 100 }

  // Use custom position if dragged, otherwise use default
  $: finalPosition = tooltipPosition.x !== 0 ? tooltipPosition : defaultPosition

  // Hand pointer position (points to the actual component)
  $: handPosition = $currentStep?.component && $currentStep.component !== 'general' ? {
    'DataTable': { top: '15%', left: '45%', rotate: '-45deg' },
    'ScatterPlot': { top: '50%', left: '45%', rotate: '-30deg' },
    'LineAdjuster': { top: '15%', right: '45%', rotate: '45deg' },
    'FormulaExplainer': { top: '40%', right: '45%', rotate: '45deg' },
    'PredictionCalculator': { top: '60%', right: '45%', rotate: '30deg' },
  }[$currentStep.component] : null
</script>

<svelte:window on:mousemove={drag} on:mouseup={stopDrag} />

{#if $tutorialActive && $currentStep && $currentStep.component !== 'general'}
  <!-- Draggable Contextual Tooltip -->
  <div 
    class="fixed z-50 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl max-w-sm"
    style="left: {finalPosition.x}px; top: {finalPosition.y}px;"
    transition:fly={{ duration: 300, y: -10 }}
  >
    <!-- Close Button -->
    <button
      on:click={close}
      class="absolute -top-2 -right-2 bg-white dark:bg-gray-700 rounded-full p-1 shadow-lg hover:scale-110 transition z-10"
    >
      <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Draggable Header -->
    <div 
      class="p-4 pb-2 cursor-grab active:cursor-grabbing"
      on:mousedown={startDrag}
      role="button"
      tabindex="0"
      aria-label="Drag to reposition"
    >
      <!-- Step Badge -->
      <div class="inline-block bg-white/20 rounded-full px-3 py-1 text-xs font-bold mb-2">
        Step {$currentStepIndex + 1}/{$tutorialProgress.total}
      </div>

      <!-- Title -->
      <h3 id="tutorial-title" class="text-lg font-bold">
        {$currentStep.title}
      </h3>
    </div>

    <!-- Content (not draggable) -->
    <div class="px-4 pb-4">
      <p class="text-sm opacity-90 mb-4 leading-relaxed">
        {$currentStep.description}
      </p>

      {#if $currentStep.action}
        <div class="bg-white/20 rounded-lg p-3 mb-4">
          <p class="text-xs font-semibold flex items-center gap-2">
            <span class="text-lg">👉</span>
            {$currentStep.action}
          </p>
        </div>
      {/if}

      <!-- Navigation -->
      <div class="flex items-center justify-between gap-3">
        <div class="flex gap-1">
          {#each $tutorialSteps as step, i}
            {#if step.component !== 'general'}
              <div 
                class="w-1.5 h-1.5 rounded-full transition-all {i === $currentStepIndex ? 'bg-white' : 'bg-white/30'}"
              />
            {/if}
          {/each}
        </div>
        
        <button
          on:click={handleNext}
          class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition"
        >
          {$currentStepIndex === 5 ? 'Done ✓' : 'Next →'}
        </button>
      </div>
    </div>
  </div>

  <!-- Pointing Hand -->
  {#if handPosition}
    <div 
      class="fixed z-50 pointer-events-none text-6xl"
      style="
        {'top' in handPosition ? `top: ${handPosition.top};` : ''}
        {'left' in handPosition && handPosition.left ? `left: ${handPosition.left};` : ''}
        {'right' in handPosition && handPosition.right ? `right: ${handPosition.right};` : ''}
        transform: translate(-50%, -50%) rotate({handPosition.rotate});
      "
      transition:scale={{ duration: 300, start: 0.5 }}
    >
      <div class="animate-bounce-subtle">
        👉
      </div>
    </div>
  {/if}
{/if}

<!-- Welcome Modal (only on first load) -->
{#if $showStepModal && $currentStep?.component === 'general'}
  <div 
    class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    transition:fade={{ duration: 200 }}
  >
    <button
      class="absolute inset-0"
      on:click={close}
      on:keydown={(e) => e.key === 'Escape' && close()}
      aria-label="Close welcome"
    />
    <div 
      class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative z-10"
      transition:scale={{ duration: 300, start: 0.9 }}
    >
      <div class="text-center">
        <div class="text-6xl mb-4">🎓</div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {$currentStep.title}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          {$currentStep.description}
        </p>
        <div class="flex gap-3">
          <button
            on:click={skipTutorial}
            class="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Skip
          </button>
          <button
            on:click={handleNext}
            class="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Let's Go! 🚀
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes bounce-subtle {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-bounce-subtle {
    animation: bounce-subtle 1.5s ease-in-out infinite;
  }
</style>
