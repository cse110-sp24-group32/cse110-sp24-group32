/**
 * Represents a template with a name and a note.
 */
class Template {
  /**
   * Create a template.
   * @param {string} name - The display name of the template.
   * @param {object} note - The actual note object.
   */
  constructor(name, note) {
    this.name = name;
    this.note = note;
    this.id = self.crypto.randomUUID();
  }
}
export { Template };
