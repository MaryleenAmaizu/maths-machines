<script lang="ts">
  import { gradient, yIntercept, formulaString, dataPoints, manualMode } from '../stores/dataStore'
  import { trackInteraction } from '../stores/tutorialStore'

  let showGradientCalc = false
  let showInterceptCalc = false

  function toggleGradient() {
    showGradientCalc = !showGradientCalc
    if (showGradientCalc) {
      trackInteraction('FormulaExplainer', 'expand')
    }
  }

  function toggleIntercept() {
    showInterceptCalc = !showInterceptCalc
    if (showInterceptCalc) {
      trackInteraction('FormulaExplainer', 'expand')
    }
  }

  $: m = $gradient.toFixed(1)
  $: c = $yIntercept.toFixed(1)
  
  // Use points for calculation examples
  $: point1 = $dataPoints[2] // (15, 65)
  $: point2 = $dataPoints[3] // (18, 80)
</script>

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    🧮 The Formula: y = mx + c
  </h2>

  {#if $manualMode}
    <div class="mb-4 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border-2 border-purple-200 dark:border-purple-700">
      <p class="text-sm text-gray-700 dark:text-gray-300">
        🎮 <strong>Manual Mode Active:</strong> You're adjusting the line yourself. These calculations show the mathematically optimal line.
      </p>
    </div>
  {/if}

  <div class="space-y-6">
    <!-- Final Formula Display -->
    <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-6 border-2 border-indigo-200 dark:border-indigo-700">
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Formula:</p>
        <p class="text-3xl font-mono font-bold text-indigo-600 dark:text-indigo-400">
          {$formulaString}
        </p>
      </div>
    </div>

    <!-- Gradient Explanation -->
    <div class="border-2 border-amber-200 dark:border-amber-800 rounded-xl overflow-hidden">
      <button 
        on:click={toggleGradient}
        class="w-full px-6 py-4 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition flex items-center justify-between"
      >
        <div class="flex items-center space-x-3">
          <span class="text-2xl">📐</span>
          <div class="text-left">
            <h3 class="font-bold text-gray-800 dark:text-white">Gradient (m) = {m}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">How steep is the line?</p>
          </div>
        </div>
        <span class="text-2xl">{showGradientCalc ? '▼' : '▶'}</span>
      </button>
      
      {#if showGradientCalc}
        <div class="px-6 py-4 bg-white dark:bg-gray-800">
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            The gradient tells us: "For every 1°C increase in temperature, how many more ice creams are sold?"
          </p>
          
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm space-y-2">
            <p class="text-gray-800 dark:text-gray-200">m = (change in y) ÷ (change in x)</p>
            {#if point1 && point2}
              <p class="text-gray-800 dark:text-gray-200">m = ({point2.sales} - {point1.sales}) ÷ ({point2.temperature} - {point1.temperature})</p>
              <p class="text-gray-800 dark:text-gray-200">m = {point2.sales - point1.sales} ÷ {point2.temperature - point1.temperature}</p>
              <p class="text-indigo-600 dark:text-indigo-400 font-bold">m = {m}</p>
            {/if}
          </div>
          
          <p class="text-sm text-green-700 dark:text-green-400 mt-3 font-medium">
            ✓ For every 1°C warmer, we sell about {m} more ice creams!
          </p>
        </div>
      {/if}
    </div>

    <!-- Y-Intercept Explanation -->
    <div class="border-2 border-cyan-200 dark:border-cyan-800 rounded-xl overflow-hidden">
      <button 
        on:click={toggleIntercept}
        class="w-full px-6 py-4 bg-cyan-50 dark:bg-cyan-900/30 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition flex items-center justify-between"
      >
        <div class="flex items-center space-x-3">
          <span class="text-2xl">📍</span>
          <div class="text-left">
            <h3 class="font-bold text-gray-800 dark:text-white">Y-Intercept (c) = {c}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Where does the line start?</p>
          </div>
        </div>
        <span class="text-2xl">{showInterceptCalc ? '▼' : '▶'}</span>
      </button>
      
      {#if showInterceptCalc}
        <div class="px-6 py-4 bg-white dark:bg-gray-800">
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            The y-intercept is where the line crosses the y-axis (when x = 0).
          </p>
          
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm space-y-2">
            <p class="text-gray-800 dark:text-gray-200">Using point ({$dataPoints[0]?.temperature}, {$dataPoints[0]?.sales}):</p>
            <p class="text-gray-800 dark:text-gray-200">y = mx + c</p>
            <p class="text-gray-800 dark:text-gray-200">{$dataPoints[0]?.sales} = {m} × {$dataPoints[0]?.temperature} + c</p>
            <p class="text-gray-800 dark:text-gray-200">{$dataPoints[0]?.sales} = {(parseFloat(m) * $dataPoints[0]?.temperature).toFixed(1)} + c</p>
            <p class="text-gray-800 dark:text-gray-200">c = {$dataPoints[0]?.sales} - {(parseFloat(m) * $dataPoints[0]?.temperature).toFixed(1)}</p>
            <p class="text-cyan-600 dark:text-cyan-400 font-bold">c = {c}</p>
          </div>
          
          <p class="text-sm text-amber-700 dark:text-amber-400 mt-3 font-medium">
            ⚠️ At 0°C, we'd predict {c} ice creams (negative!). This shows our formula works best between 10°C and 20°C.
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>
