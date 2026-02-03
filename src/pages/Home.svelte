<script lang="ts">
  import { navigateTo } from '../stores/routerStore'
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
  <div class="container mx-auto px-4 py-16 max-w-6xl">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
        🎓 Machine Learning Explorer
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Learn how machines learn! Explore interactive simulations of popular machine learning algorithms.
      </p>
    </div>

    <!-- Algorithm Cards -->
    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <!-- Linear Regression Card -->
      <button
        on:click={() => navigateTo('linear-regression')}
        class="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-left"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="text-5xl">📈</div>
          <div class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            Chapter 2
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
          Linear Regression
        </h2>
        
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Predict ice cream sales based on temperature! Learn how to find the line of best fit using the formula y = mx + c.
        </p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded">Gradient</span>
          <span class="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded">Y-Intercept</span>
          <span class="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded">Least Squares</span>
        </div>
        
        <div class="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
          <span>Explore →</span>
        </div>
      </button>

      <!-- KNN Card -->
      <button
        on:click={() => navigateTo('knn')}
        class="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-left"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="text-5xl">👥</div>
          <div class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
            Chapter 3
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition">
          K-Nearest Neighbours
        </h2>
        
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Learn from your neighbours! Classify students' grades by looking at the closest similar students.
        </p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">Classification</span>
          <span class="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">Distance</span>
          <span class="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">Voting</span>
        </div>
        
        <div class="flex items-center text-green-600 dark:text-green-400 font-medium">
          <span>Explore →</span>
        </div>
      </button>
    </div>

    <!-- Footer Info -->
    <div class="mt-16 text-center">
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        💡 Click on any card to start exploring that algorithm
      </p>
    </div>
  </div>
</div>
