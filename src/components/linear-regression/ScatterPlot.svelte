<script lang="ts">
  import { onMount } from 'svelte'
  import * as d3 from 'd3'
  import { dataPoints, userTemperature, showLineOfBestFit, activeGradient, activeYIntercept, predictedSales, showResiduals, manualMode, manualGradient, manualYIntercept } from '../../stores/dataStore'
  import { trackInteraction } from '../../stores/tutorialStore'

  let svg: SVGSVGElement
  let width = 600
  let height = 400
  const margin = { top: 20, right: 30, bottom: 50, left: 60 }
  let isDraggingLine = false
  let isDraggingHandle = false
  let dragStartY = 0
  let dragStartX = 0
  let dragStartIntercept = 0
  let dragStartGradient = 0
  let activeHandle: 'start' | 'end' | null = null
  let clickStartTime = 0
  let clickStartPos = { x: 0, y: 0 }
  let isHoveringLine = false
  let dragMode: 'intercept' | 'gradient' = 'intercept'

  // Track when line is toggled
  let previousLineState = $showLineOfBestFit
  $: if ($showLineOfBestFit !== previousLineState) {
    if ($showLineOfBestFit) {
      trackInteraction('ScatterPlot', 'toggleLine')
    }
    previousLineState = $showLineOfBestFit
  }

  $: innerWidth = width - margin.left - margin.right
  $: innerHeight = height - margin.top - margin.bottom

  $: xScale = d3.scaleLinear()
    .domain([0, 25])
    .range([0, innerWidth])

  $: yScale = d3.scaleLinear()
    .domain([0, 120])
    .range([innerHeight, 0])

  onMount(() => {
    drawChart()
  })

  $: if (svg && $dataPoints.length > 0) {
    drawChart()
  }

  // Redraw when line parameters change
  $: if (svg) {
    $showLineOfBestFit
    $activeGradient
    $activeYIntercept
    $showResiduals
    $userTemperature
    $predictedSales
    isHoveringLine
    drawChart()
  }

  function drawChart() {
    const svgElement = d3.select(svg)
    svgElement.selectAll('*').remove()

    const g = svgElement
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Add background rect for click detection
    const chartArea = g.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .attr('cursor', 'crosshair')
      .on('mousedown', function(event) {
        clickStartTime = Date.now()
        clickStartPos = { x: event.clientX, y: event.clientY }
      })
      .on('mouseup', function(event) {
        const clickDuration = Date.now() - clickStartTime
        const distance = Math.sqrt(
          Math.pow(event.clientX - clickStartPos.x, 2) + 
          Math.pow(event.clientY - clickStartPos.y, 2)
        )
        
        // Only add point if it was a quick click (not a drag)
        if (clickDuration < 300 && distance < 5 && !isDraggingLine && !isDraggingHandle) {
          const [mouseX, mouseY] = d3.pointer(event)
          const temperature = Math.round(xScale.invert(mouseX))
          const sales = Math.round(yScale.invert(mouseY))
          
          // Ensure values are in reasonable bounds
          if (temperature >= 0 && temperature <= 25 && sales >= 0 && sales <= 120) {
            dataPoints.update(points => {
              const newPoint = {
                day: points.length + 1,
                temperature,
                sales
              }
              return [...points, newPoint]
            })
          }
        }
      })

    // Add grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(() => ''))

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 40)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'middle')
      .text('Temperature (°C)')

    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -45)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'middle')
      .text('Ice Creams Sold')

    // Draw line of best fit if enabled
    if ($showLineOfBestFit) {
      const lineData = [
        { x: 0, y: $activeYIntercept },
        { x: 25, y: $activeGradient * 25 + $activeYIntercept }
      ]

      const linePath = g.append('path')
        .datum(lineData)
        .attr('fill', 'none')
        .attr('stroke', '#4F46E5')
        .attr('stroke-width', 3)
        .attr('d', d3.line<{x: number, y: number}>()
          .x(d => xScale(d.x))
          .y(d => yScale(d.y))
        )
        .style('cursor', $manualMode ? 'move' : 'default')

      // Add draggable handles in manual mode
      if ($manualMode) {
        // Create invisible hit zones for different drag modes
        
        // Left edge zone - for gradient adjustment
        const leftZoneData = [
          { x: 5, y: $activeGradient * 5 + $activeYIntercept },
          { x: 10, y: $activeGradient * 10 + $activeYIntercept }
        ]
        g.append('path')
          .datum(leftZoneData)
          .attr('fill', 'none')
          .attr('stroke', 'transparent')
          .attr('stroke-width', 20)
          .attr('d', d3.line<{x: number, y: number}>()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y))
          )
          .style('cursor', 'ns-resize')
          .style('pointer-events', 'stroke')
          .on('mousedown', function(event) {
            event.preventDefault()
            isDraggingLine = true
            dragStartY = event.clientY
            dragStartX = event.clientX
            dragStartIntercept = $manualYIntercept
            dragStartGradient = $manualGradient
            dragMode = 'gradient'
          })

        // Right edge zone - for gradient adjustment
        const rightZoneData = [
          { x: 18, y: $activeGradient * 18 + $activeYIntercept },
          { x: 23, y: $activeGradient * 23 + $activeYIntercept }
        ]
        g.append('path')
          .datum(rightZoneData)
          .attr('fill', 'none')
          .attr('stroke', 'transparent')
          .attr('stroke-width', 20)
          .attr('d', d3.line<{x: number, y: number}>()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y))
          )
          .style('cursor', 'ns-resize')
          .style('pointer-events', 'stroke')
          .on('mousedown', function(event) {
            event.preventDefault()
            isDraggingLine = true
            dragStartY = event.clientY
            dragStartX = event.clientX
            dragStartIntercept = $manualYIntercept
            dragStartGradient = $manualGradient
            dragMode = 'gradient'
          })

        // Middle zone - for y-intercept adjustment
        const middleZoneData = [
          { x: 10, y: $activeGradient * 10 + $activeYIntercept },
          { x: 18, y: $activeGradient * 18 + $activeYIntercept }
        ]
        g.append('path')
          .datum(middleZoneData)
          .attr('fill', 'none')
          .attr('stroke', 'transparent')
          .attr('stroke-width', 20)
          .attr('d', d3.line<{x: number, y: number}>()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y))
          )
          .style('cursor', 'move')
          .style('pointer-events', 'stroke')
          .on('mousedown', function(event) {
            event.preventDefault()
            isDraggingLine = true
            dragStartY = event.clientY
            dragStartX = event.clientX
            dragStartIntercept = $manualYIntercept
            dragStartGradient = $manualGradient
            dragMode = 'intercept'
          })

        // Make line draggable for vertical movement (y-intercept)
        linePath
          .style('pointer-events', 'none')

        // Add transparent overlay line for easier dragging
        g.append('path')
          .datum(lineData)
          .attr('fill', 'none')
          .attr('stroke', '#4F46E5')
          .attr('stroke-width', 3)
          .attr('pointer-events', 'none')
          .attr('d', d3.line<{x: number, y: number}>()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y))
          )
      }

      // Draw residual lines if enabled
      if ($showResiduals) {
        $dataPoints.forEach(point => {
          const predicted = $activeGradient * point.temperature + $activeYIntercept
          
          g.append('line')
            .attr('x1', xScale(point.temperature))
            .attr('y1', yScale(point.sales))
            .attr('x2', xScale(point.temperature))
            .attr('y2', yScale(predicted))
            .attr('stroke', '#EF4444')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '4,4')
            .attr('opacity', 0.6)
        })
      }
    }

    // Draw data points
    g.selectAll('.data-point')
      .data($dataPoints)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', d => xScale(d.temperature))
      .attr('cy', d => yScale(d.sales))
      .attr('r', 6)
      .attr('fill', '#F59E0B')
      .attr('stroke', '#D97706')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .style('pointer-events', 'all')
      .on('mouseenter', function() {
        d3.select(this).attr('r', 8)
      })
      .on('mouseleave', function() {
        d3.select(this).attr('r', 6)
      })

    // Add day labels inside the circles
    g.selectAll('.data-label')
      .data($dataPoints)
      .enter()
      .append('text')
      .attr('class', 'data-label')
      .attr('x', d => xScale(d.temperature))
      .attr('y', d => yScale(d.sales))
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', 'white')
      .attr('pointer-events', 'none')
      .text(d => d.day)

    // Draw user's prediction point
    if ($userTemperature) {
      g.append('circle')
        .attr('cx', xScale($userTemperature))
        .attr('cy', yScale($predictedSales))
        .attr('r', 8)
        .attr('fill', '#10B981')
        .attr('stroke', '#059669')
        .attr('stroke-width', 3)

      // Draw vertical line from x-axis to point
      g.append('line')
        .attr('x1', xScale($userTemperature))
        .attr('y1', innerHeight)
        .attr('x2', xScale($userTemperature))
        .attr('y2', yScale($predictedSales))
        .attr('stroke', '#10B981')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
    }
  }

  function handleResize() {
    if (svg) {
      const container = svg.parentElement
      if (container) {
        width = container.clientWidth
      }
    }
  }

  function handleMouseMove(event: MouseEvent) {
    if (!$manualMode) return

    if (isDraggingLine) {
      if (dragMode === 'intercept') {
        // Vertical drag to change y-intercept
        const deltaY = event.clientY - dragStartY
        const deltaValue = -(deltaY / innerHeight) * 120
        manualYIntercept.set(dragStartIntercept + deltaValue)
      } else {
        // Horizontal drag to change gradient
        const deltaX = event.clientX - dragStartX
        const deltaY = event.clientY - dragStartY
        
        // Calculate new gradient based on mouse movement
        const gradientChange = -(deltaY / innerHeight) * 20
        const newGradient = Math.max(-10, Math.min(20, dragStartGradient + gradientChange))
        
        manualGradient.set(newGradient)
      }
    } else if (isDraggingHandle && activeHandle) {
      const rect = svg.getBoundingClientRect()
      const mouseX = event.clientX - rect.left - margin.left
      const mouseY = event.clientY - rect.top - margin.top
      
      const temperature = xScale.invert(mouseX)
      const sales = yScale.invert(mouseY)

      if (activeHandle === 'start') {
        // Adjust line based on start handle - pivot around end point
        const pivotX = 22
        const pivotY = dragStartGradient * pivotX + dragStartIntercept
        
        const handleX = 8
        const newGradient = (pivotY - sales) / (pivotX - handleX)
        const newIntercept = sales - newGradient * handleX
        
        manualGradient.set(Math.max(-10, Math.min(20, newGradient)))
        manualYIntercept.set(newIntercept)
      } else if (activeHandle === 'end') {
        // Adjust line based on end handle - pivot around start point
        const pivotX = 8
        const pivotY = dragStartGradient * pivotX + dragStartIntercept
        
        const handleX = 22
        const newGradient = (sales - pivotY) / (handleX - pivotX)
        const newIntercept = pivotY - newGradient * pivotX
        
        manualGradient.set(Math.max(-10, Math.min(20, newGradient)))
        manualYIntercept.set(newIntercept)
      }
    }
  }

  function handleMouseUp() {
    isDraggingLine = false
    isDraggingHandle = false
    activeHandle = null
    
    // Reset hover state after dragging
    if (!isDraggingLine && !isDraggingHandle) {
      isHoveringLine = false
    }
  }
