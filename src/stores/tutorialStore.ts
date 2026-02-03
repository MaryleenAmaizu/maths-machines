import { writable, derived } from 'svelte/store'

export interface TutorialStep {
  id: string
  title: string
  description: string
  component: string
  action?: string
  completed: boolean
  unlocked: boolean
}

// Tutorial steps for linear regression
const initialSteps: TutorialStep[] = [
  {
    id: 'intro',
    title: 'Welcome to Linear Regression!',
    description: 'Let\'s train a machine learning model to predict ice cream sales based on temperature.',
    component: 'general',
    completed: false,
    unlocked: true
  },
  {
    id: 'data',
    title: 'Step 1: Training Data',
    description: 'This is our training dataset. Each row is a training example with features (temperature) and labels (sales).',
    component: 'DataTable',
    action: 'View the training data',
    completed: false,
    unlocked: true
  },
  {
    id: 'scatter',
    title: 'Step 2: Visualize Data',
    description: 'The scatter plot shows our training examples. Our model will learn the pattern from these points.',
    component: 'ScatterPlot',
    action: 'Toggle "Show Line of Best Fit" to see the model prediction',
    completed: false,
    unlocked: false
  },
  {
    id: 'line',
    title: 'Step 3: Model Training',
    description: 'Try fitting the model manually! The algorithm finds optimal parameters to minimize error.',
    component: 'LineAdjuster',
    action: 'Adjust gradient and intercept to see training in action',
    completed: false,
    unlocked: false
  },
  {
    id: 'formula',
    title: 'Step 4: Model Parameters',
    description: 'These are the learned parameters (weights). The gradient (m) and y-intercept (c) define our trained model.',
    component: 'FormulaExplainer',
    action: 'Expand to see how parameters are calculated',
    completed: false,
    unlocked: false
  },
  {
    id: 'prediction',
    title: 'Step 5: Model Inference',
    description: 'Now use the trained model to make predictions! This is inference - applying the model to new data.',
    component: 'PredictionCalculator',
    action: 'Adjust temperature and see model predictions',
    completed: false,
    unlocked: false
  }
]

// Current tutorial state
export const tutorialSteps = writable<TutorialStep[]>(initialSteps)
export const currentStepIndex = writable<number>(0)
export const tutorialActive = writable<boolean>(true)
export const showStepModal = writable<boolean>(true) // Only for welcome screen
export const highlightComponent = writable<string | null>(null)

// Derived stores
export const currentStep = derived(
  [tutorialSteps, currentStepIndex],
  ([$steps, $index]) => $steps[$index] || null
)

export const tutorialProgress = derived(
  tutorialSteps,
  ($steps) => {
    const completed = $steps.filter(s => s.completed).length
    const total = $steps.length
    return { completed, total, percentage: (completed / total) * 100 }
  }
)

export const allStepsCompleted = derived(
  tutorialSteps,
  ($steps) => $steps.every(s => s.completed)
)

// Actions
export function completeStep(stepId: string) {
  tutorialSteps.update(steps => {
    const stepIndex = steps.findIndex(s => s.id === stepId)
    if (stepIndex !== -1) {
      steps[stepIndex].completed = true
      // Unlock next step
      if (stepIndex < steps.length - 1) {
        steps[stepIndex + 1].unlocked = true
      }
    }
    return steps
  })
}

export function nextStep() {
  currentStepIndex.update(index => {
    let newIndex = index + 1
    tutorialSteps.update(steps => {
      if (newIndex < steps.length && !steps[newIndex].unlocked) {
        // Find next unlocked step
        for (let i = newIndex; i < steps.length; i++) {
          if (steps[i].unlocked) {
            newIndex = i
            break
          }
        }
      }
      return steps
    })
    return Math.min(newIndex, 6) // 7 steps (0-6)
  })
  // Close welcome modal after first step
  if (currentStepIndex !== undefined) {
    showStepModal.set(false)
  }
}

export function previousStep() {
  currentStepIndex.update(index => Math.max(0, index - 1))
}

export function goToStep(index: number) {
  currentStepIndex.set(index)
}

export function skipTutorial() {
  tutorialActive.set(false)
  showStepModal.set(false)
  // Unlock all steps
  tutorialSteps.update(steps => steps.map(s => ({ ...s, unlocked: true, completed: true })))
}

export function restartTutorial() {
  tutorialSteps.set(initialSteps)
  currentStepIndex.set(0)
  tutorialActive.set(true)
  showStepModal.set(true)
}

// Track user interactions to auto-complete steps
export function trackInteraction(component: string, action: string) {
  const interactions: { [key: string]: { [key: string]: string } } = {
    'DataTable': { 'view': 'data' },
    'ScatterPlot': { 'toggleLine': 'scatter' },
    'LineAdjuster': { 'adjust': 'line' },
    'FormulaExplainer': { 'expand': 'formula' },
    'PredictionCalculator': { 'predict': 'prediction' },
    'DataManipulation': { 'modify': 'experiment' }
  }
  
  if (interactions[component] && interactions[component][action]) {
    completeStep(interactions[component][action])
  }
}
