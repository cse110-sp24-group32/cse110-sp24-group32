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
      if (tag.includes(query)) {
        match_notes.push(note);
        break;
      }
    }
  }

  return match_notes
}

const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const match_notes = search(searchBar.value);
    console.log(match_notes)
  }
})