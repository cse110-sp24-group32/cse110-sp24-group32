/**
 * Manages the state of the app
 */
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs'
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'
import { Note } from './notes.js'
import { Project } from './proj.js'

/**
 * This class manages our app data.
 * Call its functions to change data.
 * Add / get returns proxied notes, which automatically save changes to localStorage.
 * If you modify unproxied data, make sure to call save yourself.
 * If you modify a sub property, make sure to save yourself.
 *
 * We store all the notes in a object, keyed by note UUID
 * Similarly for projects
 */
class Manager {
  constructor (mdTarget) {
    this.mdTarget = mdTarget

    // set up our handler to save when a note is modified
    const boundSave = this.save.bind(this)
    this.saveHandler = {
      set (obj, prop, value) {
        console.log('saving', obj, prop, value)
        const val = Reflect.set(...arguments)
        boundSave()
        return val
      }
    }

    // load data from local storage
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

    this.save()
  }

  /** Add new project */
  addProj (name) {
    const proj = new Project(name)
    this.projs[proj.id] = proj
    this.save()
    return new Proxy(proj, this.saveHandler)
  }

  /**
   * Add a new note
   * @param {*} template Template selected
   * @returns Proxied note
   */
  addNote (note) {
    // make a copy
    note = new Note(note.proj, note.content, note.title, note.tags)
    note.proj = this.curProjId
    this.notes[note.id] = note
    this.curNoteId = note.id
    this.renderNote()
    this.save()
    return new Proxy(note, this.saveHandler)
  }

  /** Gets proxied note from an id */
  getNote (id) {
    return new Proxy(this.notes[id], this.saveHandler)
  }

  /** Deletes note from an id */
  delNote (id) {
    delete this.notes[id]
    
    if(this.curNoteId === id){
      this.curNoteId = null
      this.renderNote()
    }

    //this
    const tagsContainer = document.getElementById('tags-container');
    tagsContainer.innerHTML = '';
    this.save()
  }

  /** Returns all notes, proxied */
  getAllNotes () {
    const sh = this.saveHandler
    return Object.values(this.notes).map((val) => new Proxy(val, sh))
  }

  /** Returns all projects, proxied */
  getAllProjs () {
    const sh = this.saveHandler
    return Object.values(this.projs).map((val) => new Proxy(val, sh))
  }

  /** Changes the current note */
  changeNote (id) {
    this.curNoteId = id
    this.renderNote()
    this.save()
  }

  /** Changes the current project */
  changeProj (id) {
    this.curProjId = id
    this.curNoteId = null
    this.save()
  }

  /**
   * Write markdown html into target
   */
  renderNote () {
    if (this.curNoteId == null) {
      this.mdTarget.innerHTML = marked.parse('# No note selected')
      return
    }
    this.mdTarget.innerHTML = marked.parse(this.notes[this.curNoteId].content)
  }


  addTagToNote(noteId, tag) {
    const note = this.notes[noteId];
    if (note) {
        note.addTag(tag);
        this.save();  
    }
  }

  removeTagFromNote(noteId, tag) {
    const note = this.notes[noteId];
    if (note) {
      const tagIndex = note.tags.indexOf(tag);
      if (tagIndex !== -1) {
        note.tags.splice(tagIndex, 1);
        this.save();
      }
    }
  }


  /**
   * Saves all our data into local storage
   */
  save () {
    const data = {}
    data.notes = this.notes
    data.proj = this.projs
    data.curNoteId = this.curNoteId
    data.curProjId = this.curProjId
    console.log(data)
    localStorage.setItem('notes-data', JSON.stringify(data))
  }


}

export { Manager }
