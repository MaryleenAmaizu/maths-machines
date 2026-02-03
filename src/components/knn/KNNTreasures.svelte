<script lang="ts">
  let expandedTreasure: number | null = null

  function toggleTreasure(id: number) {
    expandedTreasure = expandedTreasure === id ? null : id
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    🏆 Math Foundations (3 Treasures)
  </h2>
  
  <p class="text-gray-600 dark:text-gray-300 mb-6">
    We need to collect 3 treasures to proceed further. Each treasure teaches us a new math skill that helps our machine learn faster.
  </p>

  <div class="space-y-4">
    <!-- Treasure 1 -->
    <div class="border-2 border-indigo-200 dark:border-indigo-700 rounded-lg overflow-hidden">
      <button
        on:click={() => toggleTreasure(1)}
        class="w-full px-4 py-3 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition text-left flex items-center justify-between"
      >
        <span class="font-bold text-gray-800 dark:text-white">
          🔷 Treasure 1: Patterns (Sequences)
        </span>
        <span class="text-2xl">{expandedTreasure === 1 ? '▼' : '▶'}</span>
      </button>
      
      {#if expandedTreasure === 1}
        <div class="p-4 bg-white dark:bg-gray-800">
          <p class="text-gray-700 dark:text-gray-300 mb-3">
            Patterns help us guess what comes next. Look at: <strong>2, 4, 6, 8, ?</strong>
          </p>
          <div class="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded">
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <strong>🧠 Connection to KNN:</strong> When we follow a sequence to decide what comes next, 
              we're doing what a machine does. A machine looks at old examples to guess the new one.
            </p>
          </div>
          <div class="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
              🧩 Activity: 5, 10, 15, 20, <strong class="text-indigo-600">?</strong>
            </p>
          </div>
        </div>
      {/if}
    </div>

    <!-- Treasure 2 -->
    <div class="border-2 border-green-200 dark:border-green-700 rounded-lg overflow-hidden">
      <button
        on:click={() => toggleTreasure(2)}
        class="w-full px-4 py-3 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 transition text-left flex items-center justify-between"
      >
        <span class="font-bold text-gray-800 dark:text-white">
          🔷 Treasure 2: Number Sense (Comparisons)
        </span>
        <span class="text-2xl">{expandedTreasure === 2 ? '▼' : '▶'}</span>
      </button>
      
      {#if expandedTreasure === 2}
        <div class="p-4 bg-white dark:bg-gray-800">
          <p class="text-gray-700 dark:text-gray-300 mb-3">
            Which point is closer to 10: <strong>12</strong> or <strong>3</strong>?
          </p>
          <p class="text-gray-700 dark:text-gray-300 mb-3">
            Looking at it, we just know 12 is closer than 3. That's number sense!
          </p>
          <div class="bg-green-50 dark:bg-green-900/30 p-3 rounded">
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <strong>🧠 Connection to KNN:</strong> Machines compare too. KNN works by comparing distances between points.
              Your number sense is the same skill the machine uses!
            </p>
          </div>
        </div>
      {/if}
    </div>

    <!-- Treasure 3 -->
    <div class="border-2 border-amber-200 dark:border-amber-700 rounded-lg overflow-hidden">
      <button
        on:click={() => toggleTreasure(3)}
        class="w-full px-4 py-3 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition text-left flex items-center justify-between"
      >
        <span class="font-bold text-gray-800 dark:text-white">
          🔷 Treasure 3: Space & Distance (Geometry)
        </span>
        <span class="text-2xl">{expandedTreasure === 3 ? '▼' : '▶'}</span>
      </button>
      
      {#if expandedTreasure === 3}
        <div class="p-4 bg-white dark:bg-gray-800">
          <p class="text-gray-700 dark:text-gray-300 mb-3">
            Point A is at (2, 3). Which is closer: Point B at (5, 7) or Point C at (3, 4)?
          </p>
          <p class="text-gray-700 dark:text-gray-300 mb-3">
            We count the steps along each direction to see which point is nearer.
          </p>
          <div class="bg-amber-50 dark:bg-amber-900/30 p-3 rounded">
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <strong>🧠 Distance Decides the Group:</strong> The nearer a point is to others, 
              the more likely it belongs to the same group. This is exactly what KNN does!
            </p>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
