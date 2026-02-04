<script lang="ts">
  import { userTemperature, predictedSales, activeGradient, activeYIntercept } from '../stores/dataStore'
  import { trackInteraction } from '../stores/tutorialStore'
  
  export let userGuess: number | null = null
  export let hasSubmitted: boolean = false
  export let showGuessFirst: boolean = false

  let previousTemp = $userTemperature
  $: if ($userTemperature !== previousTemp) {
    trackInteraction('PredictionCalculator', 'predict')
    previousTemp = $userTemperature
  }

  $: m = $activeGradient.toFixed(1)
  $: c = $activeYIntercept.toFixed(1)
  $: prediction = $predictedSales.toFixed(1)
  $: temp = $userTemperature
  
  function submitGuess() {
    if (userGuess !== null) {
      hasSubmitted = true
    }
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    🔮 Make a Prediction
  </h2>

  <div class="space-y-6">
    <!-- Temperature Input -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Today's Temperature: <span class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{temp}°C</span>
      </label>
      <input 
        type="range" 
        min="0" 
        max="30" 
        step="1"
        bind:value={$userTemperature}
        class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
      />
      <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>0°C</span>
        <span>15°C</span>
        <span>30°C</span>
      </div>
    </div>

    <!-- User Guess Input (if showing guess first) -->
    {#if showGuessFirst && !hasSubmitted}
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border-2 border-purple-300 dark:border-purple-600">
        <h3 class="font-bold text-gray-900 dark:text-white mb-3">🤔 Your Turn!</h3>
        <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Before we show the model's prediction, what's YOUR guess for ice cream sales at {temp}°C?
        </p>
        <div class="flex gap-3">
          <input
            type="number"
            bind:value={userGuess}
            placeholder="Enter your guess..."
            class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-xl"
          />
          <button
            on:click={submitGuess}
            disabled={userGuess === null}
            class="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Submit
          </button>
        </div>
      </div>
    {/if}

    <!-- Show results only after submission or if not showing guess first -->
    {#if !showGuessFirst || hasSubmitted}
      <!-- Calculation Steps -->
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border-2 border-green-200 dark:border-green-700">
        <h3 class="font-bold text-gray-800 dark:text-white mb-4">📝 Step-by-Step Calculation:</h3>
        
        <div class="space-y-3 font-mono text-sm">
          <div class="flex items-center space-x-2">
            <span class="text-gray-600 dark:text-gray-400">1.</span>
            <span class="text-gray-800 dark:text-gray-200">y = mx + c</span>
          </div>
          
          <div class="flex items-center space-x-2">
            <span class="text-gray-600 dark:text-gray-400">2.</span>
            <span class="text-gray-800 dark:text-gray-200">y = {m} × {temp} + ({c})</span>
          </div>
          
          <div class="flex items-center space-x-2">
            <span class="text-gray-600 dark:text-gray-400">3.</span>
            <span class="text-gray-800 dark:text-gray-200">y = {(parseFloat(m) * temp).toFixed(1)} + ({c})</span>
          </div>
          
          <div class="flex items-center space-x-2 pt-3 border-t-2 border-green-300 dark:border-green-600">
            <span class="text-gray-600 dark:text-gray-400">4.</span>
            <span class="text-green-600 dark:text-green-400 font-bold text-lg">y = {prediction}</span>
          </div>
        </div>
      </div>

      <!-- Prediction Result -->
      <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white text-center">
        <p class="text-sm opacity-90 mb-2">Model's Prediction:</p>
        <p class="text-5xl font-bold mb-2">{Math.round($predictedSales)}</p>
        <p class="text-sm opacity-90">ice creams</p>
      </div>

      <!-- Comparison with user guess -->
      {#if hasSubmitted && userGuess !== null}
        {@const difference = Math.abs(userGuess - $predictedSales)}
        <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border-2 border-blue-300 dark:border-blue-600">
          <p class="font-semibold text-gray-900 dark:text-white mb-2">Your Guess vs Model:</p>
          <div class="flex justify-between items-center mb-2">
            <span class="text-gray-700 dark:text-gray-300">Your guess:</span>
            <span class="font-bold text-purple-600 dark:text-purple-400">{userGuess}</span>
          </div>
          <div class="flex justify-between items-center mb-3">
            <span class="text-gray-700 dark:text-gray-300">Model's prediction:</span>
            <span class="font-bold text-indigo-600 dark:text-indigo-400">{prediction}</span>
          </div>
          <p class="text-sm text-gray-700 dark:text-gray-300">
            {#if difference < 5}
              🌟 <strong>Wow!</strong> You were only {difference.toFixed(1)} off! You have great intuition!
            {:else if difference < 10}
              👍 <strong>Nice!</strong> You were {difference.toFixed(1)} off. The model refines your intuition.
            {:else}
              📊 You were {difference.toFixed(1)} off. This shows why we need mathematical models!
            {/if}
          </p>
        </div>
      {/if}

      <!-- Interpretation -->
      <div class="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          {#if temp >= 10 && temp <= 20}
            ✅ <strong>Good prediction!</strong> This temperature is within our data range (10-20°C), so the prediction should be reliable.
          {:else if temp < 10}
            ⚠️ <strong>Outside data range.</strong> We don't have data below 10°C, so this prediction may be less accurate.
          {:else}
            ⚠️ <strong>Outside data range.</strong> We don't have data above 20°C, so this prediction may be less accurate.
          {/if}
        </p>
      </div>
    {/if}
  </div>
</div>
