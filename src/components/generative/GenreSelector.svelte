<script lang="ts">
  import type { GenreStats } from './types'
  
  export let selectedGenre: 'electronic' | 'hiphop' | null
  export let stats: GenreStats | null = null
  export let onGenerate: () => void
</script>

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    🎛️ AI Music Generator
  </h2>
  
  <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
    Select a genre to generate a new track:
  </p>
  
  <div class="grid grid-cols-2 gap-3 mb-6">
    <button
      on:click={() => selectedGenre = 'electronic'}
      class="p-4 rounded-xl border-2 transition {selectedGenre === 'electronic' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'}"
    >
      <div class="text-3xl mb-2">⚡</div>
      <div class="font-bold text-gray-900 dark:text-white">Electronic</div>
      <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Fast, energetic, minimal vocals</div>
    </button>
    
    <button
      on:click={() => selectedGenre = 'hiphop'}
      class="p-4 rounded-xl border-2 transition {selectedGenre === 'hiphop' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30' : 'border-gray-300 dark:border-gray-600 hover:border-orange-400'}"
    >
      <div class="text-3xl mb-2">🎤</div>
      <div class="font-bold text-gray-900 dark:text-white">Hip-Hop</div>
      <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Slower, rhythmic, vocal-heavy</div>
    </button>
  </div>

  {#if selectedGenre && stats}
    <!-- Show learned patterns -->
    <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-5 mb-4 border-2 border-purple-300 dark:border-purple-600">
      <h3 class="font-bold text-gray-900 dark:text-white mb-3">📊 Learned Patterns:</h3>
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
          <div class="text-xs text-gray-600 dark:text-gray-400">Tempo Range</div>
          <div class="font-bold text-indigo-600 dark:text-indigo-400">{stats.tempo.min}-{stats.tempo.max} BPM</div>
          <div class="text-xs text-gray-500 mt-1">Avg: {stats.tempo.avg.toFixed(0)}</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
          <div class="text-xs text-gray-600 dark:text-gray-400">Energy Range</div>
          <div class="font-bold text-green-600 dark:text-green-400">{stats.energy.min}-{stats.energy.max}/10</div>
          <div class="text-xs text-gray-500 mt-1">Avg: {stats.energy.avg.toFixed(1)}</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
          <div class="text-xs text-gray-600 dark:text-gray-400">Dance Range</div>
          <div class="font-bold text-purple-600 dark:text-purple-400">{stats.danceability.min}-{stats.danceability.max}/10</div>
          <div class="text-xs text-gray-500 mt-1">Avg: {stats.danceability.avg.toFixed(1)}</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
          <div class="text-xs text-gray-600 dark:text-gray-400">Vocals Range</div>
          <div class="font-bold text-pink-600 dark:text-pink-400">{stats.vocals.min}-{stats.vocals.max}/10</div>
          <div class="text-xs text-gray-500 mt-1">Avg: {stats.vocals.avg.toFixed(1)}</div>
        </div>
      </div>
    </div>

    <button
      on:click={onGenerate}
      class="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105 shadow-lg"
    >
      ✨ Generate New Track
    </button>
  {:else}
    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
      👆 Select a genre above to start
    </div>
  {/if}
</div>
