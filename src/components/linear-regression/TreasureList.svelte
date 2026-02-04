<script lang="ts">
  export let unlockedCount = 0

  const treasures = [
    { year: 7, name: 'Sequences', icon: '🔢', description: 'Spotting patterns in data', unlockStep: 1 },
    { year: 7, name: 'Algebraic Notation', icon: '🔤', description: 'Turning patterns into rules', unlockStep: 2 },
    { year: 8, name: 'Coordinates', icon: '📍', description: 'Mapping inputs to outputs', unlockStep: 2 },
    { year: 8, name: 'Scatter Graphs', icon: '📊', description: 'Showing relationships', unlockStep: 2 },
    { year: 8, name: 'Line of Best Fit', icon: '📈', description: 'Capturing trends', unlockStep: 3 },
    { year: 9, name: 'Gradient (m)', icon: '📐', description: 'Rate of change', unlockStep: 5 },
    { year: 9, name: 'Y-Intercept (c)', icon: '📍', description: 'Starting point', unlockStep: 5 },
    { year: 9, name: 'Formula y=mx+c', icon: '🎯', description: 'Complete prediction tool', unlockStep: 6 },
  ]
  
  let expandedTreasure: number | null = null
  
  function toggleTreasure(index: number) {
    if (index < unlockedCount) {
      expandedTreasure = expandedTreasure === index ? null : index
    }
  }
  
  $: lockedCount = Math.max(0, treasures.length - unlockedCount)
</script>

