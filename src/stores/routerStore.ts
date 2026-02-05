import { writable } from 'svelte/store'

export type Page = 'home' | 'linear-regression' | 'knn' | 'generative'

// Get initial page from URL
function getPageFromUrl(): Page {
  if (typeof window === 'undefined') return 'home'
  
  const path = window.location.pathname
  if (path.includes('/linear-regression')) return 'linear-regression'
  if (path.includes('/knn')) return 'knn'
  if (path.includes('/generative')) return 'generative'
  return 'home'
}

export const currentPage = writable<Page>(getPageFromUrl())

export function navigateTo(page: Page) {
  currentPage.set(page)
  
  // Update URL without reloading
  const url = page === 'home' ? '/' : `/${page}`
  if (typeof window !== 'undefined') {
    window.history.pushState({ page }, '', url)
  }
  
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
  }
}

// Handle browser back/forward buttons
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', (event) => {
    const page = event.state?.page || getPageFromUrl()
    currentPage.set(page)
  })
}
