import { Manager } from './manager.js'
import { Note } from './notes.js'
import { Template } from './template.js'

document.addEventListener('DOMContentLoaded', init)

/*
  man -- Manager object for entire ap
  see manager.js and proj.js and notes.js
  also specs/ADR/backend.md for documentation
*/
let man = null

// entries -- HTML ele ref of note list
let entries = null

// projs -- proj list ref
let projs = null

const templates = {}
function addTemplate (name, note) {
  const cur = new Template(name, note)
  templates[cur.id] = cur
}

// basic notes selection for testing
const buttonHandler = function () {
  man.changeNote(this.id)
}

// INIT -- RUNS UPON PAGE LOAD
// Try to keep only eventListeners and code dependent on page load in here
function init () {
  // example way to add templates
  addTemplate('Default Note', new Note(null, '', 'New Note', []))
  addTemplate('Meeting Note', new Note(null, '# Meeting', 'New Meeting Note', ['meeting']))
  addTemplate('Freeform Note', new Note(null, '# Freeform MD', 'New Freeform MD Note', ['freeform']))
  addTemplate('Design Note', new Note(null, '# Design', 'New Design Note', ['design']))
  addTemplate('Github Note', new Note(null, '# Github', 'New Github Note', ['github']))
  addTemplate('Code Note', new Note(null, '# Code', 'New Code Note', ['code']))

  const mdv = document.querySelector('.md-view')
  man = new Manager(mdv)
  man.renderNote()

  // Populate vars
  entries = document.querySelector('#entries-list')
  projs = document.querySelector('#project-nav')
  const buttonList = document.getElementsByClassName('note-type')

  // Helper func to create HTML objects of note buttons on sidebar
  const createButton = function (note) {
    console.log('ret', note)
    const but = document.createElement('button')
    but.type = 'button'
    but.innerHTML = note.title
    but.id = note.id
    but.addEventListener('click', buttonHandler)
    entries.appendChild(but)
  }

  // Creating HTML objects of project sidebar tiles
  const createProjTile = function (proj) {
    const div = document.createElement('div')
    div.className = 'project-icon'
    div.id = proj.id
    div.textContent = getFirstLetters(proj.name) // Set the text content to 'CS' or any other name
    div.addEventListener('click', function () {
      man.changeProj(div.id)
      renderSideBar()
    })
    projs.prepend(div)
  }

  // Render sidebar
  const renderSideBar = function () {
    while (entries.children.length > 2) {
      entries.removeChild(entries.lastChild)
    }

    while (projs.children.length > 1) {
      projs.removeChild(projs.firstChild)
    }

    for (const note of man.getAllNotes()) {
      if (man.curProjId === note.proj) {
        createButton(note)
      }
    }

    for (const proj of man.getAllProjs()) {
      createProjTile(proj)
    }
  }

  // Actually call it
  renderSideBar();

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

  // enables popup
  document.querySelector('#add-note').addEventListener('click', () => {
    const popup = document.querySelector('.note-popup-container')
    popup.style.display = 'flex'
  })

  // enable popup for making new project
  document.querySelector('#new-project-button').addEventListener('click', () => {
    const popup2 = document.querySelector('.project-popup-container')
    popup2.style.display = 'flex'
  })

  // disables popup
  document.querySelector('#choose-note').addEventListener('click', () => {
    // in practice the template would be selected from some drop down or something, so we'll have the id already
    let selectedButtonID = 'Default'
    for (let i = 0; i < buttonList.length; i++) {
      const button = buttonList[i]
      const buttonID = '#' + button.id
      const noteSelectButton = document.querySelector(buttonID)
      if (noteSelectButton.style.borderColor == 'aqua') {
        selectedButtonID = button.id
      }
    }
    for (const x in templates) {
      if (templates[x].name === selectedButtonID + ' Note') {
        man.addNote(templates[x].note)
        renderSideBar()
      }
    }
    const popup = document.querySelector('.note-popup-container')
    popup.style.display = 'none'
  })

  // changes button border color to indicate selected note
  for (let i = 0; i < buttonList.length; i++) {
    const button = buttonList[i]
    const buttonID = '#' + button.id
    document.querySelector(buttonID).addEventListener('click', () => {
      const noteSelectButton = document.querySelector(buttonID)
      if (noteSelectButton.style.borderColor == 'aqua') {
        noteSelectButton.style.borderColor = 'black'
      } else {
        noteSelectButton.style.borderColor = 'aqua'
        for (let i = 0; i < buttonList.length; i++) {
          const otherButton = buttonList[i]
          const otherButtonID = '#' + otherButton.id
          if (otherButtonID != buttonID) {
            document.querySelector(otherButtonID).style.borderColor = 'black'
          }
        }
      }
    })
  }

  // create new project confirm button clicked
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

  // edit button
  document.querySelector('#edit-button').addEventListener('click', () => {
    editing = !editing
    if (!editing) {
      man.renderNote()
      return
    }
    mdv.innerHTML = ''
    editor.value = man.getNote(man.curNoteId).content
    mdv.appendChild(editor)
  })
  document.querySelector('#delete-button').addEventListener('click', () => {
    man.delNote(man.curNoteId)
    renderSideBar()
  })

  // basic editing functionality for testing
  let editing = false
  const editor = document.createElement('textarea')
  editor.style.width = '99%'
  editor.style.height = '99%'
  editor.addEventListener('input', () => {
    console.log(editor.value, man.curNoteId)
    man.getNote(man.curNoteId).content = editor.value
  })
}

/*
STRING SPLITTING FOR PROJECT TILES
*/

function getFirstLetters (str) {
  // Split the string into an array of words
  const words = str.split(' ')

  // Map over the array and extract the first letter of each word
  const firstLetters = words.map(word => word.charAt(0))

  // Join the extracted letters into a single string
  const result = firstLetters.join('')

  return result
}
