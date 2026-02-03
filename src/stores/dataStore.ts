import { writable, derived } from 'svelte/store'

export interface DataPoint {
  day: number
  temperature: number
  sales: number
}

export const dataPoints = writable<DataPoint[]>([])
export const userTemperature = writable<number>(16)
export const showLineOfBestFit = writable<boolean>(false)
export const highlightFormula = writable<string | null>(null)

// Manual line adjustment
export const manualMode = writable<boolean>(false)
export const manualGradient = writable<number>(5)
export const manualYIntercept = writable<number>(-5)
export const showResiduals = writable<boolean>(false)

// Calculate gradient (m) from the data points using least squares regression
export const gradient = derived(dataPoints, ($dataPoints) => {
  if ($dataPoints.length < 2) return 5
  
  // Calculate means
  const n = $dataPoints.length
  const meanX = $dataPoints.reduce((sum, p) => sum + p.temperature, 0) / n
  const meanY = $dataPoints.reduce((sum, p) => sum + p.sales, 0) / n
  
  // Calculate gradient using least squares formula: m = Σ((x - x̄)(y - ȳ)) / Σ((x - x̄)²)
  const numerator = $dataPoints.reduce((sum, p) => {
    return sum + (p.temperature - meanX) * (p.sales - meanY)
  }, 0)
  
  const denominator = $dataPoints.reduce((sum, p) => {
    return sum + Math.pow(p.temperature - meanX, 2)
  }, 0)
  
  if (denominator === 0) return 5
  return numerator / denominator
})

// Calculate y-intercept (c) from the data points using least squares regression
export const yIntercept = derived([dataPoints, gradient], ([$dataPoints, $gradient]) => {
  if ($dataPoints.length === 0) return -5
  
  // Calculate y-intercept using: c = ȳ - m * x̄
  const n = $dataPoints.length
  const meanX = $dataPoints.reduce((sum, p) => sum + p.temperature, 0) / n
  const meanY = $dataPoints.reduce((sum, p) => sum + p.sales, 0) / n
  
  return meanY - $gradient * meanX
})

// Get active gradient and y-intercept (manual or calculated)
export const activeGradient = derived(
  [manualMode, manualGradient, gradient],
  ([$manualMode, $manualGradient, $gradient]) => {
    return $manualMode ? $manualGradient : $gradient
  }
)

export const activeYIntercept = derived(
  [manualMode, manualYIntercept, yIntercept],
  ([$manualMode, $manualYIntercept, $yIntercept]) => {
    return $manualMode ? $manualYIntercept : $yIntercept
  }
)

// Calculate predicted sales for the user's temperature
export const predictedSales = derived(
  [userTemperature, activeGradient, activeYIntercept],
  ([$userTemperature, $activeGradient, $activeYIntercept]) => {
    return $activeGradient * $userTemperature + $activeYIntercept
  }
)

// Format the formula as a string
export const formulaString = derived(
  [gradient, yIntercept],
  ([$gradient, $yIntercept]) => {
    const m = $gradient.toFixed(1)
    const c = $yIntercept.toFixed(1)
    const sign = $yIntercept >= 0 ? '+' : ''
    return `y = ${m}x ${sign} ${c}`
  }
)

// Calculate sum of squared errors
export const sumOfSquaredErrors = derived(
  [dataPoints, activeGradient, activeYIntercept],
  ([$dataPoints, $activeGradient, $activeYIntercept]) => {
    return $dataPoints.reduce((sum, point) => {
      const predicted = $activeGradient * point.temperature + $activeYIntercept
      const error = point.sales - predicted
      return sum + error * error
    }, 0)
  }
)

// Calculate mean squared error
export const meanSquaredError = derived(
  [sumOfSquaredErrors, dataPoints],
  ([$sumOfSquaredErrors, $dataPoints]) => {
    return $dataPoints.length > 0 ? $sumOfSquaredErrors / $dataPoints.length : 0
  }
)

// Calculate optimal SSE for comparison
export const optimalSSE = derived(
  [dataPoints, gradient, yIntercept],
  ([$dataPoints, $gradient, $yIntercept]) => {
    return $dataPoints.reduce((sum, point) => {
      const predicted = $gradient * point.temperature + $yIntercept
      const error = point.sales - predicted
      return sum + error * error
    }, 0)
  }
)
