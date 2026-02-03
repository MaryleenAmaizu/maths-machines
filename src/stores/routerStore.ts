import { writable } from 'svelte/store'

export type Page = 'home' | 'linear-regression' | 'knn'

export const currentPage = writable<Page>('home')

export function navigateTo(page: Page) {
  currentPage.set(page)
  window.scrollTo(0, 0)
}
