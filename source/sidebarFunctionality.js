import { getManagerObject } from './index.js'
import { Note } from './notes.js'
import { Template } from './template.js'
import { MEETING_NOTES, FREEFORM_MD, DESIGN_NOTES, GITHUB_NOTES, CODE_AND_BUG_SNIPPETS } from './markdown_templates.js'

document.addEventListener('DOMContentLoaded', init)

// Export so other files can use renderSideBar

export let renderSideBar = null

// All templates
const templates = {}

/**
 * Helper function to add a template.
 * @param {string} name - The name of the template.
 * @param {object} note - The note object.
 */
function addTemplate (name, note) {
  const cur = new Template(name, note)
  templates[cur.id] = cur
  return cur.id
}

// Populate later
let entries = null
let projs = null
let man = null

// Basic notes selection for testing
export const buttonHandler = function () {
  man.changeNote(this.id)
}

async function init () {
  // Retrieve singleton manager object
  man = await getManagerObject() // Wait for the Manager instance to be initialized

  // Constant HTML element refs
  entries = document.querySelector('#entries-list')
  projs = document.querySelector('#project-nav')

  /*
  Template content is in the second argument of Note constructor
  */

  const defaultNoteId = addTemplate('Default Note', new Note(null, '', 'New Note', []))
  addTemplate('Meeting Note', new Note(null, MEETING_NOTES, 'New Meeting Note', ['meeting']))
  addTemplate('Freeform Note', new Note(null, FREEFORM_MD, 'New Freeform MD Note', ['freeform']))
  addTemplate('Design Note', new Note(null, DESIGN_NOTES, 'New Design Note', ['design']))
  addTemplate('Github Note', new Note(null, GITHUB_NOTES, 'New Github Note', ['github']))
  addTemplate('Code Note', new Note(null, CODE_AND_BUG_SNIPPETS, 'New Code Note', ['code']))

  // populate select-note div
  const selectNote = document.querySelector('.select-note')
  const SELECTED_COL = '#58fcfc'
  const OTHER_COL = '#00818A'

  let selectedBut = null

  // We'll skip adding the default note, to preserve the previous behaviour.
  // May want to change this later.
  for (const id in templates) {
    if (id !== defaultNoteId) {
    // <button type="button", class="note-type", id="Meeting">Meeting</button>
      const but = document.createElement('button')
      but.type = 'button'
      but.className = 'note-type'

      // query selector doesn't work well with UUIDs
      but.tempId = id
      but.innerHTML = templates[id].name

      // fix for legacy tests
      but.id = templates[id].name.split(' ')[0]
      // we need to put the notes BEFORE the button
      selectNote.before(but)

      // use normal function to get correct this
      but.addEventListener('click', function () {
        if (this === selectedBut) {
          this.style.backgroundColor = OTHER_COL
          selectedBut = null
        } else {
          this.style.backgroundColor = SELECTED_COL
          if (selectedBut) selectedBut.style.backgroundColor = OTHER_COL
          selectedBut = this
        }
      })
    }
  }

  /**
   * Creates a note button for a given note (sidebar).
   * @param {object} note - The note object.
   */
  const createButton = function (note) {
    const but = document.createElement('button')
    but.type = 'button'
    but.innerHTML = note.title
    but.id = note.id
    but.className = 'entry-button'
    but.addEventListener('click', buttonHandler)
    entries.appendChild(but)
  }

  /**
   * Creates a project UI element given a project object.
   * @param {object} proj - The project object.
   */
  const createProjTile = function (proj) {
    const div = document.createElement('div')
    div.className = 'project-icon'
    div.id = proj.id
    div.textContent = getFirstLetters(proj.name)
    div.addEventListener('click', function () {
      man.changeProj(div.id)
      renderSideBar()
    })

    const close = document.createElement('button')
    close.textContent = 'x'
    close.className = 'proj-delete-button'
    close.addEventListener('click', function (event) {
      event.stopPropagation()
      const popup = document.querySelector('.project-delete-popup-container')
      const delBut = document.getElementById('confirm-delete-project')
      delBut.addEventListener('click', e => {
        man.delProj(div.id)
        div.remove()
        popup.style.display = 'none'
      })
      popup.style.display = 'flex'
    })
    div.appendChild(close)

    projs.prepend(div)
  }

  /**
   * Renders the elements of the side bar according to the current project id selected.
   */
  renderSideBar = function () {
    while (entries.children.length > 2) {
      entries.removeChild(entries.lastChild)
    }

    while (projs.children.length > 1) {
      projs.removeChild(projs.firstChild)
    }

    const notesByFirstTag = man.getNotesGroupedByFirstTag()
    const arr = Object.keys(notesByFirstTag)
    // let's put the no tag notes first :P
    arr.sort()
    for (const firstTag of arr) {
      const filteredNotes = notesByFirstTag[firstTag].filter(note => man.curProjId === note.proj)
      // don't make header for untagged notes
      // TODO: add spacing
      if (filteredNotes.length > 0 && firstTag.length) {
        const tagHeader = document.createElement('h3')
        tagHeader.style.textAlign = 'center'
        tagHeader.textContent = firstTag
        entries.appendChild(tagHeader)
      }
      for (const note of filteredNotes) {
        createButton(note)
      }
    }

    for (const proj of man.getAllProjs()) {
      createProjTile(proj)
    }
  }

  renderSideBar()
  /*
  EVENT LISTENERS FOR CLICKS
  */

  document.querySelector('.note-popup-container').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.note-popup-container')) {
      const popup = document.querySelector('.note-popup-container')
      popup.style.display = 'none'
    }
  })

  document.querySelector('.project-popup-container').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.project-popup-container')) {
      const popup = document.querySelector('.project-popup-container')
      popup.style.display = 'none'
    }
  })

  document.querySelector('.project-delete-popup-container').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.project-delete-popup-container')) {
      const popup = document.querySelector('.project-delete-popup-container')
      popup.style.display = 'none'
    }
  })

  document.getElementById('cancel-delete-project').addEventListener('click', e => {
    const popup = document.querySelector('.project-delete-popup-container')
    popup.style.display = 'none'
  })

  document.querySelector('#add-note').addEventListener('click', () => {
    const popup = document.querySelector('.note-popup-container')

    if (man.curProjId == null) {
      alert('Must select project before adding note')
    } else {
      popup.style.display = 'flex'
      // clear previous selections
      // I don't like this duplication...
      if (selectedBut) selectedBut.style.backgroundColor = OTHER_COL
      selectedBut = null
      document.querySelector('#note-input').value = ''
    }
  })

  document.querySelector('#new-project-button').addEventListener('click', () => {
    const popup2 = document.querySelector('.project-popup-container')
    popup2.style.display = 'flex'
  })

  document.querySelector('#choose-note').addEventListener('click', () => {
    const id = selectedBut ? selectedBut.tempId : defaultNoteId
    const noteToAdd = JSON.parse(JSON.stringify(templates[id].note))
    noteToAdd.title = document.querySelector('#note-input').value
    man.addNote(noteToAdd)
    renderSideBar()

    const popup = document.querySelector('.note-popup-container')
    popup.style.display = 'none'
  })

  document.querySelector('#confirm-new-project').addEventListener('click', () => {
    const projName = document.querySelector('#project-input').value

    const popup = document.querySelector('.project-popup-container')
    popup.style.display = 'none'

    const createdProj = man.addProj(projName)
    man.changeProj(createdProj.id)
    createProjTile(createdProj)

    man.save()
    renderSideBar()
  })
}

/**
 * For creating project tiles, extracts the first letter of each word in the project name and returns them as a string.
 * @param {string} str - The project name.
 * @returns {string} The first letters of each word in the project name.
 */
function getFirstLetters (str) {
  const words = str.split(' ')

  const firstLetters = words.map(word => word.charAt(0))

  const result = firstLetters.join('')

  return result
}
