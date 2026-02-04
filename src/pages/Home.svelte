<script lang="ts">
  import { navigateTo } from '../stores/routerStore'
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
  <div class="container mx-auto px-4 py-16 max-w-6xl">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
        Machine Learning Explorer
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Learn how machines learn! Explore interactive simulations of popular machine learning algorithms.
      </p>
    </div>

    <!-- Algorithm Cards -->
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <!-- Linear Regression Card -->
      <button
        on:click={() => navigateTo('linear-regression')}
        class="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-left"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="text-5xl">📈</div>
          <div class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            Simulation 1
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
          Linear Regression
        </h2>
        
        <p class="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-3">
          Training your machine to predict
        </p>
        
        <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          Predict ice cream sales based on temperature using the line of best fit.
        </p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded">Regression</span>
          <span class="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded">Prediction</span>
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
          <div class="text-5xl">🎯</div>
          <div class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
            Simulation 2
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition">
          K-Nearest Neighbors
        </h2>
        
        <p class="text-sm text-green-600 dark:text-green-400 font-semibold mb-3">
          Training your machine to classify
        </p>
        
        <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          Classify students' grades by finding patterns in similar students.
        </p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">Classification</span>
          <span class="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">Pattern</span>
        </div>
        
        <div class="flex items-center text-green-600 dark:text-green-400 font-medium">
          <span>Explore →</span>
        </div>
      </button>

      <!-- Generative Models Card -->
      <button
        on:click={() => navigateTo('generative')}
        class="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-left relative"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="text-5xl">✨</div>
          <div class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
            Simulation 3
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
          Generative Models
        </h2>
        
        <p class="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-3">
          Training your machine to generate
        </p>
        
        <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          Create new content by learning patterns from existing data.
        </p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded">Generation</span>
          <span class="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded">Creation</span>
        </div>
        
        <div class="flex items-center text-purple-600 dark:text-purple-400 font-medium">
          <span>Coming Soon</span>
        </div>
        
        <div class="absolute top-4 right-4 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 px-2 py-1 rounded text-xs font-medium">
          In Development
        </div>
      </button>
    </div>

    <!-- Footer Info -->
    <div class="mt-16 text-center">
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Click on any card to start exploring that algorithm
      </p>
    </div>
  </div>
</div>
