import { man } from './index.js'

/**
   * Search for notes that match the query
   * @param {string} query query string in search bar
   * @returns list of notes
   */
function search(query) {
  let match_notes = [];
  query = query.toLowerCase();

  for (const [i, note] of Object.entries(man.notes)) {
    if (note.content.toLowerCase().includes(query)) {
      match_notes.push(note);
      continue;
    }

    for (const tag of note.tags) {
      if (tag.includes(query)) {
        match_notes.push(note);
        break;
      }
    }
  }

  return match_notes
}

const searchBar = document.getElementById('search-bar');

// search bar functionality
// listens for keyup, runs search if it's the Enter key
searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchBar.blur()

    // if search term is empty, don't display results
    if (searchBar.value.length === 0) { return }

    const resultsContainer = document.getElementById('search-results-container')
    //document.getElementById('note-view').classList.add('hidden')

    // clear results
    resultsContainer.textContent = '';
    resultsContainer.classList.remove('hidden');

    // get search bar element
    const match_notes = search(searchBar.value);

    // populate search results with placeholders
    for (const note of match_notes) {
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
        man.changeNote(note.id);
        resultsContainer.classList.add('hidden');
      })

      resultsContainer.append(sr)
    }
  }
})