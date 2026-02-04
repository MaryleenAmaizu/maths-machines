<script lang="ts">
  import type { Track } from './types'
  
  export let track: Track
</script>

<div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl shadow-xl p-6 border-4 border-green-400 dark:border-green-600 animate-fadeIn">
  <div class="flex items-center gap-3 mb-4">
    <span class="text-4xl">🎵</span>
    <div>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">{track.name}</h3>
      <div class="text-sm text-gray-600 dark:text-gray-400">AI-Generated {track.genre === 'electronic' ? 'Electronic' : 'Hip-Hop'} Track</div>
    </div>
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div>
        <div class="text-xs text-gray-600 dark:text-gray-400">Tempo</div>
        <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{track.tempo}</div>
        <div class="text-xs text-gray-500">BPM</div>
      </div>
      <div>
        <div class="text-xs text-gray-600 dark:text-gray-400">Energy</div>
        <div class="text-2xl font-bold text-green-600 dark:text-green-400">{track.energy}</div>
        <div class="text-xs text-gray-500">out of 10</div>
      </div>
      <div>
        <div class="text-xs text-gray-600 dark:text-gray-400">Danceability</div>
        <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{track.danceability}</div>
        <div class="text-xs text-gray-500">out of 10</div>
      </div>
      <div>
        <div class="text-xs text-gray-600 dark:text-gray-400">Vocals</div>
        <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">{track.vocals}</div>
        <div class="text-xs text-gray-500">out of 10</div>
      </div>
    </div>
  </div>

  <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
    <p class="text-sm text-gray-700 dark:text-gray-300">
      ✅ <strong>This track fits the {track.genre === 'electronic' ? 'Electronic' : 'Hip-Hop'} pattern!</strong>
      All features are within the learned ranges, but it's completely new—not a copy of any existing track.
    </p>
  </div>
</div>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
</style>
