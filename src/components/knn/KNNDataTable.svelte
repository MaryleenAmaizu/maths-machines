<script lang="ts">
  import { students, newStudent } from '../../stores/knnStore'
  
  let editingCell: { row: number; col: string } | null = null
  let editValue = ''

  function startEdit(index: number, column: string, currentValue: number) {
    editingCell = { row: index, col: column }
    editValue = currentValue.toString()
  }

  function saveEdit() {
    if (!editingCell) return

    const newValue = parseFloat(editValue)
    if (isNaN(newValue) || newValue < 0 || newValue > 10) {
      editingCell = null
      return
    }

    if (editingCell.row === -1) {
      // Editing new student
      newStudent.update(s => ({
        ...s,
        [editingCell!.col]: newValue
      }))
    } else {
      // Editing existing student
      students.update(items => {
        const newItems = [...items]
        const student = newItems[editingCell!.row]
        if (editingCell!.col === 'maths') {
          student.maths = newValue
        } else if (editingCell!.col === 'english') {
          student.english = newValue
        }
        return newItems
      })
    }

    editingCell = null
  }

  function cancelEdit() {
    editingCell = null
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      saveEdit()
    } else if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  function getGradeColor(grade: string | null) {
    if (grade === 'Excellent') return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
    if (grade === 'Average') return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
    if (grade === 'Poor') return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
    return 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    📊 Student Scores Dataset
  </h2>
  
  <div class="overflow-x-auto">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-green-100 dark:bg-green-900">
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Student</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Maths (0-10)</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">English (0-10)</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Grade</th>
        </tr>
      </thead>
      <tbody>
        {#each $students as student, i}
          <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition">
            <td class="px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">{student.name}</td>
            
            <!-- Maths Cell -->
            <td class="px-4 py-3 text-gray-800 dark:text-gray-200 font-mono">
              {#if editingCell?.row === i && editingCell?.col === 'maths'}
                <input
                  type="number"
                  bind:value={editValue}
                  on:keydown={handleKeyDown}
                  on:blur={saveEdit}
                  class="w-20 px-2 py-1 border-2 border-green-500 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  autofocus
                  min="0"
                  max="10"
                />
              {:else}
                <button
                  on:click={() => startEdit(i, 'maths', student.maths)}
                  class="hover:bg-green-100 dark:hover:bg-green-900 px-2 py-1 rounded transition cursor-pointer"
                  title="Click to edit"
                >
                  {student.maths}
                </button>
              {/if}
            </td>
            
            <!-- English Cell -->
            <td class="px-4 py-3 text-gray-800 dark:text-gray-200 font-mono">
              {#if editingCell?.row === i && editingCell?.col === 'english'}
                <input
                  type="number"
                  bind:value={editValue}
                  on:keydown={handleKeyDown}
                  on:blur={saveEdit}
                  class="w-20 px-2 py-1 border-2 border-green-500 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  autofocus
                  min="0"
                  max="10"
                />
              {:else}
                <button
                  on:click={() => startEdit(i, 'english', student.english)}
                  class="hover:bg-green-100 dark:hover:bg-green-900 px-2 py-1 rounded transition cursor-pointer"
                  title="Click to edit"
                >
                  {student.english}
                </button>
              {/if}
            </td>
            
            <!-- Grade -->
            <td class="px-4 py-3">
              <span class="px-3 py-1 rounded-full text-sm font-medium {getGradeColor(student.grade)}">
                {student.grade}
              </span>
            </td>
          </tr>
        {/each}
        
        <!-- New Student Row -->
        <tr class="border-t-2 border-purple-400 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/20">
          <td class="px-4 py-3 text-purple-700 dark:text-purple-300 font-bold">{$newStudent.name}</td>
          
          <!-- Maths Cell -->
          <td class="px-4 py-3 text-gray-800 dark:text-gray-200 font-mono">
            {#if editingCell?.row === -1 && editingCell?.col === 'maths'}
              <input
                type="number"
                bind:value={editValue}
                on:keydown={handleKeyDown}
                on:blur={saveEdit}
                class="w-20 px-2 py-1 border-2 border-purple-500 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                autofocus
                min="0"
                max="10"
              />
            {:else}
              <button
                on:click={() => startEdit(-1, 'maths', $newStudent.maths)}
                class="hover:bg-purple-100 dark:hover:bg-purple-900 px-2 py-1 rounded transition cursor-pointer font-bold"
                title="Click to edit"
              >
                {$newStudent.maths}
              </button>
            {/if}
          </td>
          
          <!-- English Cell -->
          <td class="px-4 py-3 text-gray-800 dark:text-gray-200 font-mono">
            {#if editingCell?.row === -1 && editingCell?.col === 'english'}
              <input
                type="number"
                bind:value={editValue}
                on:keydown={handleKeyDown}
                on:blur={saveEdit}
                class="w-20 px-2 py-1 border-2 border-purple-500 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                autofocus
                min="0"
                max="10"
              />
            {:else}
              <button
                on:click={() => startEdit(-1, 'english', $newStudent.english)}
                class="hover:bg-purple-100 dark:hover:bg-purple-900 px-2 py-1 rounded transition cursor-pointer font-bold"
                title="Click to edit"
              >
                {$newStudent.english}
              </button>
            {/if}
          </td>
          
          <!-- Grade -->
          <td class="px-4 py-3">
            <span class="px-3 py-1 rounded-full text-sm font-bold {getGradeColor($newStudent.grade)}">
              {$newStudent.grade || '?'}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
    <p class="text-sm text-gray-700 dark:text-gray-300">
      💡 <strong>New Student:</strong> Student 8 (Study Hours: 4, Sleep Hours: 8) has an unknown grade. Can you predict it using the k-nearest neighbours?
    </p>
  </div>
</div>
