<script lang="ts">
  import { 
    manualMode, 
    manualGradient, 
    manualYIntercept, 
    gradient, 
    yIntercept, 
    sumOfSquaredErrors,
    optimalSSE,
    meanSquaredError,
    activeGradient,
    activeYIntercept,
    dataPoints
  } from '../../stores/dataStore'
  import { trackInteraction } from '../../stores/tutorialStore'

  function enableManualMode() {
    // Start with the calculated values
    manualGradient.set($gradient)
    manualYIntercept.set($yIntercept)
    manualMode.set(true)
    trackInteraction('LineAdjuster', 'adjust')
  }

  function useOptimalLine() {
    manualGradient.set($gradient)
    manualYIntercept.set($yIntercept)
  }

  function resetToCalculated() {
    manualMode.set(false)
  }

  $: errorDifference = $sumOfSquaredErrors - $optimalSSE
  $: errorPercentage = $optimalSSE > 0 ? ((errorDifference / $optimalSSE) * 100) : 0
  $: isOptimal = Math.abs(errorDifference) < 0.1
</script>

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    � Model Training
  </h2>

  {#if !$manualMode}
    <div class="space-y-4">
      <p class="text-sm text-gray-700 dark:text-gray-300">
        Try training the model manually! Adjust parameters to minimize the loss function and see how gradient descent works.
      </p>
      
      <!-- Training Metrics -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-700">
        <div class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Optimal Model:</div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Gradient (m)</div>
            <div class="text-lg font-bold text-indigo-600 dark:text-indigo-400">{$gradient.toFixed(2)}</div>
          </div>
          <div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Intercept (c)</div>
            <div class="text-lg font-bold text-indigo-600 dark:text-indigo-400">{$yIntercept.toFixed(2)}</div>
          </div>
          <div class="col-span-2">
            <div class="text-xs text-gray-600 dark:text-gray-400">Loss (MSE)</div>
            <div class="text-lg font-bold text-green-600 dark:text-green-400">{$meanSquaredError.toFixed(2)}</div>
          </div>
        </div>
      </div>
      
      <button
        on:click={enableManualMode}
        class="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-xl transition transform hover:scale-105"
      >
        Try Manual Training
      </button>
    </div>
  {:else}
    <div class="space-y-4">
      <div class="flex items-center justify-between mb-4">
        <div class="text-sm text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-2">
          <div class="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
          Manual Training Mode
        </div>
        <button
          on:click={resetToCalculated}
          class="text-xs px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition"
        >
          Auto-optimize
        </button>
      </div>

      <!-- Training Loss Comparison -->
      <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border-2 border-amber-200 dark:border-amber-700">
        <div class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Training Loss (MSE)</div>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-600 dark:text-gray-400">Your Model:</span>
            <span class="text-lg font-bold text-orange-600 dark:text-orange-400">{$meanSquaredError.toFixed(2)}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-600 dark:text-gray-400">Optimal:</span>
            <span class="text-lg font-bold text-green-600 dark:text-green-400">{($optimalSSE / $dataPoints.length).toFixed(2)}</span>
          </div>
          {#if errorPercentage > 1}
            <div class="text-xs text-amber-700 dark:text-amber-400 mt-2 flex items-center gap-1">
              <span>⚠️</span>
              <span>{errorPercentage.toFixed(1)}% higher loss - keep training!</span>
            </div>
          {:else if isOptimal}
            <div class="text-xs text-green-700 dark:text-green-400 mt-2 flex items-center gap-1">
              <span>✓</span>
              <span>Model converged! Loss minimized.</span>
            </div>
          {/if}
        </div>
      </div>

      <!-- Manual Controls -->
      <div class="space-y-4">
        <!-- Gradient Control -->
        <div class="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-bold text-gray-700 dark:text-gray-300">
              Gradient (m):
            </label>
            <span class="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {$manualGradient.toFixed(1)}
            </span>
          </div>
          <input 
            type="range" 
            min="-10" 
            max="20" 
            step="0.1"
            bind:value={$manualGradient}
            class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-amber-600"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>-10</span>
            <span>0</span>
            <span>+20</span>
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Controls the <strong>steepness</strong> of the line
          </p>
        </div>

        <!-- Y-Intercept Control -->
        <div class="bg-cyan-50 dark:bg-cyan-900/30 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-bold text-gray-700 dark:text-gray-300">
              Y-Intercept (c):
            </label>
            <span class="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {$manualYIntercept.toFixed(1)}
            </span>
          </div>
          <input 
            type="range" 
            min="-50" 
            max="100" 
            step="0.5"
            bind:value={$manualYIntercept}
            class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-cyan-600"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>-50</span>
            <span>25</span>
            <span>+100</span>
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Moves the line <strong>up or down</strong>
          </p>
        </div>
      </div>

      <!-- Current Formula -->
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-4 border-2 border-indigo-200 dark:border-indigo-700">
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Your Line:</p>
        <p class="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400 text-center">
          y = {$activeGradient.toFixed(1)}x {$activeYIntercept >= 0 ? '+' : ''} {$activeYIntercept.toFixed(1)}
        </p>
      </div>

      <!-- Error Display -->
      <div class="space-y-3">
        <div class="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-xl p-5 border-2 border-red-200 dark:border-red-700">
          <div class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Error (Sum of Squared Errors):</p>
            <p class="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
              {$sumOfSquaredErrors.toFixed(1)}
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Lower is better! Try to minimize this number.
            </p>
          </div>
        </div>

        <!-- Comparison with Optimal -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4 border-2 {isOptimal ? 'border-green-400' : 'border-gray-200 dark:border-gray-600'}">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Optimal Error:</span>
            <span class="font-mono font-bold text-green-600 dark:text-green-400">{$optimalSSE.toFixed(1)}</span>
          </div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Your Error:</span>
            <span class="font-mono font-bold text-gray-800 dark:text-gray-200">{$sumOfSquaredErrors.toFixed(1)}</span>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Difference:</span>
            <span class="font-mono font-bold {errorDifference < 1 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}">
              +{errorDifference.toFixed(1)} {errorDifference < 1 ? '✨' : ''}
            </span>
          </div>
        </div>

        {#if isOptimal}
          <div class="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-4 text-center animate-pulse">
            <p class="text-2xl font-bold mb-1">🎉 Perfect Fit!</p>
            <p class="text-sm">You found the line of best fit!</p>
          </div>
        {:else if errorPercentage < 10}
          <div class="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl p-4 text-center">
            <p class="text-xl font-bold mb-1">🔥 Very Close!</p>
            <p class="text-sm">You're within {errorPercentage.toFixed(1)}% of optimal!</p>
          </div>
        {/if}
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2">
        <button
          on:click={useOptimalLine}
          class="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition"
        >
          📊 Show Optimal Line
        </button>
        <button
          on:click={resetToCalculated}
          class="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition"
        >
          ↩️ Back to Auto
        </button>
      </div>

      <div class="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>💡 Tip:</strong> Enable "Show Errors" on the graph to see the distance from each point to your line. The goal is to minimize the total of all these squared distances!
        </p>
      </div>

      <!-- MSE Explanation -->
      <div class="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border-2 border-blue-200 dark:border-blue-700">
        <h3 class="text-lg font-bold text-blue-800 dark:text-blue-300 mb-3">
          🧮 How is Loss (MSE) Calculated?
        </h3>
        <div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <p class="font-semibold mb-2">Step-by-step example using first 3 data points:</p>
            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 space-y-2 font-mono text-xs">
              {#each $dataPoints.slice(0, 3) as point, i}
                {@const predicted = $activeGradient * point.temperature + $activeYIntercept}
                {@const error = point.sales - predicted}
                {@const squaredError = error * error}
                <div class="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
                  <div class="text-indigo-600 dark:text-indigo-400 font-bold mb-1">Point {i + 1}: ({point.temperature}°C, {point.sales} sales)</div>
                  <div class="ml-2 space-y-1">
                    <div>1️⃣ Predicted = {$activeGradient.toFixed(1)} × {point.temperature} + {$activeYIntercept.toFixed(1)} = <span class="text-blue-600 dark:text-blue-400 font-bold">{predicted.toFixed(1)}</span></div>
                    <div>2️⃣ Error = {point.sales} - {predicted.toFixed(1)} = <span class="text-orange-600 dark:text-orange-400 font-bold">{error.toFixed(1)}</span></div>
                    <div>3️⃣ Squared = ({error.toFixed(1)})² = <span class="text-red-600 dark:text-red-400 font-bold">{squaredError.toFixed(1)}</span></div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
          
          <div class="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-3">
            <p class="font-semibold text-amber-900 dark:text-amber-200 mb-2">Final Calculation:</p>
            <div class="font-mono text-xs space-y-1">
              <div><strong>Sum all squared errors:</strong> {$sumOfSquaredErrors.toFixed(1)}</div>
              <div><strong>Divide by number of points:</strong> {$sumOfSquaredErrors.toFixed(1)} ÷ {$dataPoints.length} = <span class="text-green-600 dark:text-green-400 font-bold text-base">{$meanSquaredError.toFixed(2)}</span></div>
            </div>
          </div>

          <div class="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded p-2">
            <strong>Why "squared"?</strong> Squaring ensures errors are always positive (no negative cancelling positive), and it punishes larger errors more heavily. A 10-unit error counts 4× worse than a 5-unit error!
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
