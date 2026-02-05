<script lang="ts">
  let expandedTreasure: number | null = null

  function toggleTreasure(id: number) {
    expandedTreasure = expandedTreasure === id ? null : id
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    🏆 Maths Foundations Review
  </h2>
  
  <p class="text-gray-600 dark:text-gray-300 mb-6">
    Let's review the <strong>4 maths treasures</strong> we discovered while building our generative AI. Each concept helped the AI learn patterns and create new music!
  </p>

  <div class="space-y-4">
    <!-- Treasure 1: Mean/Average -->
    <div class="border-2 border-purple-200 dark:border-purple-700 rounded-lg overflow-hidden">
      <button
        on:click={() => toggleTreasure(1)}
        class="w-full px-4 py-3 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition text-left flex items-center justify-between"
      >
        <span class="font-bold text-gray-800 dark:text-white">
          📊 Treasure 1: Average (Mean)
        </span>
        <span class="text-2xl">{expandedTreasure === 1 ? '▼' : '▶'}</span>
      </button>
      
      {#if expandedTreasure === 1}
        <div class="p-4 bg-white dark:bg-gray-800">
          <p class="text-gray-700 dark:text-gray-300 mb-3">
            The <strong>average</strong> (or mean) tells us the typical value in a group of numbers.
          </p>
          <div class="bg-purple-50 dark:bg-purple-900/30 p-3 rounded mb-3 font-mono text-sm">
            <div>Electronic tracks: 125, 128, 132 BPM</div>
            <div class="text-purple-600 dark:text-purple-400 font-bold mt-2">
              Average = (125 + 128 + 132) ÷ 3 = 128.3 BPM
            </div>
          </div>
          <div class="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded">
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <strong>🧠</strong> The AI learns the "typical" tempo for each genre by calculating averages. This helps it generate realistic new tracks!
            </p>
          </div>
        </div>
      {/if}
    </div>

    <!-- Treasure 2: Range -->
    <div class="border-2 border-pink-200 dark:border-pink-700 rounded-lg overflow-hidden">
      <button
        on:click={() => toggleTreasure(2)}
        class="w-full px-4 py-3 bg-pink-50 dark:bg-pink-900/30 hover:bg-pink-100 dark:hover:bg-pink-900/50 transition text-left flex items-center justify-between"
      >
        <span class="font-bold text-gray-800 dark:text-white">
          📏 Treasure 2: Range (Min & Max)
        </span>
        <span class="text-2xl">{expandedTreasure === 2 ? '▼' : '▶'}</span>
      </button>
      
      {#if expandedTreasure === 2}
        <div class="p-4 bg-white dark:bg-gray-800">
          <p class="text-gray-700 dark:text-gray-300 mb-3">
            The <strong>range</strong> shows the spread from smallest to largest value.
          </p>
          <div class="bg-pink-50 dark:bg-pink-900/30 p-3 rounded mb-3 font-mono text-sm">
            <div>Hip-Hop energy: 5, 6, 7</div>
            <div class="text-pink-600 dark:text-pink-400 font-bold mt-2">
              Range = 7 - 5 = 2 (Min: 5, Max: 7)
            </div>
          </div>
          <div class="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded">
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <strong>🧠</strong> The AI generates values within the learned range. If all Hip-Hop tracks have energy between 5-7, the AI won't generate 10!
            </p>
          </div>
        </div>
      {/if}
    </div>

    <!-- Treasure 3: Frequency Distribution -->
    <div class="border-2 border-orange-200 dark:border-orange-700 rounded-lg overflow-hidden">
      <button
        on:click={() => toggleTreasure(3)}
        class="w-full px-4 py-3 bg-orange-50 dark:bg-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition text-left flex items-center justify-between"
      >
        <span class="font-bold text-gray-800 dark:text-white">
          📊 Treasure 3: Frequency & Histograms
        </span>
        <span class="text-2xl">{expandedTreasure === 3 ? '▼' : '▶'}</span>
      </button>
      
      {#if expandedTreasure === 3}
        <div class="p-4 bg-white dark:bg-gray-800">
          <p class="text-gray-700 dark:text-gray-300 mb-3">
            <strong>Frequency</strong> counts how often each value appears. A histogram shows this visually.
          </p>
          <div class="bg-orange-50 dark:bg-orange-900/30 p-3 rounded mb-3">
            <p class="text-sm mb-2"><strong>Example: Energy levels in Electronic music</strong></p>
            <div class="font-mono text-xs space-y-1">
              <div>Energy 7: ⬛ (1 track)</div>
              <div>Energy 8: ⬛⬛ (2 tracks)</div>
              <div>Energy 9: ⬛ (1 track)</div>
            </div>
            <p class="text-xs text-orange-600 dark:text-orange-400 mt-2 font-bold">
              Most tracks have energy = 8 (most frequent)
            </p>
          </div>
          <div class="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded">
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <strong>🧠</strong> The AI is more likely to generate values that appear frequently in training data. This makes generated tracks sound realistic!
            </p>
          </div>
        </div>
      {/if}
    </div>

    <!-- Treasure 4: Probability & Randomness -->
    <div class="border-2 border-green-200 dark:border-green-700 rounded-lg overflow-hidden">
      <button
        on:click={() => toggleTreasure(4)}
        class="w-full px-4 py-3 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 transition text-left flex items-center justify-between"
      >
        <span class="font-bold text-gray-800 dark:text-white">
          🎲 Treasure 4: Probability & Sampling
        </span>
        <span class="text-2xl">{expandedTreasure === 4 ? '▼' : '▶'}</span>
      </button>
      
      {#if expandedTreasure === 4}
        <div class="p-4 bg-white dark:bg-gray-800">
          <p class="text-gray-700 dark:text-gray-300 mb-3">
            <strong>Probability</strong> measures how likely something is to happen. <strong>Sampling</strong> means picking values randomly within learned boundaries.
          </p>
          <div class="bg-green-50 dark:bg-green-900/30 p-3 rounded mb-3">
            <p class="text-sm mb-2"><strong>Example: Generating a new tempo</strong></p>
            <div class="text-xs space-y-1">
              <div>• Electronic tracks range: 125-132 BPM</div>
              <div>• AI picks a random value: 129 BPM ✓</div>
              <div>• This value is within the learned range!</div>
            </div>
          </div>
          <div class="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded">
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <strong>🧠</strong> Every time you click "Generate," the AI samples new random values within learned ranges. That's why each generated track is different but still sounds like the genre!
            </p>
          </div>
          <div class="mt-3 p-3 bg-amber-50 dark:bg-amber-900/30 rounded">
            <p class="text-xs text-gray-700 dark:text-gray-300">
              <strong>🔬 Year 8 Link:</strong> This connects to probability (likelihood of events) and data sampling - key concepts in statistics and machine learning!
            </p>
          </div>
        </div>
      {/if}
    </div>

  </div>
</div>
