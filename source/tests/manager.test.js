/**
 * @jest-environment jsdom
 */
import { Manager } from '../manager.js'
/*
const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });*/

describe('Manager loading from local storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  test('Test empty', () => {
    // make sure Manager writes default values into local storage
    
    man = new Manager(null)
    brug = JSON.parse(window.localStorage.getItem("notes-data"))
    expect(brug.notes).toBe({})
    expect(brug.projs).toBe({})
    expect(brug.curNoteId).toBe(null)
    expect(brug.curProjId).toBe({})
  });

})


