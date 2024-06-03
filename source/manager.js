import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'
import { Note } from './notes.js'
import { Project } from './proj.js'
import { renderSideBar } from './sidebarFunctionality.js'

/**
 * This class manages our app data.
 * Call its functions to change data.
 * Add / get returns proxied notes, which automatically save changes to localStorage.
 * If you modify unproxied data, make sure to call save yourself.
 * If you modify a sub property, make sure to save yourself.
 *
 * We store all the notes in an object, keyed by note UUID.
 * Similarly for projects.
 */
class Manager {
  /**
   * Create a manager.
   * @param {HTMLElement} mdTarget - The target element for rendering markdown.
   */
  constructor (mdTarget) {
    this.mdTarget = mdTarget
    this.renderSideBar = renderSideBar
    // Set up our handler to save when a note is modified
    const boundSave = this.save.bind(this)

    this.saveHandler = {
      set (obj, prop, value) {
        console.log('saving', obj, prop, value)
        const val = Reflect.set(...arguments)
        boundSave()
        return val
      }
    }

    // Load data from local storage
    let data = JSON.parse(localStorage.getItem('notes-data'))
    if (data == null) {
      data = {}
      data.notes = {}
      data.projs = {}
      data.curNoteId = null
      data.curProjId = null
      console.log('asdf')
    }
    this.notes = data.notes
    this.projs = data.projs
    this.curNoteId = data.curNoteId
    this.curProjId = data.curProjId

    this.renderNote()
    this.renderProject()
    this.save()
  }

  /**
   * Get notes grouped by their first tag.
   * @returns {Object} Notes grouped by the first tag.
   */
  getNotesGroupedByFirstTag () {
    const notesByFirstTag = {}

    for (const note of Object.values(this.notes)) {
      const firstTag = note.tags.length ? note.tags[0] : ''
      if (!notesByFirstTag[firstTag]) {
        notesByFirstTag[firstTag] = []
      }
      notesByFirstTag[firstTag].push(note)
    }
    return notesByFirstTag
  }

  /**
   * Add a new project.
   * @param {string} name - The name of the project.
   * @returns {Proxy} The proxied project.
   */
  addProj (name) {
    const proj = new Project(name)
    console.log(this)
    this.projs[proj.id] = proj
    this.save()
    return new Proxy(proj, this.saveHandler)
  }

  /**
   * Add a new note.
   * @param {Object} note - The note object.
   * @returns {Proxy} The proxied note.
   */
  addNote (note) {
    // Make a copy
    note = new Note(note.proj, note.content, note.title, note.tags)
    note.proj = this.curProjId
    this.notes[note.id] = note
    this.curNoteId = note.id
    this.renderNote()
    this.save()
    return new Proxy(note, this.saveHandler)
  }

  /**
   * Get a proxied note from an ID.
   * @param {string} id - The note ID.
   * @returns {Proxy} The proxied note.
   */
  getNote (id) {
    return new Proxy(this.notes[id], this.saveHandler)
  }

  /**
   * Delete a note by ID.
   * @param {string} id - The note ID.
   */
  delNote (id) {
    delete this.notes[id]

    if (this.curNoteId === id) {
      this.curNoteId = null
      this.renderNote()
    }
    this.save()
  }

  /**
   * Delete a project by ID.
   * @param {string} id - The project ID.
   */
  delProj (id) {
    delete this.projs[id]

    if (this.curProjId === id) {
      this.curProjId = null
      this.renderNote()
      this.renderProject()
    }

    const allNotes = this.getAllNotes()

    for (let i = 0; i < allNotes.length; i++) {
      if (allNotes[i].proj === id) {
        console.log(allNotes[i])
        this.delNote(allNotes[i].id)

        if (this.curNoteId === allNotes[i].id) {
          this.curNoteId = null
        }
      }
    }

    // Delete all notes associated with this project
    this.save()
    this.renderNote()
    this.renderProject()
    renderSideBar()
  }

  /**
   * Get all notes, proxied.
   * @returns {Array} List of proxied notes.
   */
  getAllNotes () {
    const sh = this.saveHandler
    return Object.values(this.notes).map((val) => new Proxy(val, sh))
  }

  /**
   * Get all projects, proxied.
   * @returns {Array} List of proxied projects.
   */
  getAllProjs () {
    const sh = this.saveHandler
    return Object.values(this.projs).map((val) => new Proxy(val, sh))
  }

  /**
   * Change the current note.
   * @param {string} id - The note ID.
   */
  changeNote (id) {
    this.curNoteId = id
    this.renderNote()
    this.save()
  }

  /**
   * Change the current project.
   * @param {string} id - The project ID.
   */
  changeProj (id) {
    this.curProjId = id
    this.curNoteId = null
    this.renderNote()
    this.renderProject()
    this.save()
  }

  /**
   * Write markdown HTML into target.
   */
  renderNote () {
    const tagsContainer = document.getElementById('tags-container')
    tagsContainer.innerHTML = '' // Clear previous tags

    const currNote = this.notes[this.curNoteId]
    if (this.curNoteId == null) {
      this.mdTarget.innerHTML = marked.parse('# No note selected')
      document.querySelector('#note-title').textContent = 'Select a note'
      return
    }

    // Render MD
    this.mdTarget.innerHTML = marked.parse(this.notes[this.curNoteId].content)

    // Set title
    document.querySelector('#note-title').textContent = currNote.title

    const tags = currNote.tags

    // For each tag render tag
    tags.forEach(tag => {
      const tagSpan = document.createElement('span')
      tagSpan.className = 'tag'
      tagSpan.textContent = tag
      // Create a delete button for each tag
      const deleteButton = document.createElement('button')
      deleteButton.textContent = 'x'
      deleteButton.className = 'delete-tag-button'
      deleteButton.addEventListener('click', () => {
        currNote.tags = currNote.tags.filter(q => q !== tag)
        this.save()
        this.renderNote()
        renderSideBar() // Call renderSideBar to update sidebar dynamically
      })

      tagSpan.appendChild(deleteButton)
      tagsContainer.appendChild(tagSpan)
    })
  }

  /**
   * Write project sidebar rendering code here.
   */
  renderProject () {
    // Set the project title
    const projTitleEle = document.querySelector('#curr-proj')
    if (this.curProjId == null) {
      projTitleEle.textContent = 'No project selected'
      return
    }

    // selectedProj is the current selected project
    const selectedProj = this.projs[this.curProjId]
    projTitleEle.textContent = selectedProj.name
  }

  /**
   * Save all our data into local storage.
   */
  save () {
    const data = {}
    data.notes = this.notes
    data.projs = this.projs
    data.curNoteId = this.curNoteId
    data.curProjId = this.curProjId
    console.log(data)
    localStorage.setItem('notes-data', JSON.stringify(data))
  }
}

export { Manager }
