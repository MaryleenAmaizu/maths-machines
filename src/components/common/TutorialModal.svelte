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
  } from '../../stores/tutorialStore'
  import { fade, fly, scale } from 'svelte/transition'

  let isDragging = false
  let dragOffset = { x: 0, y: 0 }
  let tooltipPosition = { x: 0, y: 0 }
  let initialPosition = { x: 0, y: 0 }
  let tooltipVisible = true

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
    tooltipVisible = false
  }

  function reopenTooltip() {
    tooltipVisible = true
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

  // Reset tooltip visibility when step changes
  $: if ($currentStepIndex !== undefined) {
    tooltipVisible = true
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

</script>

<svelte:window on:mousemove={drag} on:mouseup={stopDrag} />

{#if $tutorialActive && $currentStep && $currentStep.component !== 'general'}
  <!-- Reopen Button (shows when tooltip is hidden) -->
  {#if !tooltipVisible}
    <button
      on:click={reopenTooltip}
      class="fixed bottom-6 left-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
      transition:scale={{ duration: 200 }}
      aria-label="Show tutorial"
      title="Show tutorial step"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
  {/if}

  <!-- Draggable Contextual Tooltip -->
  {#if tooltipVisible}
    <div 
      class="fixed z-50 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl shadow-2xl max-w-xs"
      style="left: {finalPosition.x}px; top: {finalPosition.y}px;"
      transition:fly={{ duration: 300, y: -10 }}
    >
      <!-- Close Button -->
      <button
        on:click={close}
        class="absolute -top-1.5 -right-1.5 bg-white dark:bg-gray-700 rounded-full p-1 shadow-md hover:scale-110 transition z-10"
      >
        <svg class="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Draggable Header -->
      <div 
        class="p-3 pb-2 cursor-grab active:cursor-grabbing"
        on:mousedown={startDrag}
        role="button"
        tabindex="0"
        aria-label="Drag to reposition"
      >
        <!-- Step Badge -->
        <div class="inline-block bg-white/20 rounded-full px-2 py-0.5 text-xs font-bold mb-1.5">
          {$currentStepIndex + 1}/{$tutorialProgress.total}
        </div>

        <!-- Title -->
        <h3 id="tutorial-title" class="text-base font-bold">
          {$currentStep.title}
        </h3>
      </div>

      <!-- Content (not draggable) -->
      <div class="px-3 pb-3">
        <p class="text-xs opacity-90 mb-3 leading-relaxed">
          {$currentStep.description}
        </p>

        {#if $currentStep.action}
          <div class="bg-white/20 rounded-lg p-2 mb-3">
            <p class="text-xs font-semibold flex items-center gap-1.5">
              <span class="text-sm">👉</span>
              {$currentStep.action}
            </p>
          </div>
        {/if}

        <!-- Navigation -->
        <div class="flex items-center gap-2">
          <button
            on:click={handlePrevious}
            disabled={$currentStepIndex === 0}
            class="px-3 py-1.5 bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-xs font-medium transition"
          >
            ← Back
          </button>
          
          <div class="flex gap-1">
            {#each $tutorialSteps as step, i}
              {#if step.component !== 'general'}
                <div 
                  class="w-1 h-1 rounded-full transition-all {i === $currentStepIndex ? 'bg-white' : 'bg-white/30'}"
                />
              {/if}
            {/each}
          </div>
          
          <button
            on:click={handleNext}
            class="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition"
          >
            {$currentStepIndex === 5 ? 'Done ✓' : 'Next →'}
          </button>
        </div>
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
