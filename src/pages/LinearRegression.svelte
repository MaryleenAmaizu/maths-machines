<script lang="ts">
  import { navigateTo } from '../stores/routerStore'
  import Header from '../components/Header.svelte'
  import DataTable from '../components/DataTable.svelte'
  import ScatterPlot from '../components/ScatterPlot.svelte'
  import FormulaExplainer from '../components/FormulaExplainer.svelte'
  import PredictionCalculator from '../components/PredictionCalculator.svelte'
  import LineAdjuster from '../components/LineAdjuster.svelte'
  import TreasureList from '../components/TreasureList.svelte'
  import TutorialModal from '../components/TutorialModal.svelte'
  import FloatingHelp from '../components/FloatingHelp.svelte'
  import { dataPoints, userTemperature } from '../stores/dataStore'
  import { currentStep, tutorialActive } from '../stores/tutorialStore'

  // Ice cream sales data
  const initialData = [
    { day: 1, temperature: 10, sales: 45 },
    { day: 2, temperature: 12, sales: 50 },
    { day: 3, temperature: 15, sales: 65 },
    { day: 4, temperature: 18, sales: 80 },
    { day: 5, temperature: 20, sales: 90 },
  ]

  dataPoints.set(initialData)
  userTemperature.set(16)

  // Show components progressively based on tutorial step
  $: currentComponent = $currentStep?.component || null
  $: showDataTable = !$tutorialActive || currentComponent === 'general' || currentComponent === 'DataTable' || isAfterStep('data')
  $: showScatterPlot = !$tutorialActive || currentComponent === 'general' || currentComponent === 'ScatterPlot' || isAfterStep('scatter')
  $: showLineAdjuster = !$tutorialActive || currentComponent === 'general' || currentComponent === 'LineAdjuster' || isAfterStep('line')
  $: showFormulaExplainer = !$tutorialActive || currentComponent === 'general' || currentComponent === 'FormulaExplainer' || isAfterStep('formula')
  $: showPredictionCalculator = !$tutorialActive || currentComponent === 'general' || currentComponent === 'PredictionCalculator' || isAfterStep('prediction')

  function isAfterStep(stepId: string): boolean {
    if (!$currentStep) return false
    const stepOrder = ['intro', 'data', 'scatter', 'line', 'formula', 'prediction']
    const currentIndex = stepOrder.indexOf($currentStep.id)
    const targetIndex = stepOrder.indexOf(stepId)
    return currentIndex > targetIndex
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
  <!-- Tutorial Modal -->
  <TutorialModal />
  
  <!-- Floating Help Button -->
  <FloatingHelp />

  <!-- Navigation Bar -->
  <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 py-3 flex items-center gap-4">
      <button
        on:click={() => navigateTo('home')}
        class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
      >
        ← Home
      </button>
      <span class="text-gray-400">|</span>
      <span class="text-gray-700 dark:text-gray-300 font-medium">Chapter 2: Linear Regression</span>
    </div>
  </nav>

  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <Header />
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <!-- Left Column: Data and Graph -->
      <div class="space-y-6">
        {#if showDataTable}
          <DataTable />
        {/if}
        {#if showScatterPlot}
          <ScatterPlot />
        {/if}
      </div>
      
      <!-- Right Column: Formula and Calculator -->
      <div class="space-y-6">
        {#if showLineAdjuster}
          <LineAdjuster />
        {/if}
        {#if showFormulaExplainer}
          <FormulaExplainer />
        {/if}
        {#if showPredictionCalculator}
          <PredictionCalculator />
        {/if}
        <TreasureList />
      </div>
    </div>
  </div>
</div>
