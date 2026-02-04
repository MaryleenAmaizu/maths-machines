<script lang="ts">
  import { navigateTo } from '../stores/routerStore'
  import Header from '../components/common/Header.svelte'
  import TrainingDataTable from '../components/generative/TrainingDataTable.svelte'
  import GenreSelector from '../components/generative/GenreSelector.svelte'
  import GeneratedTrack from '../components/generative/GeneratedTrack.svelte'
  import FeatureDistribution from '../components/generative/FeatureDistribution.svelte'
  import GenerativeConceptExplainer from '../components/generative/GenerativeConceptExplainer.svelte'
  import type { Track, GenreStats, Distribution } from '../components/generative/types'

  // Sample tracks dataset
  let tracks: Track[] = [
    { name: 'Electric Dreams', genre: 'electronic', tempo: 128, energy: 9, danceability: 8, vocals: 3 },
    { name: 'Neon Pulse', genre: 'electronic', tempo: 132, energy: 8, danceability: 9, vocals: 2 },
    { name: 'Synth Wave', genre: 'electronic', tempo: 125, energy: 7, danceability: 8, vocals: 4 },
    { name: 'Urban Flow', genre: 'hiphop', tempo: 95, energy: 7, danceability: 7, vocals: 9 },
    { name: 'Street Beats', genre: 'hiphop', tempo: 90, energy: 6, danceability: 6, vocals: 8 },
    { name: 'Rhythm Talk', genre: 'hiphop', tempo: 88, energy: 5, danceability: 7, vocals: 9 },
  ]

  let selectedGenre: 'electronic' | 'hiphop' | null = null
  let generatedTrack: Track | null = null
  let showExplanation = false

  // Calculate stats for each genre
  function calculateGenreStats(genre: string): GenreStats {
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
    const newTrack: Track = {
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
  function getDistribution(genre: string, feature: keyof Track): Distribution {
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

<div class="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
  <!-- Decorative elements -->
  <div class="absolute top-10 left-20 w-40 h-40 bg-purple-300 rounded-full opacity-20 blur-3xl animate-blob"></div>
  <div class="absolute bottom-20 right-10 w-36 h-36 bg-pink-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
  <div class="absolute top-1/3 left-1/2 w-32 h-32 bg-orange-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000"></div>
  
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
    <div class="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl shadow-2xl p-1 mb-8 transform hover:scale-[1.01] transition-transform">
      <div class="bg-white dark:bg-gray-800 rounded-3xl p-8">
        <h1 class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 mb-4 animate-gradient">
          🎵 Your Personal DJ! 🎧
        </h1>
        <p class="text-xl text-gray-700 dark:text-gray-300 font-semibold">
          Can a computer <span class="text-pink-600 font-bold">CREATE</span> brand new music? Let's make an AI DJ! 🤖✨
        </p>
      </div>
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
      <TrainingDataTable {tracks} />

      <!-- Right: Generator -->
      <div class="space-y-6">
        <!-- Genre Selection -->
        <GenreSelector 
          bind:selectedGenre 
          stats={selectedGenre ? calculateGenreStats(selectedGenre) : null}
          onGenerate={generateTrack}
        />

        <!-- Generated Track Display -->
        {#if generatedTrack}
          <GeneratedTrack track={generatedTrack} />

          <!-- Distribution Histograms -->
          <FeatureDistribution track={generatedTrack} {getDistribution} />
        {/if}
      </div>
    </div>

    <!-- Detailed Explainer -->
    <GenerativeConceptExplainer />
  </div>
</div>