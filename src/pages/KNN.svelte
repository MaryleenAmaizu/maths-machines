<script lang="ts">
  import { navigateTo } from '../stores/routerStore'
  import { students, newStudent, kValue, showDistances, predictedGrade, distanceResults } from '../stores/knnStore'
  import type { Student, DistanceResult } from '../stores/knnStore'
  import KNNScatterPlot from '../components/knn/KNNScatterPlot.svelte'
  import KNNDataTable from '../components/knn/KNNDataTable.svelte'
  import KNNCalculator from '../components/knn/KNNCalculator.svelte'
  import KNNTreasures from '../components/knn/KNNTreasures.svelte'

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
        👥 Learning from the Neighbours
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Show me your neighbors, and I will show you who you are.
      </p>
    </div>

    <!-- Story Section -->
    <div class="bg-amber-50 dark:bg-amber-900/20 rounded-2xl shadow-xl p-6 mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">📖 The Story</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-3">
        When I was a child in primary school, I used to sit between two boys who were always very noisy, even though I was quite quiet. 
        Whenever there was noise in the class, the teacher would come toward us, or the other students would point in our direction. 
        So even though I was quiet, I was often identified as one of the noisy students because of my neighbors.
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        <strong>The nearest neighbor algorithm works similarly:</strong> it guesses where an item belongs based on how close it is to its neighbors. 
        The item will belong to the most dominant group of its neighbours.
      </p>
    </div>

    <!-- Treasures Section -->
    <KNNTreasures />

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
  </div>
</div>
