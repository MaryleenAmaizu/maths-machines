<script lang="ts">
  import { navigateTo } from '../stores/routerStore'
  import { students, newStudent, kValue, showDistances, predictedGrade, distanceResults } from '../stores/knnStore'
  import type { Student, DistanceResult } from '../stores/knnStore'
  import KNNScatterPlot from '../components/knn/KNNScatterPlot.svelte'
  import KNNDataTable from '../components/knn/KNNDataTable.svelte'
  import KNNCalculator from '../components/knn/KNNCalculator.svelte'
  import KNNTreasures from '../components/knn/KNNTreasures.svelte'
  import KNNConceptExplainer from '../components/knn/KNNConceptExplainer.svelte'

  function calculateDistances() {
    const results: DistanceResult[] = []
    
    $students.forEach(student => {
      const mathsDiff = Math.abs($newStudent.maths - student.maths)
      const englishDiff = Math.abs($newStudent.english - student.english)
      const distance = mathsDiff + englishDiff
      
      results.push({
        student,
        distance,
        isNeighbor: false
      })
    })
    
    // Sort by distance
    results.sort((a, b) => a.distance - b.distance)
    
    // Mark k nearest neighbors
    for (let i = 0; i < Math.min($kValue, results.length); i++) {
      results[i].isNeighbor = true
    }
    
    distanceResults.set(results)
    
    // Calculate prediction
    const neighbors = results.slice(0, $kValue)
    const votes = {
      Excellent: 0,
      Average: 0,
      Poor: 0
    }
    
    neighbors.forEach(n => {
      if (n.student.grade) {
        votes[n.student.grade]++
      }
    })
    
    // Find majority
    let maxVotes = 0
    let prediction: 'Excellent' | 'Average' | 'Poor' | null = null
    
    Object.entries(votes).forEach(([grade, count]) => {
      if (count > maxVotes) {
        maxVotes = count
        prediction = grade as 'Excellent' | 'Average' | 'Poor'
      }
    })
    
    predictedGrade.set(prediction)
    showDistances.set(true)
  }

  function resetPrediction() {
    showDistances.set(false)
    predictedGrade.set(null)
    distanceResults.set([])
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
  <!-- Navigation Bar -->
  <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 py-3 flex items-center gap-4">
      <button
        on:click={() => navigateTo('home')}
        class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition"
      >
        ← Home
      </button>
      <span class="text-gray-400">|</span>
      <span class="text-gray-700 dark:text-gray-300 font-medium">Chapter 3: K-Nearest Neighbours</span>
    </div>
  </nav>

  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Learning from the Neighbours
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Classification by finding the k nearest similar examples
      </p>
    </div>

    <!-- Quick Guide -->
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-8 border-l-4 border-purple-500">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">🎯 How to Use This Simulator</h2>
      <div class="grid md:grid-cols-3 gap-4 text-sm">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="font-bold text-purple-600 dark:text-purple-400 mb-2">1️⃣ Inspect the Data</div>
          <p class="text-gray-700 dark:text-gray-300">Look at the 7 training students in the table. Student 8 needs classification!</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="font-bold text-purple-600 dark:text-purple-400 mb-2">2️⃣ Set k Value</div>
          <p class="text-gray-700 dark:text-gray-300">Choose how many neighbours to check (try k=3). Then click "Calculate Classification".</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="font-bold text-purple-600 dark:text-purple-400 mb-2">3️⃣ See the Result</div>
          <p class="text-gray-700 dark:text-gray-300">Watch distances get calculated, nearest neighbours highlighted, and the majority vote!</p>
        </div>
      </div>
      <div class="mt-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3">
        <p class="text-sm text-purple-900 dark:text-purple-200">
          <strong>Expected outcome:</strong> With k=3, Student 8 (4, 8) should be classified as <strong>Average</strong> - 2 out of 3 neighbours will vote Average!
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <!-- Left Column -->
      <div class="space-y-6">
        <KNNDataTable />
        <KNNScatterPlot />
      </div>
      
      <!-- Right Column -->
      <div class="space-y-6">
        <KNNCalculator {calculateDistances} {resetPrediction} />
      </div>
    </div>

    <!-- Concept Explainer -->
    <KNNConceptExplainer />
  </div>
</div>
