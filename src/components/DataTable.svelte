<script lang="ts">
  import { dataPoints, userTemperature } from '../stores/dataStore'
  import type { DataPoint } from '../stores/dataStore'
  import { trackInteraction } from '../stores/tutorialStore'
  import { onMount } from 'svelte'

  let editingCell: { row: number; col: string } | null = null
  let editValue = ''
  let hoveredRow: number | null = null

  onMount(() => {
    // Track that user viewed the data table
    trackInteraction('DataTable', 'view')
  })

  function startEdit(index: number, column: string, currentValue: number) {
    editingCell = { row: index, col: column }
    editValue = currentValue.toString()
    trackInteraction('DataTable', 'view')
  }

  function saveEdit() {
    if (!editingCell) return

    const newValue = parseFloat(editValue)
    if (isNaN(newValue) || newValue < 0) {
      editingCell = null
      return
    }

    dataPoints.update(points => {
      const newPoints = [...points]
      const point = newPoints[editingCell!.row]
      if (editingCell!.col === 'temperature') {
        point.temperature = newValue
      } else if (editingCell!.col === 'sales') {
        point.sales = newValue
      }
      return newPoints
    })

    editingCell = null
  }

  function cancelEdit() {
    editingCell = null
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      saveEdit()
    } else if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  function addDataPoint() {
    dataPoints.update(points => {
      const lastDay = points.length > 0 ? points[points.length - 1].day : 0
      const newPoint: DataPoint = {
        day: lastDay + 1,
        temperature: 15,
        sales: 60
      }
      return [...points, newPoint]
    })
  }

  function deleteDataPoint(index: number) {
    if ($dataPoints.length <= 2) {
      alert('Need at least 2 data points to draw a line!')
      return
    }
    
    dataPoints.update(points => {
      const newPoints = points.filter((_, i) => i !== index)
      // Renumber days
      return newPoints.map((p, i) => ({ ...p, day: i + 1 }))
    })
  }

  function resetData() {
    const initialData = [
      { day: 1, temperature: 10, sales: 45 },
      { day: 2, temperature: 12, sales: 50 },
      { day: 3, temperature: 15, sales: 65 },
      { day: 4, temperature: 18, sales: 80 },
      { day: 5, temperature: 20, sales: 90 },
    ]
    dataPoints.set(initialData)
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
      Ice Cream Sales Data
    </h2>
    <div class="flex gap-2">
      <button
        on:click={addDataPoint}
        class="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition flex items-center gap-1"
        title="Add new data point"
      >
        <span class="text-lg">+</span> Add Row
      </button>
      <button
        on:click={resetData}
        class="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition"
        title="Reset to original data"
      >
        🔄 Reset
      </button>
    </div>
  </div>
  
  <div class="overflow-x-auto">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-indigo-100 dark:bg-indigo-900">
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Day</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Temperature (°C)</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Ice Creams Sold</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each $dataPoints as point, i}
          <tr 
            class="border-b border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition"
            on:mouseenter={() => hoveredRow = i}
            on:mouseleave={() => hoveredRow = null}
          >
            <td class="px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">{point.day}</td>
            
            <!-- Temperature Cell -->
            <td class="px-4 py-3 text-gray-800 dark:text-gray-200 font-mono">
              {#if editingCell?.row === i && editingCell?.col === 'temperature'}
                <input
                  type="number"
                  bind:value={editValue}
                  on:keydown={handleKeyDown}
                  on:blur={saveEdit}
                  class="w-20 px-2 py-1 border-2 border-indigo-500 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  autofocus
                />
              {:else}
                <button
                  on:click={() => startEdit(i, 'temperature', point.temperature)}
                  class="hover:bg-indigo-100 dark:hover:bg-indigo-900 px-2 py-1 rounded transition cursor-pointer"
                  title="Click to edit"
                >
                  {point.temperature}°
                </button>
              {/if}
            </td>
            
            <!-- Sales Cell -->
            <td class="px-4 py-3 text-gray-800 dark:text-gray-200 font-mono">
              {#if editingCell?.row === i && editingCell?.col === 'sales'}
                <input
                  type="number"
                  bind:value={editValue}
                  on:keydown={handleKeyDown}
                  on:blur={saveEdit}
                  class="w-20 px-2 py-1 border-2 border-indigo-500 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  autofocus
                />
              {:else}
                <button
                  on:click={() => startEdit(i, 'sales', point.sales)}
                  class="hover:bg-indigo-100 dark:hover:bg-indigo-900 px-2 py-1 rounded transition cursor-pointer"
                  title="Click to edit"
                >
                  {point.sales}
                </button>
              {/if}
            </td>
            
            <!-- Actions -->
            <td class="px-4 py-3">
              <button
                on:click={() => deleteDataPoint(i)}
                class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition"
                title="Delete this row"
                disabled={$dataPoints.length <= 2}
                class:opacity-50={$dataPoints.length <= 2}
                class:cursor-not-allowed={$dataPoints.length <= 2}
              >
                🗑️
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  
  <div class="mt-4 space-y-2">
    <div class="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
      <p class="text-sm text-gray-700 dark:text-gray-300">
        💡 <strong>Try it:</strong> Click any temperature or sales value to edit it and explore the data!
      </p>
    </div>
    
    <div class="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
      <p class="text-sm text-gray-700 dark:text-gray-300">
        🎯 <strong>Notice:</strong> As temperature increases, sales also increase. This suggests a relationship between the two variables.
      </p>
    </div>
  </div>
</div>
