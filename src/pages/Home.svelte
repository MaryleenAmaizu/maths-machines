<script lang="ts">
  import { navigateTo } from '../stores/routerStore'
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
  <!-- Animated background decorations -->
  <div class="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full opacity-20 blur-3xl animate-blob"></div>
  <div class="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
  <div class="absolute bottom-20 left-1/3 w-56 h-56 bg-blue-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000"></div>
  <div class="absolute bottom-40 right-1/4 w-48 h-48 bg-yellow-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-6000"></div>
  
  <div class="container mx-auto px-4 py-16 max-w-6xl relative z-10">
    <!-- Hero Section -->
    <div class="text-center mb-16 animate-fadeIn">
      <div class="mb-6">
        <span class="text-7xl animate-bounce inline-block">🤖</span>
      </div>
      <h1 class="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-6 animate-gradient">
        Machine Learning Explorer!
      </h1>
      <p class="text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-semibold leading-relaxed">
        <span class="text-pink-600 font-black">Learn</span> how machines <span class="text-purple-600 font-black">learn</span>! ✨<br/>
        Explore <span class="text-blue-600 font-black">super cool</span> AI simulations! 🚀
      </p>
    </div>

    <!-- Algorithm Cards -->
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <!-- Linear Regression Card -->
      <button
        on:click={() => navigateTo('linear-regression')}
        class="group bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl shadow-2xl p-1 hover:shadow-pink-500/50 hover:shadow-3xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 text-left"
      >
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 h-full">
          <div class="flex items-center justify-between mb-4">
            <div class="text-6xl transform group-hover:scale-110 transition-transform">🍦</div>
            <div class="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/50 dark:to-purple-900/50 text-pink-700 dark:text-pink-300 rounded-full text-sm font-bold">
              Chapter 1
            </div>
          </div>
          
          <h2 class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-3">
            Ice Cream Predictor!
          </h2>
          
          <p class="text-base text-gray-700 dark:text-gray-300 mb-4 font-semibold">
            🌡️ Predict sales using temperature! Draw the perfect line and become a prediction master! 🎯
          </p>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-3 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs font-bold rounded-full">Prediction</span>
            <span class="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full">y = mx + c</span>
          </div>
          
          <div class="flex items-center text-purple-600 dark:text-purple-400 font-black text-lg">
            <span>Let's Go! →</span>
          </div>
        </div>
      </button>

      <!-- KNN Card -->
      <button
        on:click={() => navigateTo('knn')}
        class="group bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl shadow-2xl p-1 hover:shadow-green-500/50 hover:shadow-3xl transform hover:scale-105 hover:-rotate-1 transition-all duration-300 text-left"
      >
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 h-full">
          <div class="flex items-center justify-between mb-4">
            <div class="text-6xl transform group-hover:scale-110 transition-transform">📚</div>
            <div class="px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/50 dark:to-teal-900/50 text-green-700 dark:text-green-300 rounded-full text-sm font-bold">
              Chapter 2
            </div>
          </div>
          
          <h2 class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-3">
            Grade Predictor!
          </h2>
          
          <p class="text-base text-gray-700 dark:text-gray-300 mb-4 font-semibold">
            🎯 Find study buddies and predict grades! Who are your nearest neighbors? 🤝
          </p>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold rounded-full">Classification</span>
            <span class="px-3 py-1.5 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-bold rounded-full">KNN Magic</span>
          </div>
          
          <div class="flex items-center text-teal-600 dark:text-teal-400 font-black text-lg">
            <span>Let's Go! →</span>
          </div>
        </div>
      </button>

      <!-- Generative Models Card -->
      <button
        on:click={() => navigateTo('generative')}
        class="group bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl p-1 hover:shadow-purple-500/50 hover:shadow-3xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 text-left relative"
      >
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 h-full">
          <div class="flex items-center justify-between mb-4">
            <div class="text-6xl transform group-hover:scale-110 transition-transform">🎵</div>
            <div class="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-bold">
              Chapter 3
            </div>
          </div>
          
          <h2 class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
            AI DJ Creator!
          </h2>
          
          <p class="text-base text-gray-700 dark:text-gray-300 mb-4 font-semibold">
            🎧 Make AI create brand new music! Teach it to be your personal DJ! 🤖✨
          </p>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full">Create</span>
            <span class="px-3 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs font-bold rounded-full">Music AI</span>
          </div>
          
          <div class="flex items-center text-pink-600 dark:text-pink-400 font-black text-lg">
            <span>Let's Go! →</span>
          </div>
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
