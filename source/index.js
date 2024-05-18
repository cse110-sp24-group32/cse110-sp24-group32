import { Manager } from './manager.js'
import { Note } from './notes.js'
import { Template } from './template.js'

document.addEventListener('DOMContentLoaded', init)
let man = null

const templates = {}
function addTemplate (name, note) {
  const cur = new Template(name, note)
  templates[cur.id] = cur
}

function init () {
  // example way to add templates
  addTemplate('Default Note', new Note(null, '', 'New Note', []))
  addTemplate('Meeting Note', new Note(null, '# Meeting', 'New Meeting Note', ['meeting']))

  const mdv = document.querySelector('.md-view')
  man = new Manager(mdv)
  man.renderNote()

  // basic notes selection for testing
  const entries = document.querySelector('#entries-list')
  const buttonHandler = function () {
    man.changeNote(this.id)
  }

  const createButton = function (note) {
    console.log('ret', note)
    const but = document.createElement('button')
    but.type = 'button'
    but.innerHTML = note.title
    but.id = note.id
    but.addEventListener('click', buttonHandler)
    entries.appendChild(but)
  }

  const refreshSide = function() {
    while(entries.children.length > 1){
      entries.removeChild(entries.lastChild)
    }
    for (const note of man.getAllNotes()) {
      createButton(note)
    }
  }
  refreshSide()

  document.querySelector('#add-note').addEventListener('click', () => {
    // in practice the template would be selected from some drop down or something, so we'll have the id already
    for (const x in templates) {
      if (templates[x].name === 'Meeting Note') {
        man.addNote(templates[x].note)
        refreshSide()
      }
    }
  })

  // basic editing functionality for testing
  let editing = false
  const editor = document.createElement('textarea')
  editor.addEventListener('input', () => {
    console.log(editor.value, man.curNoteId)
    man.getNote(man.curNoteId).content = editor.value
  })
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
    refreshSide()
  })
}
