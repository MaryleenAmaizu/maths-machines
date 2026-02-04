<script lang="ts">
  import { tutorialActive, restartTutorial, showStepModal, currentStep, tutorialProgress, skipTutorial } from '../../stores/tutorialStore'
  import { fly, fade } from 'svelte/transition'

  let showMenu = false

  function toggleMenu() {
    showMenu = !showMenu
  }

  function handleRestartTutorial() {
    restartTutorial()
    showMenu = false
  }

  function handleShowCurrentStep() {
    showStepModal.set(true)
    showMenu = false
  }
</script>

<!-- Floating Help Button -->
<div class="fixed bottom-6 right-6 z-30">
  {#if showMenu}
    <!-- Menu -->
    <div 
      class="absolute bottom-20 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-2 w-64 border border-gray-200 dark:border-gray-700"
      transition:fly={{ y: 10, duration: 200 }}
    >
      <button
        on:click={handleShowCurrentStep}
        class="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition flex items-center gap-3"
      >
        <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <div class="font-medium text-gray-800 dark:text-white">Current Step</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">
            {$currentStep ? $currentStep.title : 'View tutorial'}
          </div>
        </div>
      </button>

      <button
        on:click={handleRestartTutorial}
        class="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition flex items-center gap-3"
      >
        <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <div>
          <div class="font-medium text-gray-800 dark:text-white">Restart Tutorial</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Start from the beginning</div>
        </div>
      </button>

      <button
        on:click={() => { skipTutorial(); showMenu = false; }}
        class="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition flex items-center gap-3"
      >
        <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <div>
          <div class="font-medium text-gray-800 dark:text-white">Hide Tutorial</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Explore on your own</div>
        </div>
      </button>

      <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 mt-2">
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Progress</div>
        <div class="flex items-center gap-2">
          <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div 
              class="bg-gradient-to-r from-indigo-500 to-purple-600 h-1.5 rounded-full transition-all"
              style="width: {$tutorialProgress.percentage}%"
            />
          </div>
          <span class="text-xs font-medium text-gray-700 dark:text-gray-300">
            {$tutorialProgress.percentage.toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  {/if}

  <!-- Help Button -->
  <button
    on:click={toggleMenu}
    class="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
    class:rotate-45={showMenu}
  >
    {#if showMenu}
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    {:else}
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    {/if}
  </button>

  <!-- Pulse ring for attention -->
  {#if $tutorialActive && !showMenu}
    <div class="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-20" />
  {/if}
</div>

{#if showMenu}
  <!-- Click outside to close -->
  <button
    on:click={toggleMenu}
    class="fixed inset-0 z-20"
    transition:fade={{ duration: 150 }}
  />
{/if}

<style>
  @keyframes ping {
    75%, 100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  .animate-ping {
    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
</style>