</script>

<svelte:window on:resize={handleResize} on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
      📈 Scatter Plot
    </h2>
    <div class="flex flex-col gap-2">
      <label class="flex items-center space-x-2 cursor-pointer">
        <input 
          type="checkbox" 
          bind:checked={$showLineOfBestFit}
          class="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
        />
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Show Line
        </span>
      </label>
      {#if $showLineOfBestFit}
        <label class="flex items-center space-x-2 cursor-pointer ml-7">
          <input 
            type="checkbox" 
            bind:checked={$showResiduals}
            class="w-4 h-4 text-red-600 rounded focus:ring-2 focus:ring-red-500"
          />
          <span class="text-xs font-medium text-gray-600 dark:text-gray-400">
            Show Errors
          </span>
        </label>
      {/if}
    </div>
  </div>
  
  <div class="w-full" bind:clientWidth={width}>
    <svg bind:this={svg} {width} {height} class="text-gray-800 dark:text-gray-200"></svg>
  </div>

  <div class="mt-4 flex items-center space-x-4 text-sm flex-wrap">
    <div class="flex items-center space-x-2">
      <div class="w-4 h-4 rounded-full bg-amber-500 border-2 border-amber-600"></div>
      <span class="text-gray-700 dark:text-gray-300">Data Points</span>
    </div>
    <div class="flex items-center space-x-2">
      <div class="w-4 h-4 rounded-full bg-green-500 border-2 border-green-600"></div>
      <span class="text-gray-700 dark:text-gray-300">Your Prediction</span>
    </div>
    {#if $showLineOfBestFit}
      <div class="flex items-center space-x-2">
        <div class="w-6 h-1 bg-indigo-600"></div>
        <span class="text-gray-700 dark:text-gray-300">Line of Best Fit</span>
      </div>
    {/if}
    {#if $showResiduals}
      <div class="flex items-center space-x-2">
        <div class="w-6 h-0.5 bg-red-500 border-t-2 border-dashed border-red-500"></div>
        <span class="text-gray-700 dark:text-gray-300">Errors (Residuals)</span>
      </div>
    {/if}
  </div>

  <!-- Click to add points instruction -->
  <div class="mt-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
    <p class="text-sm text-gray-700 dark:text-gray-300">
      ➕ <strong>Click anywhere on the graph</strong> to add a new data point! It will appear in the table below.
    </p>
  </div>

  {#if $manualMode && $showLineOfBestFit}
    <div class="mt-3 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
      <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
        🖱️ <strong>Two ways to adjust the line:</strong>
      </p>
      <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4">
        <li>• <strong>Hover over the line</strong> → See arrows indicating which part adjusts steepness (↕️) or position (✋)</li>
        <li>• <strong>Use the sliders below</strong> → Adjust gradient and y-intercept precisely</li>
      </ul>
    </div>
  {/if}
</div>