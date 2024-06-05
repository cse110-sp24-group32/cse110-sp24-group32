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
}

// Populate later
let entries = null
let projs = null
let man = null

// Basic notes selection for testing
export const buttonHandler = function () {
  man.changeNote(this.id)
}

function adjustWidth (element) {
  const sidebarEntry = document.querySelector('#entries-list')
  const contentPage = document.querySelector('#content')
  const projNav = document.querySelector('#project-nav')
  const rightContent = document.querySelector('#right-content')

  const displayVal = window.getComputedStyle(rightContent).display
  const totalWidth = contentPage.offsetWidth
  const availableWidth = totalWidth

  if (element === 'note' && displayVal !== 'none') {
    sidebarEntry.style.display = 'none'
    projNav.style.display = 'none'
    rightContent.style.display = 'flex'
  } else {
    sidebarEntry.style.width = `${availableWidth}px`
  }
}

function toggleSidebar () {
  const sidebarEntry = document.querySelector('#entries-list')
  const projNav = document.querySelector('#project-nav')
  const rightContent = document.querySelector('#right-content')

  const sidebarDisplayVal = window.getComputedStyle(sidebarEntry).display
  const rightContentDisplayVal = window.getComputedStyle(rightContent).display

  if (sidebarDisplayVal === 'none') {
    sidebarEntry.style.display = 'block'
    projNav.style.display = 'block'
    rightContent.style.display = 'none'
    adjustWidth('project')
  } else {
    sidebarEntry.style.display = 'none'
    projNav.style.display = 'none'
    rightContent.style.display = 'flex'
  }

  if (this.id === 'choose-note' && rightContentDisplayVal !== 'none') {
    resetView()
  }

  console.log('obj: ', this.id)
}

function resetView () {
  const sidebarEntry = document.querySelector('#entries-list')
  const projNav = document.querySelector('#project-nav')
  const rightContent = document.querySelector('#right-content')
  const entryButtons = document.querySelectorAll('.entryButton')

  const displayVal = window.getComputedStyle(sidebarEntry).display

  if (displayVal === 'none') {
    sidebarEntry.style.display = 'block'
    projNav.style.display = 'block'
    adjustWidth()
  } else {
    rightContent.style.display = 'flex'
  }

  entryButtons.forEach(function (entryButton) {
    entryButton.removeEventListener('click', toggleSidebar)
  })

  document.querySelector('.team-logo').removeEventListener('click', toggleSidebar)
  document.querySelector('#entries-list').style.width = '280px'
  document.querySelector('#right-content').style.display = 'flex'
}

async function init () {
  // Retrieve singleton manager object
  man = await getManagerObject() // Wait for the Manager instance to be initialized

  // Constant HTML element refs
  entries = document.querySelector('#entries-list')
  projs = document.querySelector('#project-nav')
  const buttonList = document.getElementsByClassName('note-type')

  /*
  Template content is in the second argument of Note constructor
  */

  addTemplate('Default Note', new Note(null, '', 'New Note', []))
  addTemplate('Meeting Note', new Note(null, MEETING_NOTES, 'New Meeting Note', ['meeting']))
  addTemplate('Freeform Note', new Note(null, FREEFORM_MD, 'New Freeform MD Note', ['freeform']))
  addTemplate('Design Note', new Note(null, DESIGN_NOTES, 'New Design Note', ['design']))
  addTemplate('Github Note', new Note(null, GITHUB_NOTES, 'New Github Note', ['github']))
  addTemplate('Code Note', new Note(null, CODE_AND_BUG_SNIPPETS, 'New Code Note', ['code']))

  /**
   * Creates a note button for a given note (sidebar).
   * @param {object} note - The note object.
   */
  const createButton = function (note) {
    console.log('ret', note)
    const but = document.createElement('button')
    but.type = 'button'
    but.innerHTML = note.title
    but.id = note.id
    but.className = 'entryButton'
    but.addEventListener('click', buttonHandler)
    but.addEventListener('click', toggleSidebar)
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

    console.log(man)
    const notesByFirstTag = man.getNotesGroupedByFirstTag()

    for (const [firstTag, notes] of Object.entries(notesByFirstTag)) {
      const filteredNotes = notes.filter(note => man.curProjId === note.proj)

      if (filteredNotes.length > 0) {
        const tagHeader = document.createElement('h3')
        tagHeader.style.textAlign = 'center'
        tagHeader.textContent = firstTag
        entries.appendChild(tagHeader)

        for (const note of filteredNotes) {
          createButton(note)
        }
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
    }
  })

  document.querySelector('#new-project-button').addEventListener('click', () => {
    const popup2 = document.querySelector('.project-popup-container')
    popup2.style.display = 'flex'
  })

  document.querySelector('#choose-note').addEventListener('click', () => {
    let selectedButtonID = 'Default'
    for (let i = 0; i < buttonList.length; i++) {
      const button = buttonList[i]
      const buttonID = '#' + button.id
      const noteSelectButton = document.querySelector(buttonID)
      if (noteSelectButton.style.borderColor === 'aqua') {
        selectedButtonID = button.id
      }
    }
    for (const x in templates) {
      if (templates[x].name === selectedButtonID + ' Note') {
        const noteToAdd = JSON.parse(JSON.stringify(templates[x].note))
        noteToAdd.title = document.querySelector('#note-input').value
        man.addNote(noteToAdd)
        renderSideBar()
      }
    }
    const popup = document.querySelector('.note-popup-container')
    popup.style.display = 'none'
  })

  document.querySelector('#choose-note').addEventListener('click', toggleSidebar)

  for (let i = 0; i < buttonList.length; i++) {
    const button = buttonList[i]
    const buttonID = '#' + button.id
    document.querySelector(buttonID).addEventListener('click', () => {
      const noteSelectButton = document.querySelector(buttonID)
      if (noteSelectButton.style.borderColor === 'aqua') {
        noteSelectButton.style.borderColor = 'black'
      } else {
        noteSelectButton.style.borderColor = 'aqua'
        for (let i = 0; i < buttonList.length; i++) {
          const otherButton = buttonList[i]
          const otherButtonID = '#' + otherButton.id
          if (otherButtonID !== buttonID) {
            document.querySelector(otherButtonID).style.borderColor = 'black'
          }
        }
      }
    })
  }

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

  if (window.innerWidth <= 900) {
    document.querySelector('.team-logo').addEventListener('click', toggleSidebar)
  }
}

window.addEventListener('resize', () => {
  if (window.innerWidth <= 900) {
    document.querySelector('.team-logo').addEventListener('click', toggleSidebar)

    const entryButtons = document.querySelectorAll('.entryButton')

    entryButtons.forEach(function (entryButton) {
      entryButton.addEventListener('click', toggleSidebar)
    })
    adjustWidth('note')
  } else {
    resetView()
  }
})

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
