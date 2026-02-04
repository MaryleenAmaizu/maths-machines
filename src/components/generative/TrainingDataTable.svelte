<script lang="ts">
  export let tracks: Array<{
    name: string
    genre: string
    tempo: number
    energy: number
    danceability: number
    vocals: number
  }>
</script>

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    🎼 Training Library
  </h2>
  
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b-2 border-gray-300 dark:border-gray-600">
          <th class="text-left py-2 px-3 font-bold text-gray-700 dark:text-gray-300">Track Name</th>
          <th class="text-left py-2 px-3 font-bold text-gray-700 dark:text-gray-300">Genre</th>
          <th class="text-center py-2 px-3 font-bold text-gray-700 dark:text-gray-300">Tempo<br/><span class="text-xs font-normal">(BPM)</span></th>
          <th class="text-center py-2 px-3 font-bold text-gray-700 dark:text-gray-300">Energy<br/><span class="text-xs font-normal">(0-10)</span></th>
          <th class="text-center py-2 px-3 font-bold text-gray-700 dark:text-gray-300">Dance<br/><span class="text-xs font-normal">(0-10)</span></th>
          <th class="text-center py-2 px-3 font-bold text-gray-700 dark:text-gray-300">Vocals<br/><span class="text-xs font-normal">(0-10)</span></th>
        </tr>
      </thead>
      <tbody>
        {#each tracks as track}
          <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition {track.genre === 'electronic' ? 'bg-blue-50/30 dark:bg-blue-900/10' : 'bg-orange-50/30 dark:bg-orange-900/10'}">
            <td class="py-3 px-3 font-semibold text-gray-900 dark:text-white">{track.name}</td>
            <td class="py-3 px-3">
              <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium {track.genre === 'electronic' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300'}">
                {track.genre === 'electronic' ? '⚡ Electronic' : '🎤 Hip-Hop'}
              </span>
            </td>
            <td class="py-3 px-3 text-center text-gray-700 dark:text-gray-300">{track.tempo}</td>
            <td class="py-3 px-3 text-center text-gray-700 dark:text-gray-300">{track.energy}</td>
            <td class="py-3 px-3 text-center text-gray-700 dark:text-gray-300">{track.danceability}</td>
            <td class="py-3 px-3 text-center text-gray-700 dark:text-gray-300">{track.vocals}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
