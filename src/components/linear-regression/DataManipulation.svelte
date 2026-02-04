<script lang="ts">
  import { dataPoints } from '../../stores/dataStore'
  import { trackInteraction } from '../../stores/tutorialStore'
  import { fade, scale } from 'svelte/transition'

  let newTemperature = 25
  let newSales = 100
  let showAddForm = false
  let editingPoint: { day: number; temperature: number; sales: number } | null = null

  function addDataPoint() {
    const newDay = $dataPoints.length + 1
    dataPoints.update(points => [...points, { 
      day: newDay, 
      temperature: newTemperature, 
      sales: newSales 
    }])
    trackInteraction('DataManipulation', 'modify')
    showAddForm = false
    newTemperature = 25
    newSales = 100
  }

  function removeDataPoint(day: number) {
    dataPoints.update(points => {
      const filtered = points.filter(p => p.day !== day)
      // Renumber days
      return filtered.map((p, i) => ({ ...p, day: i + 1 }))
    })
    trackInteraction('DataManipulation', 'modify')
  }

  function startEdit(point: { day: number; temperature: number; sales: number }) {
    editingPoint = { ...point }
  }

  function saveEdit() {
    if (editingPoint) {
      dataPoints.update(points => 
        points.map(p => p.day === editingPoint!.day ? editingPoint! : p)
      )
      trackInteraction('DataManipulation', 'modify')
      editingPoint = null
    }
  }

  function cancelEdit() {
    editingPoint = null
  }

  function addOutlier() {
    const newDay = $dataPoints.length + 1
    // Add a point that doesn't fit the pattern
    const avgTemp = 15
    dataPoints.update(points => [...points, { 
      day: newDay, 
      temperature: avgTemp + Math.random() * 10, 
      sales: 20 + Math.random() * 30 // Low sales despite temperature
    }])
    trackInteraction('DataManipulation', 'modify')
  }

  function resetData() {
    dataPoints.set([
      { day: 1, temperature: 10, sales: 45 },
      { day: 2, temperature: 12, sales: 50 },
      { day: 3, temperature: 15, sales: 65 },
      { day: 4, temperature: 18, sales: 80 },
      { day: 5, temperature: 20, sales: 90 },
    ])
  }

  function generateRandomData() {
    const gradient = 4 + Math.random() * 4 // Random gradient between 4 and 8
    const yIntercept = -10 + Math.random() * 20 // Random y-intercept
    const noise = 5 + Math.random() * 10 // Random noise level
    
    const newPoints = Array.from({ length: 8 }, (_, i) => {
      const temp = 10 + i * 2 + (Math.random() - 0.5) * 3
      const sales = gradient * temp + yIntercept + (Math.random() - 0.5) * noise
      return {
        day: i + 1,
        temperature: Math.round(temp * 10) / 10,
        sales: Math.max(0, Math.round(sales))
      }
    })
    
    dataPoints.set(newPoints)
    trackInteraction('DataManipulation', 'modify')
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h3 class="text-xl font-bold text-gray-800 dark:text-white">🧪 Experiment Zone</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">Try modifying the data to see how it affects the line!</p>
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="grid grid-cols-2 gap-3 mb-4">
    <button
      on:click={() => showAddForm = !showAddForm}
      class="px-4 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition flex items-center justify-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Add Point
    </button>

    <button
      on:click={addOutlier}
      class="px-4 py-3 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg font-medium hover:bg-orange-200 dark:hover:bg-orange-900/50 transition flex items-center justify-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      Add Outlier
    </button>

    <button
      on:click={generateRandomData}
      class="px-4 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition flex items-center justify-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Random Data
    </button>

    <button
      on:click={resetData}
      class="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
      </svg>
      Reset
    </button>
  </div>

  <!-- Add Point Form -->
  {#if showAddForm}
    <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-4 border-2 border-dashed border-gray-300 dark:border-gray-600" transition:scale={{ duration: 200 }}>
      <h4 class="font-semibold text-gray-800 dark:text-white mb-3">Add New Data Point</h4>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label for="new-temperature" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Temperature (°C)
          </label>
          <input
            id="new-temperature"
            type="number"
            bind:value={newTemperature}
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            step="0.1"
          />
        </div>
        <div>
          <label for="new-sales" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sales (cones)
          </label>
          <input
            id="new-sales"
            type="number"
            bind:value={newSales}
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>
      <div class="flex gap-2">
        <button
          on:click={addDataPoint}
          class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Add
        </button>
        <button
          on:click={() => showAddForm = false}
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  {/if}

  <!-- Data Points List -->
  <div class="space-y-2">
    <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Current Data Points</h4>
    <div class="max-h-64 overflow-y-auto space-y-2">
      {#each $dataPoints as point (point.day)}
        <div 
          class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          transition:fade={{ duration: 200 }}
        >
          {#if editingPoint && editingPoint.day === point.day}
            <!-- Edit Mode -->
            <div class="flex-1 grid grid-cols-2 gap-2">
              <input
                type="number"
                bind:value={editingPoint.temperature}
                class="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                step="0.1"
              />
              <input
                type="number"
                bind:value={editingPoint.sales}
                class="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              />
            </div>
            <button
              on:click={saveEdit}
              class="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition"
              title="Save"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button
              on:click={cancelEdit}
              class="p-2 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
              title="Cancel"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          {:else}
            <!-- View Mode -->
            <div class="flex-1">
              <span class="text-sm font-medium text-gray-800 dark:text-white">
                {point.temperature}°C → {point.sales} cones
              </span>
            </div>
            <button
              on:click={() => startEdit(point)}
              class="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition"
              title="Edit"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            {#if $dataPoints.length > 2}
              <button
                on:click={() => removeDataPoint(point.day)}
                class="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition"
                title="Remove"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            {/if}
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>
