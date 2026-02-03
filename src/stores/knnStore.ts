import { writable } from 'svelte/store'

export interface Student {
  id: number
  name: string
  maths: number
  english: number
  grade: 'Excellent' | 'Average' | 'Poor' | null
}

export const students = writable<Student[]>([
  { id: 1, name: 'Student 1', maths: 9, english: 8, grade: 'Excellent' },
  { id: 2, name: 'Student 2', maths: 8, english: 8, grade: 'Excellent' },
  { id: 3, name: 'Student 3', maths: 7, english: 6, grade: 'Average' },
  { id: 4, name: 'Student 4', maths: 6, english: 6, grade: 'Average' },
  { id: 5, name: 'Student 5', maths: 5, english: 5, grade: 'Average' },
  { id: 6, name: 'Student 6', maths: 4, english: 3, grade: 'Poor' },
  { id: 7, name: 'Student 7', maths: 3, english: 4, grade: 'Poor' },
])

export const newStudent = writable<Student>({
  id: 8,
  name: 'Student 8',
  maths: 4,
  english: 8,
  grade: null
})

export const kValue = writable<number>(3)
export const showDistances = writable<boolean>(false)
export const predictedGrade = writable<'Excellent' | 'Average' | 'Poor' | null>(null)

export interface DistanceResult {
  student: Student
  distance: number
  isNeighbor: boolean
}

export const distanceResults = writable<DistanceResult[]>([])
