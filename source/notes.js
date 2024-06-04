/**
 * Represents a note with project ID, content, title, tags, and a unique ID.
 */
class Note {
  /**
   * Create a note.
   * @param {string} p - The project ID.
   * @param {string} c - The content of the note.
   * @param {string} t - The title of the note.
   * @param {Array} l - The list of tags.
   */
  constructor (p, c, t, l) {
    this.proj = p
    this.content = c
    this.title = t
    this.tags = l
    this.id = self.crypto.randomUUID()
  }
}
export { Note }
