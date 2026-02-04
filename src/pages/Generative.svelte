<script lang="ts">
  import { navigateTo } from '../stores/routerStore'
  import Header from '../components/Header.svelte'

  // Sample tracks dataset
  let tracks = [
    { name: 'Electric Dreams', genre: 'electronic', tempo: 128, energy: 9, danceability: 8, vocals: 3 },
    { name: 'Neon Pulse', genre: 'electronic', tempo: 132, energy: 8, danceability: 9, vocals: 2 },
    { name: 'Synth Wave', genre: 'electronic', tempo: 125, energy: 7, danceability: 8, vocals: 4 },
    { name: 'Urban Flow', genre: 'hiphop', tempo: 95, energy: 7, danceability: 7, vocals: 9 },
    { name: 'Street Beats', genre: 'hiphop', tempo: 90, energy: 6, danceability: 6, vocals: 8 },
    { name: 'Rhythm Talk', genre: 'hiphop', tempo: 88, energy: 5, danceability: 7, vocals: 9 },
  ]

  let selectedGenre: 'electronic' | 'hiphop' | null = null
  let generatedTrack: any = null
  let showExplanation = false

  // Calculate stats for each genre
  function calculateGenreStats(genre: string) {
    const genreTracks = tracks.filter(t => t.genre === genre)
    
    const tempos = genreTracks.map(t => t.tempo)
    const energies = genreTracks.map(t => t.energy)
    const danceabilities = genreTracks.map(t => t.danceability)
    const vocals = genreTracks.map(t => t.vocals)
    
    return {
      tempo: {
        avg: tempos.reduce((a, b) => a + b, 0) / tempos.length,
        min: Math.min(...tempos),
        max: Math.max(...tempos)
      },
      energy: {
        avg: energies.reduce((a, b) => a + b, 0) / energies.length,
        min: Math.min(...energies),
        max: Math.max(...energies)
      },
      danceability: {
        avg: danceabilities.reduce((a, b) => a + b, 0) / danceabilities.length,
        min: Math.min(...danceabilities),
        max: Math.max(...danceabilities)
      },
      vocals: {
        avg: vocals.reduce((a, b) => a + b, 0) / vocals.length,
        min: Math.min(...vocals),
        max: Math.max(...vocals)
      }
    }
  }

  function generateTrack() {
    if (!selectedGenre) return
    
    const stats = calculateGenreStats(selectedGenre)
    
    // Generate random values within learned ranges
    const newTrack = {
      name: selectedGenre === 'electronic' ? 'AI Pulse' : 'Flow Machine',
      genre: selectedGenre,
      tempo: Math.round(stats.tempo.min + Math.random() * (stats.tempo.max - stats.tempo.min)),
      energy: Math.round(stats.energy.min + Math.random() * (stats.energy.max - stats.energy.min)),
      danceability: Math.round(stats.danceability.min + Math.random() * (stats.danceability.max - stats.danceability.min)),
      vocals: Math.round(stats.vocals.min + Math.random() * (stats.vocals.max - stats.vocals.min))
    }
    
    generatedTrack = newTrack
    showExplanation = true
  }

  // Get distribution data for a specific feature
  function getDistribution(genre: string, feature: keyof typeof tracks[0]) {
    const genreTracks = tracks.filter(t => t.genre === genre)
    const values = genreTracks.map(t => t[feature] as number)
    const min = Math.min(...values)
    const max = Math.max(...values)
    
    // Create histogram bins
    const bins: {[key: number]: number} = {}
    values.forEach(v => {
      bins[v] = (bins[v] || 0) + 1
    })
    
    return { values, min, max, bins }
  }

  $: electronicStats = calculateGenreStats('electronic')
  $: hiphopStats = calculateGenreStats('hiphop')
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
  <Header />
  
  <!-- Navigation -->
  <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 py-3 flex items-center gap-3 text-sm">
      <button 
        on:click={() => navigateTo('home')}
        class="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
      >
        ← Home
      </button>
      <span class="text-gray-400">|</span>
      <span class="text-gray-700 dark:text-gray-300 font-medium">Chapter 3: Generative Models</span>
    </div>
  </nav>

  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-3">
        🎵 Your Personal DJ!
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Can a computer create brand new music? Let's teach it to remix tracks by learning patterns from your favorite genres.
      </p>
    </div>

    <!-- Quick Guide -->
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl shadow-lg p-6 mb-8 border-2 border-purple-300 dark:border-purple-600">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 How It Works:</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="flex items-start gap-3">
          <div class="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Pick a Genre</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Choose Electronic or Hip-Hop</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Learn Patterns</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">See average tempo, energy, and style</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Generate Track</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Create new music within the style</p>
          </div>
        </div>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
        <strong>Expected outcome:</strong> The AI creates a brand new track that sounds like it belongs to your chosen genre, but isn't a copy of any existing track!
      </p>
    </div>

    <!-- Main Simulator -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Left: Training Data -->
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
              {#each tracks as track, i}
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

      <!-- Right: Generator -->
      <div class="space-y-6">
        <!-- Genre Selection -->
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

          {#if selectedGenre}
            {@const stats = selectedGenre === 'electronic' ? electronicStats : hiphopStats}
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
              on:click={generateTrack}
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

        <!-- Generated Track Display -->
        {#if generatedTrack}
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl shadow-xl p-6 border-4 border-green-400 dark:border-green-600 animate-fadeIn">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-4xl">🎵</span>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">{generatedTrack.name}</h3>
                <div class="text-sm text-gray-600 dark:text-gray-400">AI-Generated {generatedTrack.genre === 'electronic' ? 'Electronic' : 'Hip-Hop'} Track</div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Tempo</div>
                  <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{generatedTrack.tempo}</div>
                  <div class="text-xs text-gray-500">BPM</div>
                </div>
                <div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Energy</div>
                  <div class="text-2xl font-bold text-green-600 dark:text-green-400">{generatedTrack.energy}</div>
                  <div class="text-xs text-gray-500">out of 10</div>
                </div>
                <div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Danceability</div>
                  <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{generatedTrack.danceability}</div>
                  <div class="text-xs text-gray-500">out of 10</div>
                </div>
                <div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Vocals</div>
                  <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">{generatedTrack.vocals}</div>
                  <div class="text-xs text-gray-500">out of 10</div>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
              <p class="text-sm text-gray-700 dark:text-gray-300">
                ✅ <strong>This track fits the {generatedTrack.genre === 'electronic' ? 'Electronic' : 'Hip-Hop'} pattern!</strong>
                All features are within the learned ranges, but it's completely new—not a copy of any existing track.
              </p>
            </div>
          </div>

          <!-- Distribution Histograms -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              📊 Feature Distribution Analysis
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
              See where your generated track falls within the {generatedTrack.genre === 'electronic' ? 'Electronic' : 'Hip-Hop'} genre distribution. The <span class="text-green-600 dark:text-green-400 font-bold">green marker ▼</span> shows your AI track's value.
            </p>

            <div class="space-y-6">
              {#each ['tempo', 'energy', 'danceability', 'vocals'] as feature}
                {@const dist = getDistribution(generatedTrack.genre, feature)}
                {@const colors = {
                  tempo: { bar: 'bg-indigo-400 dark:bg-indigo-500', text: 'text-indigo-600 dark:text-indigo-400', label: 'Tempo Distribution (BPM)', unit: 'BPM', value: generatedTrack.tempo },
                  energy: { bar: 'bg-green-400 dark:bg-green-500', text: 'text-green-600 dark:text-green-400', label: 'Energy Distribution (0-10)', unit: '/10', value: generatedTrack.energy },
                  danceability: { bar: 'bg-purple-400 dark:bg-purple-500', text: 'text-purple-600 dark:text-purple-400', label: 'Danceability Distribution (0-10)', unit: '/10', value: generatedTrack.danceability },
                  vocals: { bar: 'bg-pink-400 dark:bg-pink-500', text: 'text-pink-600 dark:text-pink-400', label: 'Vocals Distribution (0-10)', unit: '/10', value: generatedTrack.vocals }
                }}
                {@const config = colors[feature]}
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="font-semibold {config.text}">{config.label}</h3>
                    <span class="text-xs text-gray-500">Range: {dist.min} - {dist.max}</span>
                  </div>
                  <div class="relative h-24 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                    <div class="flex items-end justify-around h-full">
                      {#each Array.from({length: dist.max - dist.min + 1}, (_, i) => dist.min + i) as value}
                        {@const count = dist.bins[value] || 0}
                        {@const maxCount = Math.max(...Object.values(dist.bins))}
                        {@const height = count > 0 ? (count / maxCount) * 100 : 0}
                        <div class="flex flex-col items-center flex-1">
                          <div 
                            class="w-full {config.bar} rounded-t transition-all"
                            style="height: {height}%"
                            title="{feature === 'tempo' ? value + ' BPM' : feature.charAt(0).toUpperCase() + feature.slice(1) + ' ' + value}: {count} track(s)"
                          ></div>
                          {#if count > 0}
                            <span class="text-[10px] text-gray-600 dark:text-gray-400 mt-1">{value}</span>
                          {/if}
                        </div>
                      {/each}
                    </div>
                    <!-- Generated value marker -->
                    {@const position = ((config.value - dist.min) / (dist.max - dist.min)) * 100}
                    <div class="absolute bottom-0 left-0 w-full h-full pointer-events-none">
                      <div class="relative h-full">
                        <div class="absolute bottom-0 text-green-600 dark:text-green-400 text-xl font-bold" style="left: {position}%; transform: translateX(-50%)">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-center mt-1 text-xs text-green-600 dark:text-green-400 font-semibold">
                    Generated: {config.value}{config.unit}
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
        {/if}
      </div>
    </div>

    <!-- Detailed Explainer -->
    <div class="bg-gradient-to-br from-gray-50 to-indigo-50/30 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl p-8 mt-12">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          🧠 How Machines Learn to Create Music
        </h2>

        <div class="prose dark:prose-invert max-w-none space-y-8">
          <!-- Introduction -->
          <div>
            <h3 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">The Problem</h3>
            <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              You want to create your own Personal DJ app that can generate brand new music tracks. But how can a computer create something it's never heard before?
            </p>
            <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The answer: <strong>Generative Models</strong>. These AI systems learn patterns from existing tracks, then create new music that fits those patterns—without copying!
            </p>
          </div>

          <!-- Step 1: Collect Training Data -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">1</div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Collect Training Tracks</h3>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              First, we gather examples of different music genres. Each track has measurable features:
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li><strong>Tempo:</strong> How fast the beat is (measured in BPM - beats per minute)</li>
              <li><strong>Energy:</strong> How intense and exciting the track feels (0-10 scale)</li>
              <li><strong>Danceability:</strong> How easy it is to dance to (0-10 scale)</li>
              <li><strong>Vocals:</strong> How much singing/rapping is in the track (0-10 scale)</li>
            </ul>
            <div class="mt-4 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <strong>🏆 Maths Treasure (Year 7):</strong> <em>Measurement & Units</em> - Using scales and units (BPM, 0-10 ratings) to describe real-world properties.
              </p>
            </div>
          </div>

          <!-- Step 2: Find Patterns -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">2</div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Calculate Averages (Mean)</h3>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              For each genre, we calculate the <strong>average (mean)</strong> of each feature. This tells us what a "typical" Electronic or Hip-Hop track sounds like.
            </p>
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              <p class="text-sm font-semibold mb-2">Example: Electronic Tempo Average</p>
              <div class="font-mono text-sm space-y-1">
                <div>Tracks: 128 BPM, 132 BPM, 125 BPM</div>
                <div class="text-indigo-600 dark:text-indigo-400">Average = (128 + 132 + 125) ÷ 3</div>
                <div class="text-indigo-600 dark:text-indigo-400">Average = 385 ÷ 3</div>
                <div class="text-green-600 dark:text-green-400 font-bold">Average = 128.3 BPM</div>
              </div>
            </div>
            <div class="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <strong>🏆 Maths Treasure (Year 8):</strong> <em>Averages (Mean)</em> - The mean gives us the "center" of the data, showing typical values for each genre.
              </p>
            </div>
          </div>

          <!-- Step 3: Calculate Range -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">3</div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Calculate Range (Variation)</h3>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              The <strong>range</strong> tells us how much variation exists within a genre. This is crucial—without variation, every generated track would be identical!
            </p>
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 mb-4">
              <p class="text-sm font-semibold mb-2">Example: Electronic Tempo Range</p>
              <div class="font-mono text-sm space-y-1">
                <div>Tracks: 128 BPM, 132 BPM, 125 BPM</div>
                <div class="text-purple-600 dark:text-purple-400">Range = Maximum - Minimum</div>
                <div class="text-purple-600 dark:text-purple-400">Range = 132 - 125</div>
                <div class="text-green-600 dark:text-green-400 font-bold">Range = 7 BPM</div>
                <div class="text-xs text-gray-600 dark:text-gray-400 mt-2">So tempos vary from 125 to 132 BPM</div>
              </div>
            </div>
            <div class="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <strong>🏆 Maths Treasure (Year 7):</strong> <em>Range</em> - Range = Max - Min. It shows how spread out the data is.
              </p>
            </div>
          </div>

          <!-- Step 4: Generate New Track -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">4</div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Generate with Randomness</h3>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Now the magic happens! For each feature, we pick a <strong>random value within the learned range</strong>:
            </p>
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
              <p class="text-sm font-semibold mb-2">Generating "AI Pulse" (Electronic Track):</p>
              <div class="space-y-3 text-sm">
                <div>
                  <div class="font-semibold">Tempo:</div>
                  <div class="font-mono text-xs">Range: 125-132 BPM → Pick random value → <span class="text-green-600 font-bold">129 BPM</span></div>
                </div>
                <div>
                  <div class="font-semibold">Energy:</div>
                  <div class="font-mono text-xs">Range: 7-9 → Pick random value → <span class="text-green-600 font-bold">8</span></div>
                </div>
                <div>
                  <div class="font-semibold">Danceability:</div>
                  <div class="font-mono text-xs">Range: 8-9 → Pick random value → <span class="text-green-600 font-bold">9</span></div>
                </div>
                <div>
                  <div class="font-semibold">Vocals:</div>
                  <div class="font-mono text-xs">Range: 2-4 → Pick random value → <span class="text-green-600 font-bold">3</span></div>
                </div>
              </div>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Result: <strong>AI Pulse</strong> (129 BPM, Energy 8, Dance 9, Vocals 3)
            </p>
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <strong>✅ Check:</strong> All values fit within Electronic ranges, but this exact combination never existed before. We've created something new!
              </p>
            </div>
            <div class="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <strong>🏆 Maths Treasure (Year 9):</strong> <em>Probability & Randomness</em> - Random selection within ranges creates realistic variation.
              </p>
            </div>
          </div>

          <!-- Step 5: Verify Realism -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">5</div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Verify It Fits the Pattern</h3>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              To check if our generated track is realistic, we compare it to the training data:
            </p>
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">Electronic Characteristics:</h4>
                <ul class="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• Fast tempo (125-132 BPM) ✓</li>
                  <li>• High energy (7-9) ✓</li>
                  <li>• Very danceable (8-9) ✓</li>
                  <li>• Minimal vocals (2-4) ✓</li>
                </ul>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-orange-900 dark:text-orange-300 mb-2">Hip-Hop Characteristics:</h4>
                <ul class="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• Slower tempo (88-95 BPM)</li>
                  <li>• Moderate energy (5-7)</li>
                  <li>• Danceable (6-7)</li>
                  <li>• Heavy vocals (8-9)</li>
                </ul>
              </div>
            </div>
            <p class="text-gray-700 dark:text-gray-300">
              Our generated "AI Pulse" matches all Electronic characteristics but none of Hip-Hop's. It's clearly in the right genre!
            </p>
          </div>

          <!-- Real-World Applications -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border-2 border-purple-300 dark:border-purple-600">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">🌍 Real-World Applications</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Generative models power many creative AI systems today:
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-2xl mb-2">🎵</div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Music Production</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Spotify, Apple Music, and YouTube use AI to generate recommended playlists and even create background music.</p>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-2xl mb-2">🎨</div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">AI Art</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Tools like DALL-E and Midjourney generate images by learning patterns from millions of photos.</p>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-2xl mb-2">✍️</div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Text Generation</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">ChatGPT and similar AI learn patterns from text to generate human-like responses.</p>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-2xl mb-2">🎮</div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Game Design</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Video games use generative AI to create levels, characters, and even storylines dynamically.</p>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-6 border-l-4 border-indigo-600">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">✨ What We've Learned</h3>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• <strong>Generative models</strong> learn patterns (averages and ranges) from training data</li>
              <li>• They use <strong>randomness within learned ranges</strong> to create new, unique examples</li>
              <li>• The machine doesn't copy—it <strong>invents</strong> data that fits the rules it learned</li>
              <li>• This is how AI creates music, art, text, and game content!</li>
            </ul>
          </div>

          <!-- Maths Treasures Summary -->
          <div class="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border-2 border-amber-300 dark:border-amber-600">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🏆 Maths Treasures Collected</h3>
            <div class="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Year 7</div>
                <ul class="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>✓ Measurement & Units</li>
                  <li>✓ Range (Max - Min)</li>
                  <li>✓ Comparing Numbers</li>
                </ul>
              </div>
              <div>
                <div class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Year 8</div>
                <ul class="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>✓ Averages (Mean)</li>
                  <li>✓ Interpreting Data</li>
                  <li>✓ Fractions & Decimals</li>
                </ul>
              </div>
              <div>
                <div class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Year 9</div>
                <ul class="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>✓ Probability</li>
                  <li>✓ Randomness</li>
                  <li>✓ Statistical Analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
