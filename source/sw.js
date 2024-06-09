const caches = self.caches
const CACHE_NAME = 'memory-munchers-dev-tools'
const URLs = [
  // Base URL
  'https://cse110-sp24-group32.github.io/cse110-sp24-group32/',

  // CSS files
  'https://cse110-sp24-group32.github.io/cse110-sp24-group32/index.css',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0',
  'https://fonts.googleapis.com/css2?family=Changa:wght@200..800&display=swap',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',

  // JavaScript files
  'https://cse110-sp24-group32.github.io/cse110-sp24-group32/index.js',
  'https://cse110-sp24-group32.github.io/cse110-sp24-group32/search.js',
  'https://cse110-sp24-group32.github.io/cse110-sp24-group32/notesFunctionality.js',
  'https://cse110-sp24-group32.github.io/cse110-sp24-group32/sidebarFunctionality.js',
  'https://cse110-sp24-group32.github.io/cse110-sp24-group32/manager.js',
  'https://cse110-sp24-group32.github.io/cse110-sp24-group32/notes.js',
  'https://cse110-sp24-group32.github.io/cse110-sp24-group32/template.js',
  'https://cse110-sp24-group32.github.io/cse110-sp24-group32/markdown_templates.js',
  'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js',
  'https://cse110-sp24-group32.github.io/cse110-sp24-group32/proj.js',
  'https://cse110-sp24-group32.github.io/cse110-sp24-group32/chatbot.js'

  // Font files
  'https://fonts.gstatic.com/s/materialsymbolsoutlined/v190/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHOejbd5zrDAt.woff2',
  'https://fonts.gstatic.com/s/changa/v27/2-cm9JNi2YuVOUckZpy-eOz1pQ.woff2',

  // Images
  'https://cse110-sp24-group32.github.io/cse110-sp24-group32/memory-munchers-logo.png'
]

// Installs the service worker. Feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLs)
    })
  )
})

// Activates the service worker
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

// Intercept fetch requests and cache them
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return fetch(event.request).then(function (networkResponse) {
        // If the network request is successful, update the cache and return the response
        if (networkResponse.status === 200) {
          cache.put(event.request, networkResponse.clone())
        }
        return networkResponse
      }).catch(function () {
        // If the network request fails, return the cached response if available
        return cache.match(event.request)
      })
    })
  )
})
