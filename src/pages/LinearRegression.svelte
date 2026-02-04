<script lang="ts">
  import { navigateTo } from '../stores/routerStore'
  import Header from '../components/Header.svelte'
  import DataTable from '../components/DataTable.svelte'
  import ScatterPlot from '../components/ScatterPlot.svelte'
  import FormulaExplainer from '../components/FormulaExplainer.svelte'
  import PredictionCalculator from '../components/PredictionCalculator.svelte'
  import LineAdjuster from '../components/LineAdjuster.svelte'
  import TreasureList from '../components/TreasureList.svelte'
  import ConceptExplainer from '../components/ConceptExplainer.svelte'
  import { dataPoints, userTemperature } from '../stores/dataStore'
  import { onMount, onDestroy } from 'svelte'

  // Ice cream sales data
  const initialData = [
    { day: 1, temperature: 10, sales: 45 },
    { day: 2, temperature: 12, sales: 50 },
    { day: 3, temperature: 15, sales: 65 },
    { day: 4, temperature: 18, sales: 80 },
    { day: 5, temperature: 20, sales: 90 },
  ]

  dataPoints.set(initialData)
  userTemperature.set(16)

  // Progressive discovery steps
  let currentStep = 0
  const totalSteps = 6
  let showCelebration = false
  
  // Quiz answers
  let relationshipGuess: 'increase' | 'decrease' | null = null
  let userPrediction: number | null = null
  let hasSubmittedPrediction = false
  
  const stepInfo = [
    {
      title: "Step 1: Explore the Data",
      description: "Click on any temperature or sales value in the table to edit it. Notice how sales increase with temperature.",
      component: "data"
    },
    {
      title: "Step 2: Plot the Pattern",
      description: "Watch the data appear on the graph. Each dot represents one day. What pattern do you see?",
      component: "scatter"
    },
    {
      title: "Step 3: Draw Your Line",
      description: "Drag the sliders to adjust your line. Try to get it as close to all the points as possible.",
      component: "line"
    },
    {
      title: "Step 4: Measure Your Error",
      description: "See how far your line is from the optimal solution. Can you beat the machine's prediction?",
      component: "error"
    },
    {
      title: "Step 5: Decode the Formula",
      description: "Click on the gradient and intercept to see what they mean. Watch how changing them affects your line.",
      component: "formula"
    },
    {
      title: "Step 6: Make Predictions",
      description: "Drag the temperature slider to predict sales for any day. Your model is ready!",
      component: "prediction"
    }
  ]
  
  function nextStep() {
    if (currentStep < totalSteps - 1) {
      currentStep++
    }
  }
  
  function prevStep() {
    if (currentStep > 0) {
      currentStep--
      showCelebration = false
    }
  }
  
  function resetTutorial() {
    currentStep = 0
    showCelebration = false
  }
  
  function handleKeyboard(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      nextStep()
    } else if (event.key === 'ArrowLeft') {
      prevStep()
    } else if (event.key === 'r' || event.key === 'R') {
      resetTutorial()
    }
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeyboard)
  })
  
  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyboard)
  })
  
  // Control which components are visible (all shown for stable layout)
  $: showDataTable = currentStep >= 0
  $: showScatterPlot = currentStep >= 1
  $: showLineAdjuster = currentStep >= 2
  $: showErrorMetrics = currentStep >= 3
  $: showFormulaExplainer = currentStep >= 4
  $: showPredictionCalculator = currentStep >= 5
  
  // Highlight currently active component
  $: highlightDataTable = currentStep === 0
  $: highlightScatterPlot = currentStep === 1
  $: highlightLineAdjuster = currentStep === 2
  $: highlightErrorMetrics = currentStep === 3
  $: highlightFormulaExplainer = currentStep === 4
  $: highlightPredictionCalculator = currentStep === 5
  
  // Show celebration on completion
  $: if (currentStep === totalSteps - 1) {
    setTimeout(() => { showCelebration = true }, 500)
  }
  
  // Track treasure unlocks
  $: unlockedTreasures = Math.min(currentStep + 1, 8)
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
  <Header />
  
  <!-- Navigation -->
  <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 py-3 flex items-center gap-3 text-sm">
      <button 
        on:click={() => navigateTo('home')}
        class="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
      >
        ← Home
      </button>
      <span class="text-gray-400">|</span>
      <span class="text-gray-700 dark:text-gray-300 font-medium">Chapter 2: Linear Regression</span>
    </div>
  </nav>

  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Guess the Number!
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Can we predict ice cream sales from temperature? Let's find the pattern.
      </p>
    </div>

    <!-- Step Progress Indicator -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div class="mb-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{stepInfo[currentStep].title}</h2>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep + 1} of {totalSteps}
          </div>
        </div>
        <p class="text-gray-600 dark:text-gray-300">{stepInfo[currentStep].description}</p>
      </div>
      
      <!-- Progress Bar -->
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
        <div 
          class="bg-indigo-600 h-2 rounded-full transition-all duration-500"
          style="width: {((currentStep + 1) / totalSteps) * 100}%"
        ></div>
      </div>
      
      <!-- Navigation Buttons - Compact on scroll -->
      <div class="flex items-center justify-between gap-3">
        <div class="flex gap-2 flex-1">
          <button
            on:click={prevStep}
            disabled={currentStep === 0}
            class="px-4 py-2 text-sm rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Previous step"
          >
            ← Prev
          </button>
          <button
            on:click={nextStep}
            disabled={currentStep === totalSteps - 1}
            class="px-4 py-2 text-sm rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 text-white hover:bg-indigo-700"
            aria-label="Next step"
          >
            {currentStep === totalSteps - 1 ? '✓ Done' : 'Next →'}
          </button>
        </div>
        <button
          on:click={resetTutorial}
          class="px-3 py-2 text-sm rounded-lg font-medium transition-colors bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800"
          aria-label="Reset tutorial"
          title="Reset to beginning (R)"
        >
          ↺
        </button>
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
        💡 Arrow keys ← → to navigate • R to reset
      </div>
    </div>

    <!-- Completion Celebration -->
    {#if showCelebration}
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl shadow-xl p-8 mb-8 border-4 border-green-400 dark:border-green-600 animate-fadeIn">
        <div class="text-center">
          <div class="text-6xl mb-4">🎉</div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Congratulations! You've Built Your First ML Model!
          </h2>
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
            You can now predict ice cream sales for ANY temperature using linear regression.
          </p>
          
          <!-- Quiz Results -->\n          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 max-w-2xl mx-auto">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Your Answers:</h3>
            <div class="space-y-4 text-left">
              {#if relationshipGuess}
                <div class="flex items-start gap-3 p-4 rounded-lg {relationshipGuess === 'increase' ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-400' : 'bg-red-50 dark:bg-red-900/30 border-2 border-red-400'}">
                  <span class="text-2xl">{relationshipGuess === 'increase' ? '✅' : '❌'}</span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">Question: As temperature increases, ice cream sales...?</p>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">Your answer: <strong>{relationshipGuess}</strong></p>
                    {#if relationshipGuess === 'increase'}
                      <p class="text-sm text-green-700 dark:text-green-300 mt-1">Correct! The data shows a positive correlation.</p>
                    {:else}
                      <p class="text-sm text-red-700 dark:text-red-300 mt-1">Not quite. The data shows sales increase with temperature (positive correlation).</p>
                    {/if}
                  </div>
                </div>
              {/if}
              
              {#if userPrediction !== null && hasSubmittedPrediction}
                {@const actualPrediction = $predictedSales}
                {@const difference = Math.abs(userPrediction - actualPrediction)}
                {@const percentError = ((difference / actualPrediction) * 100).toFixed(1)}
                <div class="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-400">
                  <span class="text-2xl">🎯</span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">Prediction Challenge: Sales at {$userTemperature}°C</p>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">Your guess: <strong>{userPrediction}</strong> ice creams</p>
                    <p class="text-sm text-gray-700 dark:text-gray-300">Actual prediction: <strong>{actualPrediction.toFixed(1)}</strong> ice creams</p>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      {#if difference < 5}
                        <span class="text-green-600 dark:text-green-400 font-bold">🌟 Amazing! You were only {difference.toFixed(1)} off!</span>
                      {:else if difference < 10}
                        <span class="text-blue-600 dark:text-blue-400 font-bold">👍 Good guess! You were {difference.toFixed(1)} off ({percentError}% error)</span>
                      {:else}
                        <span class="text-orange-600 dark:text-orange-400 font-bold">📊 You were {difference.toFixed(1)} off ({percentError}% error). The model is more accurate!</span>
                      {/if}
                    </p>
                  </div>
                </div>
              {/if}
            </div>
          </div>
          
          <div class="flex items-center justify-center gap-4 mt-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <div class="text-sm text-gray-600 dark:text-gray-400">Your Formula</div>
              <div class="text-xl font-bold text-indigo-600 dark:text-indigo-400">y = mx + c</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <div class="text-sm text-gray-600 dark:text-gray-400">Treasures Unlocked</div>
              <div class="text-xl font-bold text-amber-600 dark:text-amber-400">{unlockedTreasures}/8</div>
            </div>
          </div>
          <div class="mt-6">
            <button
              on:click={() => navigateTo('knn')}
              class="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition transform hover:scale-105"
            >
              What's Next? Learn K-Nearest Neighbours →
            </button>
          </div>
        </div>
      </div>
    {/if}

    <!-- Main Simulator Content - Stable 2-Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Left Column -->
      <div class="space-y-6">
        <!-- Data Table -->
        <div 
          class="transition-all duration-500 {highlightDataTable ? 'ring-4 ring-indigo-500 ring-opacity-50 animate-pulse-slow' : ''} {!showDataTable ? 'opacity-40 pointer-events-none' : ''}"
          role="region"
          aria-label="Data table"
        >
          <DataTable />
        </div>
        
        <!-- Scatter Plot -->
        <div 
          class="transition-all duration-500 {highlightScatterPlot ? 'ring-4 ring-indigo-500 ring-opacity-50 animate-pulse-slow' : ''} {!showScatterPlot ? 'opacity-40 pointer-events-none' : ''}"
          role="region"
          aria-label="Scatter plot"
        >
          <ScatterPlot />
        </div>
        
        <!-- Line Adjuster -->
        <div 
          class="transition-all duration-500 {highlightLineAdjuster ? 'ring-4 ring-indigo-500 ring-opacity-50 animate-pulse-slow' : ''} {!showLineAdjuster ? 'opacity-40 pointer-events-none' : ''}"
          role="region"
          aria-label="Line adjuster"
        >
          <LineAdjuster showErrorMetrics={showErrorMetrics} highlightError={highlightErrorMetrics} />
        </div>
      </div>
      
      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Quiz Question: Relationship -->
        {#if currentStep === 1 && !relationshipGuess}
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl shadow-xl p-6 border-2 border-purple-300 dark:border-purple-600">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🤔 Quick Question!</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Based on the data you see, as temperature increases, ice cream sales will:
            </p>
            <div class="flex gap-3">
              <button
                on:click={() => relationshipGuess = 'increase'}
                class="flex-1 px-6 py-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 border-2 border-gray-300 dark:border-gray-600 hover:border-green-500 transition font-semibold"
              >
                📈 Increase
              </button>
              <button
                on:click={() => relationshipGuess = 'decrease'}
                class="flex-1 px-6 py-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 border-2 border-gray-300 dark:border-gray-600 hover:border-red-500 transition font-semibold"
              >
                📉 Decrease
              </button>
            </div>
          </div>
        {/if}
        
        <!-- Formula Explainer -->
        <div 
          class="transition-all duration-500 {highlightFormulaExplainer ? 'ring-4 ring-indigo-500 ring-opacity-50 animate-pulse-slow' : ''} {!showFormulaExplainer ? 'opacity-40 pointer-events-none' : ''}"
          role="region"
          aria-label="Formula explainer"
        >
          <FormulaExplainer />
        </div>
        
        <!-- Prediction Calculator -->
        <div 
          class="transition-all duration-500 {highlightPredictionCalculator ? 'ring-4 ring-indigo-500 ring-opacity-50 animate-pulse-slow' : ''} {!showPredictionCalculator ? 'opacity-40 pointer-events-none' : ''}"
          role="region"
          aria-label="Prediction calculator"
        >
          <PredictionCalculator 
            bind:userGuess={userPrediction}
            bind:hasSubmitted={hasSubmittedPrediction}
            showGuessFirst={currentStep === 5}
          />
        </div>
      </div>
    </div>

    <!-- Maths Treasures - Moved to bottom with collapsible sections -->
    <div class="mt-12 mb-24">
      <TreasureList unlockedCount={unlockedTreasures} />
    </div>

    <!-- Concept Explainer -->
    <div class="mb-24">
      <ConceptExplainer />
    </div>
  </div>

  <!-- Sticky Bottom Navigation -->
  <div class="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t-2 border-indigo-500 dark:border-indigo-600 shadow-2xl z-50">
    <div class="container mx-auto px-4 py-4 max-w-7xl">
      <div class="flex items-center justify-between gap-4">
        <!-- Step Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3">
            <div class="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
              {currentStep + 1}
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white truncate">{stepInfo[currentStep].title}</h3>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                <div 
                  class="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                  style="width: {((currentStep + 1) / totalSteps) * 100}%"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <button
            on:click={prevStep}
            disabled={currentStep === 0}
            class="px-4 py-2 text-sm rounded-lg font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Previous step"
          >
            ← Prev
          </button>
          <button
            on:click={nextStep}
            disabled={currentStep === totalSteps - 1}
            class="px-6 py-2 text-sm rounded-lg font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
            aria-label="Next step"
          >
            {currentStep === totalSteps - 1 ? '✓ Done' : 'Next →'}
          </button>
          <button
            on:click={resetTutorial}
            class="px-3 py-2 text-sm rounded-lg font-medium transition-colors bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800"
            aria-label="Reset tutorial"
            title="Reset (R)"
          >
            ↺
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes pulse-slow {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.95;
      transform: scale(1.005);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .animate-pulse-slow,
    .animate-fadeIn {
      animation: none;
    }
  }
</style>
