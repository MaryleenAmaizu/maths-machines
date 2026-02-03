<script lang="ts">
  import { onMount } from 'svelte'
  import * as d3 from 'd3'
  import { students, newStudent, distanceResults, showDistances } from '../../stores/knnStore'

  let svgElement: SVGSVGElement

  $: if (svgElement) {
    drawChart()
  }

  function drawChart() {
    const svg = d3.select(svgElement)
    svg.selectAll('*').remove()

    const width = svgElement.clientWidth
    const height = 400
    const margin = { top: 20, right: 20, bottom: 50, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Scales
    const xScale = d3.scaleLinear().domain([0, 10]).range([0, innerWidth])
    const yScale = d3.scaleLinear().domain([0, 10]).range([innerHeight, 0])

    // Grid
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(() => ''))

    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${innerHeight})`)
      .attr('opacity', 0.1)
      .call(d3.axisBottom(xScale).tickSize(-innerHeight).tickFormat(() => ''))

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 40)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'middle')
      .text('Maths Score')

    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -45)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'middle')
      .text('English Score')

    // Draw distance lines if showing distances
    if ($showDistances && $distanceResults.length > 0) {
      const neighbors = $distanceResults.filter(r => r.isNeighbor)
      
      neighbors.forEach(result => {
        g.append('line')
          .attr('x1', xScale($newStudent.maths))
          .attr('y1', yScale($newStudent.english))
          .attr('x2', xScale(result.student.maths))
          .attr('y2', yScale(result.student.english))
          .attr('stroke', '#8B5CF6')
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', '5,5')
          .attr('opacity', 0.5)
      })
    }

    // Helper function for grade colors
    function getGradeColor(grade: string | null) {
      if (grade === 'Excellent') return '#10B981'
      if (grade === 'Average') return '#F59E0B'
      if (grade === 'Poor') return '#EF4444'
      return '#8B5CF6'
    }

    // Draw existing students
    $students.forEach(student => {
      const isNeighbor = $distanceResults.some(r => r.isNeighbor && r.student.id === student.id)
      
      g.append('circle')
        .attr('cx', xScale(student.maths))
        .attr('cy', yScale(student.english))
        .attr('r', isNeighbor ? 10 : 8)
        .attr('fill', getGradeColor(student.grade))
        .attr('stroke', isNeighbor ? '#8B5CF6' : '#fff')
        .attr('stroke-width', isNeighbor ? 3 : 2)
        .style('cursor', 'pointer')

      // Add student ID label
      g.append('text')
        .attr('x', xScale(student.maths))
        .attr('y', yScale(student.english))
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '10px')
        .attr('font-weight', 'bold')
        .attr('fill', 'white')
        .attr('pointer-events', 'none')
        .text(student.id)
    })

    // Draw new student (the one to predict)
    g.append('circle')
      .attr('cx', xScale($newStudent.maths))
      .attr('cy', yScale($newStudent.english))
      .attr('r', 12)
      .attr('fill', getGradeColor($newStudent.grade))
      .attr('stroke', '#8B5CF6')
      .attr('stroke-width', 4)

    g.append('text')
      .attr('x', xScale($newStudent.maths))
      .attr('y', yScale($newStudent.english))
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', 'white')
      .attr('pointer-events', 'none')
      .text($newStudent.grade || '?')
  }

  onMount(() => {
    drawChart()
    window.addEventListener('resize', drawChart)
    return () => window.removeEventListener('resize', drawChart)
  })
</script>

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    📍 Student Positions
  </h2>
  
  <svg bind:this={svgElement} class="w-full" style="max-height: 400px;"></svg>

  <!-- Legend -->
  <div class="mt-4 flex flex-wrap gap-4 justify-center text-sm">
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 rounded-full bg-green-500"></div>
      <span class="text-gray-700 dark:text-gray-300">Excellent</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 rounded-full bg-yellow-500"></div>
      <span class="text-gray-700 dark:text-gray-300">Average</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 rounded-full bg-red-500"></div>
      <span class="text-gray-700 dark:text-gray-300">Poor</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 rounded-full bg-purple-500 border-2 border-purple-700"></div>
      <span class="text-gray-700 dark:text-gray-300">To Predict</span>
    </div>
  </div>

  {#if $showDistances}
    <div class="mt-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
      <p class="text-sm text-gray-700 dark:text-gray-300">
        💜 <strong>Purple lines</strong> show connections to the k-nearest neighbours
      </p>
    </div>
  {/if}
</div>
