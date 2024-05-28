import { getManagerObject } from './index.js'

import { Manager } from './manager.js'
import { Note } from './notes.js'
import { Template } from './template.js'
import { renderSideBar } from './sidebarFunctionality.js'

document.addEventListener('DOMContentLoaded', init)

let man = null;

async function init() {

  //Init html refs
  const mdv = document.querySelector('.md-view');

  //Get singleton manager
  man = await getManagerObject();

  //Sets up tags for notes
  function setupTagManagement() {
    const MAX_TAGS = 10; // Set the maximum number of tags allowed
    const addButton = document.getElementById('add-tag-button');
    const tagInput = document.getElementById('tag-input');
  
    addButton.addEventListener('click', function () {
      const tag = tagInput.value.trim();
      if (tag && man.curNoteId) { // Ensure there is a current note selected
        const currentNote = man.getNote(man.curNoteId);
        if (currentNote.tags.length < MAX_TAGS) {
          const currNote = man.notes[man.curNoteId];
          currNote.tags.push(tagInput.value);
          man.save();
          man.renderNote();
          renderSideBar(); // Call renderSideBar to update sidebar dynamically
          tagInput.value = ''; // Clear the input field after adding the tag
        } else {
          alert(`Maximum of ${MAX_TAGS} tags allowed.`); // Alert if maximum tag has been exceeded
        }
      } else {
        alert('No note is selected. Please select a note before adding tags.');
      }
    });
  }

  //Actually call it
  setupTagManagement()

  // edit button
  document.querySelector('#edit-button').addEventListener('click', () => {
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

  //functionality to download the note as a json file
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