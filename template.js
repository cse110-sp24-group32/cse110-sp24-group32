/**
 * Data for a template
 * Contains a display name, and the actual note object we want
 */
class Template {
  constructor (name, note) {
    this.name = name
    this.note = note
    this.id = self.crypto.randomUUID()
  }
}
export { Template }
