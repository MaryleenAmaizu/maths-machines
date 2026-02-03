<script lang="ts">
  import { kValue, newStudent, distanceResults, showDistances, predictedGrade } from '../../stores/knnStore'

  export let calculateDistances: () => void
  export let resetPrediction: () => void

  $: votes = getVotes()

  function getVotes() {
    if (!$showDistances || $distanceResults.length === 0) {
      return { Excellent: 0, Average: 0, Poor: 0 }
    }

    const neighbors = $distanceResults.filter(r => r.isNeighbor)
    const v = { Excellent: 0, Average: 0, Poor: 0 }
    
    neighbors.forEach(n => {
      if (n.student.grade) {
        v[n.student.grade]++
      }
    })
    
    return v
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    🎯 KNN Calculator
  </h2>

  <!-- K Value Selector -->
  <div class="mb-6">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Number of Neighbors (k): <span class="text-2xl font-bold text-green-600 dark:text-green-400">{$kValue}</span>
    </label>
    <input 
      type="range" 
      min="1" 
      max="7" 
      step="1"
      bind:value={$kValue}
      on:input={resetPrediction}
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
    />
    <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
      <span>1</span>
      <span>4</span>
      <span>7</span>
    </div>
  </div>

  <!-- Predict Button -->
  <button
    on:click={calculateDistances}
    class="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg transition shadow-lg"
  >
    🔍 Calculate k-Nearest Neighbours
  </button>

  {#if $showDistances}
    <!-- Step 1: Distances -->
    <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
      <h3 class="font-bold text-gray-800 dark:text-white mb-3">📏 Step 1: Calculate Distances</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Manhattan Distance = |Maths difference| + |English difference|
      </p>
      
      <div class="space-y-2 max-h-60 overflow-y-auto">
        {#each $distanceResults as result}
          <div class="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded {result.isNeighbor ? 'border-2 border-purple-500' : ''}">
            <span class="font-medium text-sm text-gray-700 dark:text-gray-300">
              {result.student.name}
              {#if result.isNeighbor}
                <span class="ml-2 text-purple-600 dark:text-purple-400">✓ Neighbor</span>
              {/if}
            </span>
            <div class="text-right">
              <div class="text-sm text-gray-600 dark:text-gray-400">
                |{$newStudent.maths}-{result.student.maths}| + |{$newStudent.english}-{result.student.english}|
              </div>
              <div class="font-bold text-gray-800 dark:text-white">
                Distance: {result.distance}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Step 2: Nearest Neighbors -->
    <div class="mt-4 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
      <h3 class="font-bold text-gray-800 dark:text-white mb-3">👥 Step 2: Select k={$kValue} Nearest</h3>
      <div class="space-y-2">
        {#each $distanceResults.filter(r => r.isNeighbor) as result, i}
          <div class="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
            <span class="font-medium text-sm text-gray-700 dark:text-gray-300">
              {i + 1}. {result.student.name}
            </span>
            <span class="px-3 py-1 rounded-full text-sm font-bold
              {result.student.grade === 'Excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : ''}
              {result.student.grade === 'Average' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' : ''}
              {result.student.grade === 'Poor' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' : ''}
            ">
              {result.student.grade}
            </span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Step 3: Vote -->
    <div class="mt-4 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
      <h3 class="font-bold text-gray-800 dark:text-white mb-3">🗳️ Step 3: Vote on Labels</h3>
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <th class="text-left py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Label</th>
            <th class="text-right py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Votes</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="py-2 text-gray-700 dark:text-gray-300">Excellent</td>
            <td class="text-right font-bold text-gray-800 dark:text-white">{votes.Excellent}</td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="py-2 text-gray-700 dark:text-gray-300">Average</td>
            <td class="text-right font-bold text-gray-800 dark:text-white">{votes.Average}</td>
          </tr>
          <tr>
            <td class="py-2 text-gray-700 dark:text-gray-300">Poor</td>
            <td class="text-right font-bold text-gray-800 dark:text-white">{votes.Poor}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Final Prediction -->
    <div class="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg border-2 border-green-500">
      <h3 class="font-bold text-gray-800 dark:text-white mb-2">✨ Final Classification</h3>
      <p class="text-2xl font-bold text-center text-green-700 dark:text-green-300">
        {$newStudent.name}'s grade: {$predictedGrade}
      </p>
      <p class="text-sm text-center text-gray-600 dark:text-gray-400 mt-2">
        (Majority vote from {$kValue} nearest neighbours)
      </p>
    </div>

    <button
      on:click={resetPrediction}
      class="w-full mt-4 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition"
    >
      🔄 Reset
    </button>
  {/if}
</div>
