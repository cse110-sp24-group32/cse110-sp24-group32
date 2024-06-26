import { getManagerObject } from './index.js'
import { renderSideBar } from './sidebarFunctionality.js'

document.addEventListener('DOMContentLoaded', init)

let man = null

async function init () {
  // Init HTML references
  const mdv = document.querySelector('.md-view')

  // Get singleton manager
  man = await getManagerObject()

  /**
   * Sets up tag management for notes.
   */
  function setupTagManagement () {
    const MAX_TAGS = 10 // Set the maximum number of tags allowed
    const addButton = document.getElementById('add-tag-button')
    const tagInput = document.getElementById('tag-input')

    addButton.addEventListener('click', function () {
      const tag = tagInput.value.trim()
      if (tag && man.curNoteId) { // Ensure there is a current note selected
        const currentNote = man.getNote(man.curNoteId)
        if (currentNote.tags.length < MAX_TAGS) {
          const currNote = man.notes[man.curNoteId]
          currNote.tags.push(tagInput.value)
          man.save()
          man.renderNote()
          renderSideBar() // Call renderSideBar to update sidebar dynamically
          tagInput.value = '' // Clear the input field after adding the tag
        } else {
          alert(`Maximum of ${MAX_TAGS} tags allowed.`) // Alert if maximum tag has been exceeded
        }
      } else if (!man.curNoteId) {
        alert('No note is selected. Please select a note before adding tags.')
      } else {
        // don't add an empty tag
      }
    })
  }

  // Actually call it

  setupTagManagement()
  renderSideBar()

  // Edit button
  document.querySelector('#edit-button').addEventListener('click', () => {
    // can't edit with no note selected....
    if (!man.curNoteId) return
    editing = !editing
    if (!editing) {
      document.getElementById('edit-button').innerText = 'Edit'
      man.renderNote()
      return
    } else {
      document.getElementById('edit-button').innerText = 'Done'
    }
    mdv.innerHTML = ''
    editor.value = man.getNote(man.curNoteId).content
    mdv.appendChild(editor)
  })
  document.querySelector('#delete-button').addEventListener('click', () => {
    man.delNote(man.curNoteId)
    renderSideBar()
  })

  // Functionality to download the note as a JSON file
  document.querySelector('#export-button').addEventListener('click', () => {
    const note = man.getNote(man.curNoteId)
    if (note) {
      const noteJson = JSON.stringify(note, null, 2)
      const blob = new Blob([noteJson], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${note.title}.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  })

  // Functionality to download all notes as a JSON file
  document.querySelector('#export-all-button').addEventListener('click', () => {
    const notesData = JSON.parse(localStorage.getItem('notes-data'))
    if (notesData != null) {
      const notesBlob = new Blob([JSON.stringify(notesData, null, 2)], { type: 'application/json' })
      const downloadLink = document.createElement('a')
      downloadLink.href = URL.createObjectURL(notesBlob)
      downloadLink.download = 'notes-data.json'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    } else {
      alert('Nothing to export')
    }
  })

  // Functionality to import all notes from a JSON file
  const fileInput = document.querySelector('#file-input')

  document.querySelector('#import-all-button').addEventListener('click', () => {
    fileInput.click()
  })

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const importedData = JSON.parse(e.target.result)
        // Ensure importedData has the expected structure
        if (!importedData.notes || typeof importedData.notes !== 'object') {
          console.error('Imported data does not contain a valid notes object.')
          return
        }
        if (!importedData.projs || typeof importedData.projs !== 'object') {
          console.error('Imported data does not contain a valid projs object.')
          return
        }

        // Clear existing notes, projects, and local storage
        man.notes = {}
        man.projs = {}
        man.curNoteId = null
        man.curProjId = null
        localStorage.removeItem('notes-data')

        // Add new notes
        for (const noteId in importedData.notes) {
          if (Object.prototype.hasOwnProperty.call(importedData.notes, noteId)) {
            const note = importedData.notes[noteId]
            const validNote = {
              id: note.id,
              proj: note.proj,
              content: note.content || '',
              title: note.title || 'Untitled',
              tags: Array.isArray(note.tags) ? note.tags : ['Freeform MD Note']
            }

            man.notes[note.id] = new Proxy(validNote, man.saveHandler)
          }
        }

        // Add new projects
        for (const projId in importedData.projs) {
          if (Object.prototype.hasOwnProperty.call(importedData.projs, projId)) {
            man.projs[projId] = importedData.projs[projId]
          }
        }

        // Update current note and project IDs
        man.curNoteId = importedData.curNoteId || null
        man.curProjId = importedData.curProjId || null

        // Save the new state to localStorage
        man.save()

        // Re-render the UI
        man.renderNote()
        man.renderProject()
        renderSideBar()
      }
      reader.readAsText(file)
    }
  })

  // Basic editing functionality for testing
  let editing = false
  const editor = document.createElement('textarea')
  editor.style.width = '99%'
  editor.style.height = '99%'
  editor.addEventListener('input', () => {
    man.getNote(man.curNoteId).content = editor.value
  })
}
