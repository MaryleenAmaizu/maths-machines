<script lang="ts">
  export let title = "How K-Nearest Neighbours Works"
</script>

<div class="bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-900 dark:to-gray-800 py-16 px-4 mt-12">
  <div class="max-w-4xl mx-auto">
    
    <!-- What is Nearest Neighbour? -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">What is the Nearest Neighbour Algorithm?</h2>
      
      <div class="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-8 mb-8 border-l-4 border-indigo-500">
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic mb-4">
          "When I was a child in primary school, I used to sit between two boys who were always very noisy, even though I was quite quiet. Whenever there was noise in the class, the teacher would come toward us, or the other students would point in our direction. So even though I was quiet, I was often identified as one of the noisy students because of my neighbors."
        </p>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          I was being identified with the behavior of the people closest to me. This is similar to the saying, <strong>"birds of a feather flock together."</strong>
        </p>
      </div>

      <div class="prose dark:prose-invert max-w-none">
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The nearest neighbor algorithm works in a similar way: <strong>it guesses where an item belongs based on how close it is to its neighbors.</strong> The item will belong to the most dominant group of its neighbours.
        </p>
        
        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 my-6">
          <p class="text-gray-700 dark:text-gray-300 font-semibold mb-3">In my case, if anyone were to ask: "Is Mary noisy?" using k = 2 (checking her two nearest neighbors):</p>
          <ul class="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Neighbor 1: noisy</li>
            <li>• Neighbor 2: noisy</li>
          </ul>
          <p class="text-purple-900 dark:text-purple-300 font-bold mt-3">→ Mary would be said to be noisy as well.</p>
        </div>

        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 border-l-4 border-amber-500">
          <p class="text-amber-900 dark:text-amber-200 font-semibold">
            💡 Free advice from k-nearest neighbour: <span class="italic">"Next time, make sure you surround yourself with people you want to resemble. Show me your neighbors, and I will show you who you are."</span>
          </p>
        </div>
      </div>
    </section>

    <!-- The Problem -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Problem We're Solving</h2>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          When we classify things in the real world, it means we are trying to <strong>sort them into groups</strong> based on what they are.
        </p>
        
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
          <h3 class="font-bold text-blue-900 dark:text-blue-300 mb-3">Real-World Examples of Classification:</h3>
          <ul class="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Balls in PE labelled by colour or size</li>
            <li>• Ingredients in a kitchen labelled so you know where they belong</li>
            <li>• Books, folders, and trays at school</li>
            <li>• Sports teams sorted by ability</li>
          </ul>
        </div>

        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>Machines also learn to classify objects</strong> into their various groups using a method called classification. Classification algorithms tell the machine exactly how to do the sorting.
        </p>

        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
          <h3 class="font-bold text-purple-900 dark:text-purple-300 mb-3">Our Specific Problem:</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Imagine you are the teacher and you have realised <strong>Student 8's grade is missing.</strong> The test scores are out of 10. You have asked other teachers for the marking scheme to know what range is Excellent, Average and Poor but they do not know. They only gave you a list of other students who have previously been graded.
          </p>
          <p class="text-purple-900 dark:text-purple-200 font-semibold">
            Your task: Grade Student 8 based on their scores in Maths and English.
          </p>
        </div>
      </div>

      <!-- The Data -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Data</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border dark:border-gray-600 px-4 py-2 text-left">Student</th>
                <th class="border dark:border-gray-600 px-4 py-2 text-center">Maths</th>
                <th class="border dark:border-gray-600 px-4 py-2 text-center">English</th>
                <th class="border dark:border-gray-600 px-4 py-2 text-center">Grade</th>
              </tr>
            </thead>
            <tbody class="text-gray-700 dark:text-gray-300">
              <tr>
                <td class="border dark:border-gray-600 px-4 py-2">1</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">9</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">8</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center bg-green-100 dark:bg-green-900/30 font-semibold">Excellent</td>
              </tr>
              <tr>
                <td class="border dark:border-gray-600 px-4 py-2">2</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">8</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">8</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center bg-green-100 dark:bg-green-900/30 font-semibold">Excellent</td>
              </tr>
              <tr>
                <td class="border dark:border-gray-600 px-4 py-2">3</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">7</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">6</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center bg-blue-100 dark:bg-blue-900/30 font-semibold">Average</td>
              </tr>
              <tr>
                <td class="border dark:border-gray-600 px-4 py-2">4</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">6</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">6</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center bg-blue-100 dark:bg-blue-900/30 font-semibold">Average</td>
              </tr>
              <tr>
                <td class="border dark:border-gray-600 px-4 py-2">5</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">5</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">5</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center bg-blue-100 dark:bg-blue-900/30 font-semibold">Average</td>
              </tr>
              <tr>
                <td class="border dark:border-gray-600 px-4 py-2">6</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">4</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">3</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center bg-red-100 dark:bg-red-900/30 font-semibold">Poor</td>
              </tr>
              <tr>
                <td class="border dark:border-gray-600 px-4 py-2">7</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">3</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center">4</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center bg-red-100 dark:bg-red-900/30 font-semibold">Poor</td>
              </tr>
              <tr class="bg-yellow-50 dark:bg-yellow-900/20">
                <td class="border dark:border-gray-600 px-4 py-2 font-bold">8</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center font-bold">4</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center font-bold">8</td>
                <td class="border dark:border-gray-600 px-4 py-2 text-center font-bold text-purple-600">??</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
          <p class="font-semibold text-amber-900 dark:text-amber-200 mb-3">🧩 Activity: Understand the Data</p>
          <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li><strong>How many examples do you have?</strong> → 7 (Students 1-7 have known grades)</li>
            <li><strong>How many features do we have?</strong> → 2 (Maths score and English score)</li>
            <li><strong>How many unique labels do we have?</strong> → 3 (Excellent, Average, Poor)</li>
            <li><strong>Why isn't Student 8 an example?</strong> → Their label is unknown - they're the sample we want to predict!</li>
          </ul>
        </div>

        <div class="mt-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
          <p class="font-semibold text-purple-900 dark:text-purple-200 mb-3">🧩 Activity: Make Your Guess</p>
          <p class="text-gray-700 dark:text-gray-300 text-sm mb-2">
            Looking at Student 8's scores (Maths: 4, English: 8), would you grade them as Excellent, Average, or Poor?
          </p>
          <p class="text-gray-700 dark:text-gray-300 text-sm italic">
            It's a bit tricky, isn't it? The score 8 looks high, and score 4 looks low. So, where do we put them?
          </p>
          <p class="text-purple-900 dark:text-purple-200 font-semibold text-sm mt-3">
            This is where machines come to the rescue! This is the heart of classification: <strong>using what you already know to label something new.</strong>
          </p>
        </div>
      </div>
    </section>

    <!-- Classification vs Regression -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Classification vs Regression</h2>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border-2 border-indigo-200 dark:border-indigo-700">
            <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Linear Regression (Chapter 2)</h3>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• Predicts <strong>continuous numbers</strong></li>
              <li>• Output: any value (50, 75.5, 100)</li>
              <li>• Example: "How many ice creams?"</li>
              <li>• Draws a line through data</li>
            </ul>
          </div>
          
          <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border-2 border-purple-200 dark:border-purple-700">
            <h3 class="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">KNN (Chapter 3)</h3>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• Predicts <strong>categories/labels</strong></li>
              <li>• Output: fixed groups (Excellent, Average, Poor)</li>
              <li>• Example: "Which group do they belong to?"</li>
              <li>• Looks at nearest neighbours</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Maths Foundations -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Maths Foundations: Collecting 3 Treasures</h2>
      <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
        Before we see how the machine makes decisions, we need to collect <strong>3 maths treasures</strong>. Each treasure teaches us a skill that helps our machine learn faster:
      </p>

      <!-- Treasure 1: Sequences -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-lg p-3 text-2xl">🔢</div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Treasure 1: Linear and Non-Linear Sequences</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Recognizing patterns to make predictions</p>
          </div>
        </div>
        
        <div class="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-6 mb-4">
          <h4 class="font-semibold text-pink-900 dark:text-pink-300 mb-3">The Concept:</h4>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Patterns are everywhere. They help us guess what comes next, even when the answer isn't written down.
          </p>
          
          <div class="bg-white dark:bg-gray-800 rounded p-4 mb-4">
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-2"><strong>Linear pattern:</strong></p>
            <p class="font-mono text-lg mb-1">2, 4, 6, 8, ?</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Answer: 10 (steady pattern, add 2 each time)</p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded p-4">
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-2"><strong>Non-linear pattern:</strong></p>
            <p class="font-mono text-lg mb-1">3, 6, 12, 24, ?</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Answer: 48 (multiply by 2 each time)</p>
          </div>
        </div>

        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 mb-4">
          <p class="font-semibold text-amber-900 dark:text-amber-200 mb-3">🧩 Activity: Spot the Patterns</p>
          <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div><span class="font-mono">5, 10, 15, 20, ?</span> → <strong>Answer: 25</strong> (add 5)</div>
            <div><span class="font-mono">1, 4, 9, 16, ?</span> → <strong>Answer: 25</strong> (square numbers: 1², 2², 3², 4², 5²)</div>
            <div><span class="font-mono">7, 10, 13, 16, ?</span> → <strong>Answer: 19</strong> (add 3)</div>
          </div>
        </div>

        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-purple-900 dark:text-purple-300 mb-2">🧠 How This Helps KNN:</h4>
          <p class="text-sm text-gray-700 dark:text-gray-300">
            When we follow a sequence to decide what comes next, we're doing what a machine does. A machine looks at old examples to guess the new one. This is the first idea behind k-Nearest Neighbours: <strong>use similarity to make predictions.</strong>
          </p>
        </div>
      </div>

      <!-- Treasure 2: Comparing -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-lg p-3 text-2xl">🔍</div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Treasure 2: Comparing Quantities (Number Sense)</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Used in Step 2: Choosing k nearest neighbours</p>
          </div>
        </div>
        
        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 mb-4">
          <h4 class="font-semibold text-amber-900 dark:text-amber-300 mb-3">The Concept:</h4>
          <p class="text-gray-700 dark:text-gray-300 mb-3">
            Let's compare two simple distances. Point A is at 2, Point B is at 5. Which point is closer to A: B at 5 or a point at 20?
          </p>
          <div class="bg-white dark:bg-gray-800 rounded p-4 font-mono text-sm">
            Looking at it, we just know 5 is closer than 20.<br/>
            <strong class="text-amber-600">That's number sense!</strong>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-3">
            Using comparisons to choose what's nearest, quickest, or biggest.
          </p>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-4">
          <p class="font-semibold text-blue-900 dark:text-blue-200 mb-3">🧩 Activity: Quick Distance Thinking</p>
          <div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <p class="mb-1"><strong>Which is closest to 10?</strong></p>
              <p>12, 3, or 11? → <strong>Answer: 11</strong> (distance of 1)</p>
            </div>
            <div>
              <p class="mb-1"><strong>Which two numbers are closest together?</strong></p>
              <p>18 and 22, 18 and 19, or 22 and 30? → <strong>Answer: 18 and 19</strong> (distance of 1)</p>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-purple-900 dark:text-purple-300 mb-2">🧠 How This Helps KNN:</h4>
          <p class="text-sm text-gray-700 dark:text-gray-300">
            <strong>Machines compare too.</strong> kNN works by comparing distances between points. Your number sense is the same skill the machine uses - just in more dimensions! <strong>This treasure is used in Step 2</strong> when we sort distances and pick the k smallest ones.
          </p>
        </div>
      </div>

      <!-- Treasure 3: Distance -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-lg p-3 text-2xl">📐</div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Treasure 3: Understanding Space and Distance (Geometry)</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Used in Step 1: Measuring distances</p>
          </div>
        </div>
        
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-4">
          <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-3">The Concept:</h4>
          <p class="text-gray-700 dark:text-gray-300 mb-3">
            Let's use what we learned about comparisons, but now in <strong>two directions</strong>, like a map!
          </p>
          <div class="bg-white dark:bg-gray-800 rounded p-4">
            <p class="text-sm mb-2"><strong>Which point is closer to Point A at (2, 3)?</strong></p>
            <p class="text-sm">• Point B at (5, 7)?</p>
            <p class="text-sm mb-3">• Point C at (3, 4)?</p>
            <p class="text-sm font-mono">
              Distance to B: |5-2| + |7-3| = 3 + 4 = 7<br/>
              Distance to C: |3-2| + |4-3| = 1 + 1 = 2
            </p>
            <p class="text-sm font-bold text-blue-600 mt-2">Point C is closer!</p>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-3">
            We count the steps along each direction to see which point is nearer. This is called <strong>Manhattan distance</strong>.
          </p>
        </div>

        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 mb-4">
          <p class="font-semibold text-amber-900 dark:text-amber-200 mb-3">🧩 Activity: Plot and Measure</p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-white dark:bg-gray-800">
                  <th class="border dark:border-gray-600 px-3 py-2">Point</th>
                  <th class="border dark:border-gray-600 px-3 py-2">Coordinates</th>
                </tr>
              </thead>
              <tbody class="text-gray-700 dark:text-gray-300">
                <tr><td class="border dark:border-gray-600 px-3 py-2">A</td><td class="border dark:border-gray-600 px-3 py-2">(2, 3)</td></tr>
                <tr><td class="border dark:border-gray-600 px-3 py-2">B</td><td class="border dark:border-gray-600 px-3 py-2">(5, 7)</td></tr>
                <tr><td class="border dark:border-gray-600 px-3 py-2">C</td><td class="border dark:border-gray-600 px-3 py-2">(3, 4)</td></tr>
                <tr><td class="border dark:border-gray-600 px-3 py-2">D</td><td class="border dark:border-gray-600 px-3 py-2">(4, 5)</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-sm text-gray-700 dark:text-gray-300 mt-3">
            Count squares to find which points are closest to Point A.
          </p>
        </div>

        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-purple-900 dark:text-purple-300 mb-2">🧠 How This Helps KNN:</h4>
          <p class="text-sm text-gray-700 dark:text-gray-300">
            <strong>Distance Decides the Group.</strong> The nearer a point is to others, the more likely it belongs to the same group. This is exactly what kNN does! <strong>This treasure is used in Step 1</strong> to calculate how far Student 8 is from all other students using Manhattan distance.
          </p>
        </div>
      </div>
    </section>

    <!-- How It Works Step by Step -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Training the Machine: K-Nearest Neighbour Algorithm</h2>
      
      <div class="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8 mb-8">
        <p class="text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
          We now have all the maths treasures collected:
        </p>
        <ul class="space-y-2 text-gray-700 dark:text-gray-300">
          <li>✅ <strong>Patterns (Sequences)</strong> help us predict</li>
          <li>✅ <strong>Comparisons (Number Sense)</strong> help us choose the closest things</li>
          <li>✅ <strong>Distances (Geometry)</strong> help us explore space on a grid</li>
        </ul>
        <p class="text-lg text-gray-800 dark:text-gray-200 leading-relaxed mt-4">
          Let's use them to classify <strong>Student 8</strong> with Maths = 4 and English = 8!
        </p>
      </div>

      <!-- Step 0 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">0</div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">Inspect the Data</h3>
        </div>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Before we start, let's visualize our training data on a grid. We plot each student as a point using their Maths score (x-axis) and English score (y-axis), colored by their grade.
        </p>
        <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
          <p class="text-sm text-gray-700 dark:text-gray-300">
            <strong>Look at the simulator above</strong> to see all 7 training students plotted, with Student 8 marked with a question mark waiting to be classified!
          </p>
        </div>
      </div>

      <!-- Step 1 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">Calculate Distances 📐</h3>
        </div>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Measure the distance from Student 8 to every student in the training data using <strong>Manhattan distance</strong>:
        </p>
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-4">
          <p class="font-mono text-center text-lg mb-4 text-blue-900 dark:text-blue-300">
            Distance = |Maths<sub>new</sub> - Maths<sub>existing</sub>| + |English<sub>new</sub> - English<sub>existing</sub>|
          </p>
          <p class="text-sm text-center text-gray-600 dark:text-gray-400">Student 8 coordinates: (4, 8)</p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border dark:border-gray-600 px-3 py-2 text-left">Student</th>
                <th class="border dark:border-gray-600 px-3 py-2">Maths Diff</th>
                <th class="border dark:border-gray-600 px-3 py-2">English Diff</th>
                <th class="border dark:border-gray-600 px-3 py-2">Total Distance</th>
                <th class="border dark:border-gray-600 px-3 py-2">Grade</th>
              </tr>
            </thead>
            <tbody class="text-gray-700 dark:text-gray-300">
              <tr>
                <td class="border dark:border-gray-600 px-3 py-2">1 (9, 8)</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|4-9| = 5</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|8-8| = 0</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center font-bold">5</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center bg-green-100 dark:bg-green-900/30">Excellent</td>
              </tr>
              <tr>
                <td class="border dark:border-gray-600 px-3 py-2">2 (8, 8)</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|4-8| = 4</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|8-8| = 0</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center font-bold">4</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center bg-green-100 dark:bg-green-900/30">Excellent</td>
              </tr>
              <tr>
                <td class="border dark:border-gray-600 px-3 py-2">3 (7, 6)</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|4-7| = 3</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|8-6| = 2</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center font-bold">5</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center bg-blue-100 dark:bg-blue-900/30">Average</td>
              </tr>
              <tr>
                <td class="border dark:border-gray-600 px-3 py-2">4 (6, 6)</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|4-6| = 2</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|8-6| = 2</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center font-bold">4</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center bg-blue-100 dark:bg-blue-900/30">Average</td>
              </tr>
              <tr>
                <td class="border dark:border-gray-600 px-3 py-2">5 (5, 5)</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|4-5| = 1</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|8-5| = 3</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center font-bold">4</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center bg-blue-100 dark:bg-blue-900/30">Average</td>
              </tr>
              <tr>
                <td class="border dark:border-gray-600 px-3 py-2">6 (4, 3)</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|4-4| = 0</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|8-3| = 5</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center font-bold">5</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center bg-red-100 dark:bg-red-900/30">Poor</td>
              </tr>
              <tr>
                <td class="border dark:border-gray-600 px-3 py-2">7 (3, 4)</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|4-3| = 1</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center">|8-4| = 4</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center font-bold">5</td>
                <td class="border dark:border-gray-600 px-3 py-2 text-center bg-red-100 dark:bg-red-900/30">Poor</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">Choose k Nearest Neighbours 🔍</h3>
        </div>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Sort all distances from smallest to largest and select the <strong>k = 3</strong> closest students.
        </p>
        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
          <p class="font-semibold text-amber-900 dark:text-amber-300 mb-4">Sorted Distances:</p>
          <div class="space-y-2">
            <div class="bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded p-3 flex justify-between items-center">
              <span class="text-sm text-gray-700 dark:text-gray-300"><strong>1st NN:</strong> Student 2</span>
              <span class="font-mono text-sm bg-white dark:bg-gray-800 px-3 py-1 rounded">Distance: 4 → Excellent</span>
            </div>
            <div class="bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded p-3 flex justify-between items-center">
              <span class="text-sm text-gray-700 dark:text-gray-300"><strong>2nd NN:</strong> Student 4</span>
              <span class="font-mono text-sm bg-white dark:bg-gray-800 px-3 py-1 rounded">Distance: 4 → Average</span>
            </div>
            <div class="bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded p-3 flex justify-between items-center">
              <span class="text-sm text-gray-700 dark:text-gray-300"><strong>3rd NN:</strong> Student 5</span>
              <span class="font-mono text-sm bg-white dark:bg-gray-800 px-3 py-1 rounded">Distance: 4 → Average</span>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700/30 rounded p-3 flex justify-between items-center opacity-60">
              <span class="text-sm text-gray-700 dark:text-gray-300">4th NN: Student 1</span>
              <span class="font-mono text-sm px-3 py-1">Distance: 5 → Excellent</span>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700/30 rounded p-3 flex justify-between items-center opacity-60">
              <span class="text-sm text-gray-700 dark:text-gray-300">5th NN: Student 3</span>
              <span class="font-mono text-sm px-3 py-1">Distance: 5 → Average</span>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700/30 rounded p-3 flex justify-between items-center opacity-60">
              <span class="text-sm text-gray-700 dark:text-gray-300">6th NN: Student 6</span>
              <span class="font-mono text-sm px-3 py-1">Distance: 5 → Poor</span>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700/30 rounded p-3 flex justify-between items-center opacity-60">
              <span class="text-sm text-gray-700 dark:text-gray-300">7th NN: Student 7</span>
              <span class="font-mono text-sm px-3 py-1">Distance: 5 → Poor</span>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
            The 3 nearest neighbours are: <strong>Student 2 (Excellent), Student 4 (Average), Student 5 (Average)</strong>
          </p>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">Vote on the Labels 🗳️</h3>
        </div>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Count how many neighbours belong to each grade. The grade with the most votes becomes the prediction.
        </p>
        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
          <p class="font-semibold text-green-900 dark:text-green-300 mb-4">Vote Count:</p>
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border-2 border-gray-200 dark:border-gray-700">
              <div class="text-3xl font-bold text-yellow-600">1</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Excellent</div>
              <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">(Student 2)</div>
            </div>
            <div class="bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 rounded-lg p-4 text-center">
              <div class="text-3xl font-bold text-blue-600">2</div>
              <div class="text-sm font-semibold text-blue-700 dark:text-blue-400 mt-1">Average ✓</div>
              <div class="text-xs text-blue-600 dark:text-blue-400 mt-1">(Students 4, 5)</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border-2 border-gray-200 dark:border-gray-700">
              <div class="text-3xl font-bold text-red-600">0</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Poor</div>
              <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">(none)</div>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6 text-center">
            <p class="font-bold text-2xl mb-2">Final Classification: Average</p>
            <p class="text-sm opacity-90">Majority vote: 2 out of 3 neighbours say Average</p>
            <p class="text-xs opacity-75 mt-2">Student 8 (4, 8) is classified as Average performance</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why k matters -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Choosing the Right k</h2>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          The value of k (how many neighbours to consider) significantly affects predictions:
        </p>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-2 border-red-200 dark:border-red-700">
            <h4 class="font-bold text-red-900 dark:text-red-300 mb-3">k = 1 (Too Small)</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Only looks at 1 closest neighbour. Very sensitive to noise and outliers.
            </p>
            <p class="text-xs text-red-700 dark:text-red-400">
              ⚠️ One unusual example can throw off predictions
            </p>
          </div>
          
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-2 border-green-200 dark:border-green-700">
            <h4 class="font-bold text-green-900 dark:text-green-300 mb-3">k = 3 or 5 (Just Right)</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Balances local patterns with stability. Odd numbers prevent ties in voting.
            </p>
            <p class="text-xs text-green-700 dark:text-green-400">
              ✓ Most commonly used values
            </p>
          </div>
          
          <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border-2 border-orange-200 dark:border-orange-700">
            <h4 class="font-bold text-orange-900 dark:text-orange-300 mb-3">k = All Data (Too Large)</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Considers everyone equally. Loses local patterns - always picks majority class.
            </p>
            <p class="text-xs text-orange-700 dark:text-orange-400">
              ⚠️ Too smooth, misses important details
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Features -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Interactive Features</h2>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          The simulator above lets you explore how KNN makes decisions:
        </p>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">Edit Training Data</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Click values in the data table to edit student scores. Watch how the classification changes when you modify the training examples.
            </p>
          </div>
          
          <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 class="font-semibold text-purple-900 dark:text-purple-300 mb-2">Adjust k Value</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Change k to see how considering more or fewer neighbours affects the classification result. Try k=1, k=3, k=5!
            </p>
          </div>
          
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 class="font-semibold text-green-900 dark:text-green-300 mb-2">View Distance Calculations</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              See step-by-step distance calculations showing exactly how the algorithm measures similarity between students.
            </p>
          </div>
          
          <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
            <h4 class="font-semibold text-amber-900 dark:text-amber-300 mb-2">Visualize on Scatter Plot</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Plot students on a 2D graph to see spatial relationships. Points that are close together tend to have the same grade.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stretch Activities -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Stretch Activities</h2>
      
      <!-- Activity 1: Increase k -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h3 class="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4">🔬 What happens when we increase k to 5?</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Instead of looking at the 3 nearest neighbours, let's look at the 5 nearest neighbours and see if the classification changes!
        </p>
        
        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-4">
          <p class="font-semibold text-purple-900 dark:text-purple-200 mb-3">The 5 nearest neighbours (k=5) are:</p>
          <ul class="space-y-2 text-gray-700 dark:text-gray-300">
            <li>1. Student 2 - Distance: 4 → <span class="font-bold text-green-600">Excellent</span></li>
            <li>2. Student 4 - Distance: 4 → <span class="font-bold text-blue-600">Average</span></li>
            <li>3. Student 5 - Distance: 4 → <span class="font-bold text-blue-600">Average</span></li>
            <li>4. Student 1 - Distance: 5 → <span class="font-bold text-green-600">Excellent</span></li>
            <li>5. Student 3 - Distance: 5 → <span class="font-bold text-blue-600">Average</span></li>
          </ul>
        </div>

        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
          <p class="font-semibold text-amber-900 dark:text-amber-200 mb-3">🗳️ New Vote Count:</p>
          <div class="grid grid-cols-3 gap-3 text-center text-sm">
            <div class="bg-white dark:bg-gray-800 rounded p-3">
              <div class="text-2xl font-bold text-green-600">2</div>
              <div class="text-gray-600 dark:text-gray-400">Excellent</div>
            </div>
            <div class="bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 rounded p-3">
              <div class="text-2xl font-bold text-blue-600">3</div>
              <div class="font-semibold text-blue-700 dark:text-blue-400">Average ✓</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded p-3">
              <div class="text-2xl font-bold text-red-600">0</div>
              <div class="text-gray-600 dark:text-gray-400">Poor</div>
            </div>
          </div>
          <p class="text-sm text-gray-700 dark:text-gray-300 mt-4">
            <strong>Result:</strong> Still classified as Average (3 out of 5). The prediction remains the same!
          </p>
        </div>
      </div>

      <!-- Activity 2: Add more features -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h3 class="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4">🔬 What happens when we add more features?</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Currently we only use 2 features (Maths and English). What if we add more subjects like Science and History? This makes our data <strong>3-dimensional or 4-dimensional!</strong>
        </p>
        
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-4">
          <p class="text-gray-700 dark:text-gray-300 mb-3">
            With 4 features (Maths, Science, English, History), we can't plot it on a 2D graph anymore, but the algorithm still works the same way!
          </p>
          <p class="text-gray-700 dark:text-gray-300">
            The distance formula becomes:
          </p>
          <div class="bg-white dark:bg-gray-800 rounded p-4 mt-3 font-mono text-xs overflow-x-auto">
            Distance = |Maths₁ - Maths₂| + |Science₁ - Science₂| + |English₁ - English₂| + |History₁ - History₂|
          </div>
        </div>

        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
          <p class="font-semibold text-amber-900 dark:text-amber-200 mb-3">💡 Key Insights:</p>
          <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• <strong>More features</strong> can make predictions more accurate (more information to work with)</li>
            <li>• But <strong>too many features</strong> can sometimes confuse the model (curse of dimensionality)</li>
            <li>• The algorithm stays the same: calculate distances, find k nearest, vote!</li>
            <li>• We just can't visualize it on a simple 2D graph anymore</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Real World Applications -->
    <section>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Real-World Applications</h2>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          KNN classification is used across many industries:
        </p>
        
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <span class="text-2xl">🏥</span>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">Healthcare</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Diagnosing diseases based on patient symptoms and test results</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <span class="text-2xl">📧</span>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">Email Filtering</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Classifying emails as spam or not spam based on content patterns</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <span class="text-2xl">🎬</span>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">Recommendation Systems</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Suggesting movies or products based on similar users' preferences</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <span class="text-2xl">✍️</span>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">Handwriting Recognition</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Identifying written digits by comparing to known examples</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <span class="text-2xl">💳</span>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">Fraud Detection</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Flagging suspicious transactions by comparing to normal patterns</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</div>
