import { getManagerObject } from './index.js'

let man = null

document.addEventListener('DOMContentLoaded', init)

async function init () {
  man = await getManagerObject() // Wait for the Manager instance to be initialized
}

/**
 * Search for notes that match the query.
 * @param {string} query - The query string in the search bar.
 * @returns {Array} List of matching notes.
 */
function search (query) {
  const matchNotes = []
  query = query.toLowerCase()

  for (const [, note] of Object.entries(man.notes)) {
    if (note.content.toLowerCase().includes(query)) {
      matchNotes.push(note)
      continue
    }

    for (const tag of note.tags) {
      if (tag.includes(query)) {
        matchNotes.push(note)
        break
      }
    }
  }

  return matchNotes
}

const searchBar = document.getElementById('search-bar')

// Search bar functionality: listens for keyup, runs search if it's the Enter key
searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchBar.blur()

    // If search term is empty, don't display results
    if (searchBar.value.length === 0) { return }

    const resultsContainer = document.getElementById('search-results-container')

    // Clear results
    resultsContainer.textContent = ''
    resultsContainer.classList.remove('hidden')

    // Get search bar element
    const matchNotes = search(searchBar.value)

    if (matchNotes.length === 0) {
      const sr = document.createElement('div')
      sr.className = 'search-result'
      const srTitle = document.createElement('span')
      srTitle.className = 'result-title'
      srTitle.innerText = 'no matching result'
      sr.append(srTitle)
      resultsContainer.append(sr)
    }

    // Populate search results with placeholders
    for (const note of matchNotes) {
      const sr = document.createElement('div')
      sr.className = 'search-result'
      const srTitle = document.createElement('span')
      srTitle.className = 'result-title'
      srTitle.innerText = note.title
      const srPreview = document.createElement('span')
      srPreview.className = 'result-preview'
      srPreview.innerText = note.content.slice(0, 100)
      sr.append(srTitle, document.createElement('br'), srPreview)
      sr.addEventListener('click', (event) => {
        man.changeNote(note.id)
        resultsContainer.classList.add('hidden')
      })

      resultsContainer.append(sr)
    }
  }
})
