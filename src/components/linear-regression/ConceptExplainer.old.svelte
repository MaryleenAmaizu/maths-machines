<script lang="ts">
  export let title = "How Linear Regression Works"
</script>

<div class="bg-gradient-to-br from-gray-50 to-indigo-50/30 dark:from-gray-900 dark:to-gray-800 py-16 px-4 mt-12">
  <div class="max-w-4xl mx-auto">
    
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Deep Dive: Understanding the Details</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">Explore the mathematical foundations behind what you just experienced</p>
    </div>
    
    <!-- What is Linear Regression? -->
    <section class="mb-16">
      <div class="flex items-center gap-4 mb-6">
        <span class="text-3xl">🤔</span>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          What is Linear Regression?
        </h2>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div class="prose dark:prose-invert max-w-none">
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Linear regression is one of the fundamental algorithms in machine learning and statistics. It's a supervised learning method used to predict a continuous numerical output based on one or more input features. The goal is to find the best-fitting straight line through data points that describes the relationship between variables.
            </p>
            <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              In our ice cream shop example, we want to answer: <strong>Given the temperature, how many ice creams will we sell?</strong> Linear regression helps us find a mathematical formula that captures this relationship, allowing us to make predictions for any temperature value.
            </p>
            <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The model learns from historical data (training data) to establish this relationship. Once trained, it can predict sales for temperatures it has never seen before. This is the essence of machine learning: learning patterns from past data to make predictions about the future.
            </p>
          </div>
        </div>
      {/if}
    </section>

    <!-- The Problem -->
    <section class="mb-6">
      <button
        on:click={() => toggleSection('problem')}
        class="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left flex items-center justify-between group"
      >
        <div class="flex items-center gap-4">
          <span class="text-3xl">🎯</span>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
              The Real-World Problem
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Why this matters for business</p>
          </div>
        </div>
        <span class="text-2xl text-gray-400 group-hover:text-indigo-600 transition">
          {isExpanded('problem') ? '▼' : '▶'}
        </span>
      </button>
      
      {#if isExpanded('problem')}
        <div class="mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-fadeIn">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Imagine you run an ice cream shop. You've noticed that sales seem to depend on temperature, but you want to be more precise. You need to:
          </p>
          <ul class="space-y-3 text-gray-700 dark:text-gray-300 mb-6">
            <li class="flex items-start gap-3">
              <span class="text-indigo-600 dark:text-indigo-400 font-bold">1.</span>
              <span><strong>Predict future sales:</strong> Know how much ice cream to stock based on tomorrow's temperature forecast</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-indigo-600 dark:text-indigo-400 font-bold">2.</span>
              <span><strong>Understand the relationship:</strong> Quantify how much sales increase with each degree of temperature</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-indigo-600 dark:text-indigo-400 font-bold">3.</span>
              <span><strong>Make business decisions:</strong> Plan staffing and inventory based on reliable predictions</span>
            </li>
          </ul>
          <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
            <p class="text-blue-900 dark:text-blue-200">
              <strong>Input:</strong> Temperature (°C) → <strong>Output:</strong> Ice Cream Sales (number of units)
            </p>
          </div>
        </div>
      {/if}
    </section>

    <!-- Machine Learning Components -->
    <section class="mb-6">
      <button
        on:click={() => toggleSection('components')}
        class="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left flex items-center justify-between group"
      >
        <div class="flex items-center gap-4">
          <span class="text-3xl">🧩</span>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
              Machine Learning Components
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Data, algorithm, output, and human decisions</p>
          </div>
        </div>
        <span class="text-2xl text-gray-400 group-hover:text-indigo-600 transition">
          {isExpanded('components') ? '▼' : '▶'}
        </span>
      </button>
      
      {#if isExpanded('components')}
        <div class="mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-fadeIn">
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Every machine learning system consists of four key components working together:
          </p>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-t-4 border-blue-500">
              <h3 class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Data (Input)</h3>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Temperature measurements</strong> are our input features. These are the values we know and want to use for prediction.
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                In the simulator above, you can see and edit the training data in the data table.
              </p>
            </div>

            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-t-4 border-purple-500">
              <h3 class="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">Algorithm</h3>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Linear regression</strong> finds the line of best fit using <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">y = mx + c</span>.
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                The model automatically calculates the optimal values for m and c that make the best predictions.
              </p>
            </div>

            <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-t-4 border-green-500">
              <h3 class="text-xl font-bold text-green-600 dark:text-green-400 mb-3">Output</h3>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Ice cream sales predictions</strong> are our output. This is what we're trying to predict.
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Once trained, the model can predict sales for any temperature value.
              </p>
            </div>

            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border-t-4 border-amber-500">
              <h3 class="text-xl font-bold text-amber-600 dark:text-amber-400 mb-3">Humans</h3>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                <strong>We decide</strong> what "good" means by choosing metrics, collecting quality data, and validating predictions.
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                In the simulator, you can manually adjust the line to see how different parameters affect predictions.
              </p>
            </div>
          </div>
        </div>
      {/if}
    </section>

    <!-- The Formula -->
    <section class="mb-6">
      <button
        on:click={() => toggleSection('formula')}
        class="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left flex items-center justify-between group"
      >
        <div class="flex items-center gap-4">
          <span class="text-3xl">🧮</span>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
              The Formula: y = mx + c
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Breaking down the equation</p>
          </div>
        </div>
        <span class="text-2xl text-gray-400 group-hover:text-indigo-600 transition">
          {isExpanded('formula') ? '▼' : '▶'}
        </span>
      </button>
      
      {#if isExpanded('formula')}
        <div class="mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-fadeIn">
          <div class="text-center mb-8">
            <div class="inline-block bg-indigo-100 dark:bg-indigo-900/30 rounded-xl p-6">
              <p class="text-3xl font-mono font-bold text-indigo-600 dark:text-indigo-400">
                y = mx + c
              </p>
            </div>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h4 class="font-bold text-blue-900 dark:text-blue-300 mb-3 text-lg">Variables (What We Know)</h4>
              <div class="space-y-3">
                <div>
                  <span class="font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded">x</span>
                  <span class="text-gray-700 dark:text-gray-300"> = Temperature (°C) - Our input</span>
                </div>
                <div>
                  <span class="font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded">y</span>
                  <span class="text-gray-700 dark:text-gray-300"> = Ice Cream Sales - What we want to predict</span>
                </div>
              </div>
            </div>
            
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h4 class="font-bold text-purple-900 dark:text-purple-300 mb-3 text-lg">Parameters (What Model Learns)</h4>
              <div class="space-y-3">
                <div>
                  <span class="font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded">m</span>
                  <span class="text-gray-700 dark:text-gray-300"> = Gradient - How much sales change per degree</span>
                </div>
                <div>
                  <span class="font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded">c</span>
                  <span class="text-gray-700 dark:text-gray-300"> = Y-intercept - Predicted sales at 0°C</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Example:</strong> If m = 4.5 and c = 10, then at 20°C:
              <br/>
              <span class="font-mono mt-2 block">y = 4.5 × 20 + 10 = 90 + 10 = 100 ice creams</span>
            </p>
            <p class="text-gray-600 dark:text-gray-400 text-sm mt-3">
              This means: for every 1°C increase, we expect to sell 4.5 more ice creams, and even at 0°C, we'd expect to sell 10 ice creams.
            </p>
          </div>
        </div>
      {/if}
    </section>

    <!-- Real World Applications -->
    <section class="mb-6">
      <button
        on:click={() => toggleSection('applications')}
        class="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left flex items-center justify-between group"
      >
        <div class="flex items-center gap-4">
          <span class="text-3xl">🌍</span>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
              Real-World Applications
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Where this is used in practice</p>
          </div>
        </div>
        <span class="text-2xl text-gray-400 group-hover:text-indigo-600 transition">
          {isExpanded('applications') ? '▼' : '▶'}
        </span>
      </button>
      
      {#if isExpanded('applications')}
        <div class="mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-fadeIn">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Linear regression is used everywhere in the real world:
          </p>
          
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <span class="text-2xl">💰</span>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Finance</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Predicting stock prices, analyzing market trends, forecasting revenue</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <span class="text-2xl">🏠</span>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Real Estate</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Estimating house prices based on size, location, and features</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <span class="text-2xl">🌡️</span>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Climate Science</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Predicting temperature changes, analyzing climate trends</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <span class="text-2xl">🏥</span>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Healthcare</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Predicting patient outcomes, analyzing treatment effectiveness</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <span class="text-2xl">📱</span>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Tech & Marketing</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">User growth prediction, ad effectiveness, conversion rate optimization</p>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </section>

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
    animation: fadeIn 0.3s ease-out;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .animate-fadeIn {
      animation: none;
    }
  }
</style>
