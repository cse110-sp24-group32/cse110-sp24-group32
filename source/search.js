import { man } from './index.js'

/**
   * Search for notes that match the query
   * @param {string} query query string in search bar
   * @returns list of notes
   */
function search(query) {
  let match_notes = [];

  for (const [id, note] of Object.entries(man.notes)) {
    if (note.content.includes(query)) {
      match_notes.push(note);
      continue;
    }

    for (const tag in note.tags) {
      console.log(tag)
      if (tag.includes(query)) {
        match_notes.push(note);
        break;
      }
    }
  }

  return match_notes
}

const searchBar = document.getElementById('search-bar');
/*
searchBar.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const match_notes = search(searchBar.value);
    console.log(match_notes)
  }
})*/

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

    // populate search results with placeholders
    for (let i = 1; i < 5; i++) {
      const sr = document.createElement('div')
      sr.className = 'search-result'
      const srTitle = document.createElement('span')
      srTitle.className = 'result-title'
      srTitle.innerText = 'Note Title ' + String(i)
      const srPreview = document.createElement('span')
      srPreview.className = 'result-preview'
      srPreview.innerText = 'This is a preview of the note\'s contents'
      sr.append(srTitle, document.createElement('br'), srPreview)
      resultsContainer.append(sr)
    }

    const match_notes = search(searchBar.value);
    console.log(match_notes)
  }
})