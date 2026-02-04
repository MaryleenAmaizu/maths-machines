<script lang="ts">
  import type { Track, Distribution } from './types'
  
  export let track: Track
  export let getDistribution: (genre: string, feature: keyof Track) => Distribution

  const features = ['tempo', 'energy', 'danceability', 'vocals'] as const
  
  const featureConfig = {
    tempo: { 
      bar: 'bg-indigo-400 dark:bg-indigo-500', 
      text: 'text-indigo-600 dark:text-indigo-400', 
      label: 'Tempo Distribution (BPM)', 
      unit: 'BPM' 
    },
    energy: { 
      bar: 'bg-green-400 dark:bg-green-500', 
      text: 'text-green-600 dark:text-green-400', 
      label: 'Energy Distribution (0-10)', 
      unit: '/10' 
    },
    danceability: { 
      bar: 'bg-purple-400 dark:bg-purple-500', 
      text: 'text-purple-600 dark:text-purple-400', 
      label: 'Danceability Distribution (0-10)', 
      unit: '/10' 
    },
    vocals: { 
      bar: 'bg-pink-400 dark:bg-pink-500', 
      text: 'text-pink-600 dark:text-pink-400', 
      label: 'Vocals Distribution (0-10)', 
      unit: '/10' 
    }
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    📊 Feature Distribution Analysis
  </h2>
  <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
    See where your generated track falls within the {track.genre === 'electronic' ? 'Electronic' : 'Hip-Hop'} genre distribution. The <span class="text-green-600 dark:text-green-400 font-bold">green marker ▼</span> shows your AI track's value.
  </p>

  <div class="space-y-6">
    {#each features as feature}
      {@const dist = getDistribution(track.genre, feature)}
      {@const config = featureConfig[feature]}
      {@const value = track[feature]}
      {@const position = ((value - dist.min) / (dist.max - dist.min)) * 100}
      <div>
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-semibold {config.text}">{config.label}</h3>
          <span class="text-xs text-gray-500">Range: {dist.min} - {dist.max}</span>
        </div>
        <div class="relative h-24 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
          <div class="flex items-end justify-around h-full">
            {#each Array.from({length: dist.max - dist.min + 1}, (_, i) => dist.min + i) as binValue}
              {@const count = dist.bins[binValue] || 0}
              {@const maxCount = Math.max(...Object.values(dist.bins))}
              {@const height = count > 0 ? (count / maxCount) * 100 : 0}
              <div class="flex flex-col items-center flex-1">
                <div 
                  class="w-full {config.bar} rounded-t transition-all"
                  style="height: {height}%"
                  title="{feature === 'tempo' ? binValue + ' BPM' : feature.charAt(0).toUpperCase() + feature.slice(1) + ' ' + binValue}: {count} track(s)"
                ></div>
                {#if count > 0}
                  <span class="text-[10px] text-gray-600 dark:text-gray-400 mt-1">{binValue}</span>
                {/if}
              </div>
            {/each}
          </div>
          <!-- Generated value marker -->
          <div class="absolute bottom-0 left-0 w-full h-full pointer-events-none">
            <div class="relative h-full">
              <div class="absolute bottom-0 text-green-600 dark:text-green-400 text-xl font-bold" style="left: {position}%; transform: translateX(-50%)">
                ▼
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-1 text-xs text-green-600 dark:text-green-400 font-semibold">
          Generated: {value}{config.unit}
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-6 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
    <p class="text-sm text-gray-700 dark:text-gray-300">
      <strong>🏆 Maths Treasure (Year 8):</strong> <em>Histograms & Frequency</em> - Histograms show how often each value appears in the dataset. The height of each bar represents how many tracks have that feature value.
    </p>
  </div>
</div>
