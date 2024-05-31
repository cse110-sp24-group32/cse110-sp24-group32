/**
 * Represents a project with a name and a unique ID.
 */
class Project {
  /**
   * Create a project.
   * @param {string} name - The name of the project.
   */
  constructor(name) {
    this.name = name;
    this.id = self.crypto.randomUUID();
  }
}

export { Project };
