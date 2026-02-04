<script lang="ts">
</script>

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
