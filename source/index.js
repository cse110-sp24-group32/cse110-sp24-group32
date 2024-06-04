import { Manager } from './manager.js'

/**
 * Handles passing the singleton manager object to other classes.
 * If you need to retrieve the manager object, use " import { getManagerObject } from './index.js' "
 * and call upon DOMContentLoad, ex: let man = await getManagerObject();
 */

document.addEventListener('DOMContentLoaded', init)

let manResolve
const manPromise = new Promise((resolve) => {
  manResolve = resolve
})

let man = null

/**
 * Retrieves the manager object.
 * @returns {Promise} The manager object.
 */
function getManagerObject () {
  return manPromise
}

// Export getter func
export { getManagerObject }

/**
 * Called upon page load to initialize the application.
 */
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

  // REGISTER SERVICE WORKERS

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async function () {
      try {
        const registration = await navigator.serviceWorker.register('sw.js', {
          scope: '/source/'
        })

        if (registration.active) {
          console.log('Successfully registered service worker')
        }
      } catch (err) {
        console.log('Service worker failed')
      }
    })
  }
}
