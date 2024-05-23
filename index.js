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

function setupTagManagement() {
  const MAX_TAGS = 10;  // Set the maximum number of tags allowed
  const addButton = document.getElementById('add-tag-button');
  const tagInput = document.getElementById('tag-input');
  const tagsContainer = document.getElementById('tags-container');

  addButton.addEventListener('click', function() {
      const tag = tagInput.value.trim();
      if (tag && man.curNoteId) { // Ensure there is a current note selected
        const currentNote = man.getNote(man.curNoteId);
        if (currentNote.tags.length < MAX_TAGS) {
          man.addTagToNote(man.curNoteId, tag); // Add tag to the current note
          tagInput.value = ''; // Clear the input field after adding the tag
          displayTags(currentNote.tags);
        } else {
          alert(`Maximum of ${MAX_TAGS} tags allowed.`); //alert if maximum tag has been exceeded
        }
      } else {
        alert("No note is selected. Please select a note before adding tags.");
      }
  });
}

//displas the tags 
function displayTags(tags) {
  const tagsContainer = document.getElementById('tags-container');
  tagsContainer.innerHTML = ''; // Clear previous tags
  tags.forEach(tag => {
    const tagSpan = document.createElement('span');
    tagSpan.className = 'tag';
    tagSpan.textContent = tag;
    
    // Create a delete button for each tag
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.className = 'delete-tag-button';
    deleteButton.addEventListener('click', function() {
      if (man.curNoteId) {
        man.removeTagFromNote(man.curNoteId, tag); // Remove tag from the current note
        displayTags(man.getNote(man.curNoteId).tags); // Refresh the displayed tags
      }
    });
    
    tagSpan.appendChild(deleteButton);
    tagsContainer.appendChild(tagSpan);
  });
}



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

  // basic notes selection for testing
  const entries = document.querySelector('#entries-list')
  const buttonHandler = function () {
    man.changeNote(this.id);
    displayTags(man.getNote(this.id).tags);  // Update tags display when a note is selected
    localStorage.setItem('currentNoteId', this.id); // Save current note ID to localStorage

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
  setupTagManagement();

  const buttonList = document.getElementsByClassName('note-type')

  document.querySelector('.note-popup-container').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.note-popup-container')) {
      const popup = document.querySelector('.note-popup-container')
      popup.style.display = 'none'
    }
  })

  // enables popup
  document.querySelector('#add-note').addEventListener('click', () => {
    const popup = document.querySelector('.note-popup-container')
    popup.style.display = 'flex'
  })

  // disables popup
  document.querySelector('#choose-note').addEventListener('click', () => {
    // in practice the template would be selected from some drop down or something, so we'll have the id already
    let selectedButtonID = 'Default'
    for(let i = 0; i < buttonList.length; i++) {
      const button = buttonList[i]
      const buttonID = '#' + button.id
      const noteSelectButton = document.querySelector(buttonID)
      if (noteSelectButton.style.borderColor == 'aqua') {
        selectedButtonID = button.id
      }
    } 
    for (const x in templates) {
      if (templates[x].name === selectedButtonID + ' Note') {
        //adds a new note with empty tags
        const newNote = new Note(null, templates[x].note.content, templates[x].note.title, []); // Create a new note with empty tags
        man.addNote(newNote);
        refreshSide();
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
      if(noteSelectButton.style.borderColor == 'aqua') {
        noteSelectButton.style.borderColor = 'black'
      } else {
        noteSelectButton.style.borderColor = 'aqua'
        for (let i = 0; i < buttonList.length; i++) {
          const otherButton = buttonList[i]
          const otherButtonID = '#' + otherButton.id
          if(otherButtonID != buttonID) {
            document.querySelector(otherButtonID).style.borderColor = 'black'
          }
        }
      }
    })
  }

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



