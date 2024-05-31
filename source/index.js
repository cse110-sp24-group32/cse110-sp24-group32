import { Manager } from './manager.js'
import { Note } from './notes.js'
import { Template } from './template.js'

// upon DOMContentLoaded, call init function
document.addEventListener('DOMContentLoaded', init)

/*
The following functions handle passing the singleton manager object to other classes

If you need to retrieve the manager object, use " import { getManagerObject } from './index.js' "
and call upon DOMContentLoad, ex: let man = await getManagerObject();
*/
let manResolve
const manPromise = new Promise((resolve) => {
  manResolve = resolve
})

let man = null

function getManagerObject () {
  return manPromise
}

// Export getter func
export { getManagerObject }

// Called upon page load
function init () {
  const mdv = document.querySelector('.md-view')
  man = new Manager(mdv)
  manResolve(man) // Resolve the promise with the Manager instance
  man.renderNote()

  const searchResultsContainer = document.getElementById('search-results-container')

  document.querySelector('body').addEventListener('click', (event) => {
    if (!searchResultsContainer.classList.contains('hidden') && !searchResultsContainer.contains(event.target)) {
      searchResultsContainer.classList.add('hidden')
    }
  })
}