<div class="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-2xl shadow-xl p-6 border-2 border-amber-200 dark:border-amber-700">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
      🏆 Maths Treasures
    </h2>
    <div class="bg-amber-100 dark:bg-amber-900 px-4 py-2 rounded-lg">
      <span class="text-sm font-bold text-amber-700 dark:text-amber-300">
        {unlockedCount}/{treasures.length} Unlocked
      </span>
    </div>
  </div>
  
  <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
    Throughout this exploration, you're using powerful maths tools from Years 7, 8, and 9. Click each treasure to see how it helps you!
  </p>

  <div class="space-y-2">
    {#each treasures as treasure, index}
      {@const isUnlocked = index < unlockedCount}
      {@const isExpanded = expandedTreasure === index}
      
      <button
        on:click={() => toggleTreasure(index)}
        disabled={!isUnlocked}
        class="w-full text-left transition-all duration-300 {isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}"
      >
        <div class="flex items-start space-x-3 bg-white dark:bg-gray-800 rounded-lg p-3 {isUnlocked ? 'hover:shadow-md hover:scale-[1.02]' : 'opacity-50'} transition-all">
          <span class="text-2xl {isUnlocked ? '' : 'grayscale'}">{treasure.icon}</span>
          <div class="flex-1">
            <div class="flex items-center space-x-2">
              <span class="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded">
                Year {treasure.year}
              </span>
              <h3 class="font-bold text-gray-800 dark:text-white text-sm">{treasure.name}</h3>
              {#if isUnlocked}
                <span class="text-xs">{isExpanded ? '▼' : '▶'}</span>
              {/if}
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{treasure.description}</p>
            
            {#if isExpanded}
              <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-4">
                {#if treasure.name === 'Sequences'}
                  <div>
                    <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">📊 The Maths:</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      A sequence is an ordered list of numbers where each term follows a pattern. In our data, as temperature increases by regular intervals, sales follow a pattern:
                    </p>
                    <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 font-mono text-xs mb-3">
                      <div>10°C → 45 sales</div>
                      <div>12°C → 50 sales (+5)</div>
                      <div>15°C → 65 sales (+15)</div>
                      <div>18°C → 80 sales (+15)</div>
                      <div>20°C → 90 sales (+10)</div>
                    </div>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Pattern spotted:</strong> As temperature goes up, sales go up too! This is a <em>positive relationship</em>. Recognizing this pattern is the first step in building a prediction model.
                    </p>
                  </div>
                {:else if treasure.name === 'Algebraic Notation'}
                  <div>
                    <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">🔤 The Maths:</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      Algebraic notation uses letters to represent numbers. Instead of saying "some number of sales depends on the temperature", we write:
                    </p>
                    <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 font-mono text-sm mb-3 text-center">
                      <div class="font-bold text-indigo-600 dark:text-indigo-400">y = f(x)</div>
                      <div class="text-xs mt-2 text-gray-600 dark:text-gray-400">where f means "function of"</div>
                    </div>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      In our case: <strong>y (sales)</strong> depends on <strong>x (temperature)</strong>
                    </p>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      This notation is powerful because it's universal - anyone in the world can understand your model, regardless of language!
                    </p>
                  </div>
                {:else if treasure.name === 'Coordinates'}
                  <div>
                    <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">📍 The Maths:</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      A coordinate is a pair of numbers (x, y) that represents a position on a graph. The first number is the horizontal position (x-axis), the second is vertical (y-axis).
                    </p>
                    <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-3">
                      <div class="text-sm font-mono mb-2">Example coordinate: <strong class="text-indigo-600">(15, 65)</strong></div>
                      <ul class="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• x = 15 means "15°C temperature"</li>
                        <li>• y = 65 means "65 ice creams sold"</li>
                        <li>• This point represents one day's observation</li>
                      </ul>
                    </div>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Why pairs?</strong> Because we need <em>both</em> pieces of information to plot the relationship. One number alone tells us nothing!
                    </p>
                  </div>
                {:else if treasure.name === 'Scatter Graphs'}
                  <div>
                    <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">📊 The Maths:</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      A scatter graph plots multiple coordinate points to reveal relationships between two variables. Each point represents one observation.
                    </p>
                    <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-3">
                      <p class="text-sm font-semibold mb-2">Reading scatter graphs:</p>
                      <ul class="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• <strong>Positive correlation:</strong> Points slope upward (↗) - as x increases, y increases</li>
                        <li>• <strong>Negative correlation:</strong> Points slope downward (↘) - as x increases, y decreases</li>
                        <li>• <strong>No correlation:</strong> Points scattered randomly</li>
                      </ul>
                    </div>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      Our ice cream data shows <strong>positive correlation</strong> - the points trend upward. This visual pattern tells us a linear model will work well!
                    </p>
                  </div>
                {:else if treasure.name === 'Line of Best Fit'}
                  <div>
                    <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">📈 The Maths:</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      The line of best fit is the straight line that comes closest to all the points on a scatter graph. It minimizes the total distance from all points to the line.
                    </p>
                    <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-3">
                      <p class="text-sm font-semibold mb-2">Mathematical goal:</p>
                      <p class="text-xs text-gray-700 dark:text-gray-300 mb-2">
                        Minimize: Σ(actual - predicted)²
                      </p>
                      <p class="text-xs text-gray-600 dark:text-gray-400">
                        This means: add up the squared differences between real sales and predicted sales, and make this sum as small as possible.
                      </p>
                    </div>
                    <div class="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3">
                      <p class="text-xs text-gray-700 dark:text-gray-300">
                        <strong>Why "best"?</strong> It's not perfect for any single point, but it's the most accurate for <em>all</em> points combined. This is the core of machine learning - finding the model that works best overall!
                      </p>
                    </div>
                  </div>
                {:else if treasure.name === 'Gradient (m)'}
                  <div>
                    <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">📐 The Maths:</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      The gradient (or slope) measures how steep the line is. It's calculated as "rise over run" - how much y changes when x increases by 1.
                    </p>
                    <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-3">
                      <p class="text-sm font-mono font-bold text-center mb-3 text-indigo-600">m = (y₂ - y₁) / (x₂ - x₁)</p>
                      <p class="text-xs text-gray-700 dark:text-gray-300 mb-2">Example using two points:</p>
                      <div class="font-mono text-xs space-y-1">
                        <div>Point 1: (15°C, 65 sales)</div>
                        <div>Point 2: (18°C, 80 sales)</div>
                        <div class="text-indigo-600 mt-2">m = (80 - 65) / (18 - 15) = 15 / 3 = 5</div>
                      </div>
                    </div>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Interpretation:</strong> m = 5 means "for every 1°C increase in temperature, we sell 5 more ice creams." This is your model's prediction rate!
                    </p>
                  </div>
                {:else if treasure.name === 'Y-Intercept (c)'}
                  <div>
                    <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">📍 The Maths:</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      The y-intercept is where the line crosses the y-axis. Mathematically, it's the value of y when x = 0.
                    </p>
                    <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-3">
                      <p class="text-sm font-semibold mb-2">Finding c:</p>
                      <div class="font-mono text-xs space-y-1">
                        <div>Start with: y = mx + c</div>
                        <div>Use a known point, e.g., (15, 65) and m = 5:</div>
                        <div class="text-indigo-600">65 = 5(15) + c</div>
                        <div class="text-indigo-600">65 = 75 + c</div>
                        <div class="text-indigo-600 font-bold">c = 65 - 75 = -10</div>
                      </div>
                    </div>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <strong>Interpretation:</strong> c = -10 means at 0°C, we'd predict -10 sales (which doesn't make sense in reality - you can't sell negative ice creams!)
                    </p>
                    <p class="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 rounded p-2">
                      <strong>Real-world note:</strong> Models have limits! Our formula works well for 10-25°C, but breaks down outside this range. This is why understanding the context matters.
                    </p>
                  </div>
                {:else if treasure.name === 'Formula y=mx+c'}
                  <div>
                    <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">🎯 The Complete Maths:</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      This is the equation of a straight line - one of the most important formulas in mathematics. It combines everything you've learned:
                    </p>
                    <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-3">
                      <p class="text-2xl font-mono font-bold text-center mb-4 text-indigo-600">y = mx + c</p>
                      <div class="grid grid-cols-2 gap-3 text-xs">
                        <div class="bg-white dark:bg-gray-800 p-2 rounded">
                          <strong>y</strong> = predicted output (sales)
                        </div>
                        <div class="bg-white dark:bg-gray-800 p-2 rounded">
                          <strong>m</strong> = rate of change (gradient)
                        </div>
                        <div class="bg-white dark:bg-gray-800 p-2 rounded">
                          <strong>x</strong> = input value (temperature)
                        </div>
                        <div class="bg-white dark:bg-gray-800 p-2 rounded">
                          <strong>c</strong> = starting value (y-intercept)
                        </div>
                      </div>
                    </div>
                    <div class="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 mb-3">
                      <p class="text-sm font-semibold mb-2">Full prediction example:</p>
                      <div class="font-mono text-xs space-y-1">
                        <div>Given: m = 4.8, c = 5.2</div>
                        <div>Question: What if temperature = 16°C?</div>
                        <div class="mt-2 text-indigo-600">y = 4.8 × 16 + 5.2</div>
                        <div class="text-indigo-600">y = 76.8 + 5.2</div>
                        <div class="text-green-600 font-bold text-sm">y = 82 ice creams</div>
                      </div>
                    </div>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      <strong>This is your ML model!</strong> With just two numbers (m and c), you can predict sales for any temperature. That's the power of linear regression - it learns these two magic numbers from data.
                    </p>
                    <div class="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                      <p class="text-xs text-gray-700 dark:text-gray-300">
                        <strong>Beyond ice cream:</strong> This same formula predicts house prices, stock values, exam scores, and countless other things. You've just learned one of the foundational algorithms of AI!
                      </p>
                    </div>
                  </div>
                {/if}
              </div>
            {/if}
          </div>
          <span class="text-xl">
            {#if isUnlocked}
              ✓
            {:else}
              🔒
            {/if}
          </span>
        </div>
      </button>
    {/each}
  </div>

  {#if lockedCount > 0}
    <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        🔓 Complete more steps to unlock {lockedCount} more treasure{lockedCount > 1 ? 's' : ''}!
      </p>
    </div>
  {:else}
    <div class="mt-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-lg text-center">
      <p class="text-sm text-gray-700 dark:text-gray-300">
        <strong>All treasures unlocked!</strong> These concepts work together to turn patterns into predictions! 🎉
      </p>
    </div>
  {/if}
</div>
