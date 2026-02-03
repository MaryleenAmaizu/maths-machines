<script lang="ts">
  const treasures = [
    { year: 7, name: 'Sequences', icon: '🔢', description: 'Spotting patterns in data' },
    { year: 7, name: 'Algebraic Notation', icon: '🔤', description: 'Turning patterns into rules' },
    { year: 8, name: 'Coordinates', icon: '📍', description: 'Mapping inputs to outputs' },
    { year: 8, name: 'Scatter Graphs', icon: '📊', description: 'Showing relationships' },
    { year: 8, name: 'Line of Best Fit', icon: '📈', description: 'Capturing trends' },
    { year: 9, name: 'Gradient (m)', icon: '📐', description: 'Rate of change' },
    { year: 9, name: 'Y-Intercept (c)', icon: '📍', description: 'Starting point' },
    { year: 9, name: 'Formula y=mx+c', icon: '🎯', description: 'Complete prediction tool' },
  ]
</script>

<div class="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-2xl shadow-xl p-6 border-2 border-amber-200 dark:border-amber-700">
  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    🏆 Maths Treasures Collected
  </h2>
  
  <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
    Throughout this exploration, you've used powerful maths tools from Years 7, 8, and 9:
  </p>

  <div class="space-y-2">
    {#each treasures as treasure}
      <div class="flex items-start space-x-3 bg-white dark:bg-gray-800 rounded-lg p-3 hover:shadow-md transition">
        <span class="text-2xl">{treasure.icon}</span>
        <div class="flex-1">
          <div class="flex items-center space-x-2">
            <span class="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded">
              Year {treasure.year}
            </span>
            <h3 class="font-bold text-gray-800 dark:text-white text-sm">{treasure.name}</h3>
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{treasure.description}</p>
        </div>
        <span class="text-green-500">✓</span>
      </div>
    {/each}
  </div>

  <div class="mt-4 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-lg">
    <p class="text-sm text-gray-700 dark:text-gray-300 text-center">
      <strong>These treasures work together</strong> to turn patterns into predictions! 🎉
    </p>
  </div>
</div>
