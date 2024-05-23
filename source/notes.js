/**
 * Data for note
 * Contains project id, content, title, tags list, and a UUID for the note
 */
class Note {
  constructor (p, c, t, l) {
    this.proj = p
    this.content = c
    this.title = t
    this.tags = l
    this.id = self.crypto.randomUUID()
    console.log(this.id)
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

}
export { Note }
