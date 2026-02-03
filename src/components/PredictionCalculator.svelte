<script lang="ts">
  import { userTemperature, predictedSales, activeGradient, activeYIntercept } from '../stores/dataStore'
  import { trackInteraction } from '../stores/tutorialStore'

  let previousTemp = $userTemperature
  $: if ($userTemperature !== previousTemp) {
    trackInteraction('PredictionCalculator', 'predict')
    previousTemp = $userTemperature
  }

  $: m = $activeGradient.toFixed(1)
  $: c = $activeYIntercept.toFixed(1)
  $: prediction = $predictedSales.toFixed(1)
  $: temp = $userTemperature
</script>

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    🎯 Make a Prediction
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
      <p class="text-sm opacity-90 mb-2">Predicted Ice Cream Sales:</p>
      <p class="text-5xl font-bold mb-2">{Math.round($predictedSales)}</p>
      <p class="text-sm opacity-90">ice creams</p>
    </div>

    <!-- Interpretation -->
    <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
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
  </div>
</div>
