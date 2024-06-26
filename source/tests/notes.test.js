import puppeteer from 'puppeteer'

// Jest unit test
test('empty', () => {})

/**
 * Adds a new tag with the specified name.
 *
 * @param {Page} page - The Puppeteer page object.
 * @param {string} tagName - The name of the tag to be added.
 * @returns {Promise<void>}
 */
async function addTag (page, tagName) {
  // Wait for all elements rendered
  await page.waitForSelector('body')

  // Input the tag name
  await page.type('#tag-input', tagName)

  // Click the button to add a new tag
  const addTagButton = await page.$('#add-tag-button')
  await addTagButton.click()

  // Wait for the tags container to be updated
  await page.waitForSelector('#tags-container .tag')
}

/**
 * Detele a tag with the specified name.
 *
 * @param {Page} page - The Puppeteer page object.
 * @param {string} tagName - The name of the tag to be delete.
 * @returns {Promise<void>}
 */
async function deleteTag (page, tagName) {
  // Wait for all elements rendered
  await page.waitForSelector('.tag')

  // Find the tag to delete
  const tags = await page.$$('.tag')
  let toDelete = null
  for (const tag of tags) {
    const text = await page.evaluate(el => el.textContent, tag)
    console.log('The text is: ', text)
    if (text.includes(tagName)) {
      toDelete = tag
      break
    };
  }

  // Check if the tag is valid/available
  if (toDelete) {
    const deleteBttn = await toDelete.$('.delete-tag-button')
    await deleteBttn.click()
  } else {
    console.log(`Tag with name "${tagName}" not found.`)
  }
}

// Puppeteer tests all go in here
describe('Puppeteer Tests For App Functionality Testing', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // Set to false if you want to see the browser during the tests
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: 0
    })
    page = await browser.newPage()

    await page.goto('http://localhost:3000/index.html') // Use local server URL
    await page.setViewport({ width: 1000, height: 800 })
  })

  afterAll(async () => {
    await browser.close()
  })

  // Make sure we can't add note without a project selected/made
  it('shouldnt be possible to add a note without a project selected', async () => {
    // Listen for the alert dialog
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert')
      expect(dialog.message()).toBe('Must select project before adding note')
      await dialog.dismiss() // Close the alert dialog
    })

    // Click the button with id 'add-note'
    const btn = await page.$('#add-note')
    await btn.click()

    // Wait some time to ensure the alert is triggered
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Remove alert dialog event listener
    page.removeAllListeners('dialog')
  })

  // Add project
  it('should be possible to add a new project', async () => {
    const btn = await page.$('#new-project-button')
    await btn.click()

    await page.evaluate(() => {
      const input = document.querySelector('#project-input')
      if (input) {
        input.value = 'My Project'
      }
    })

    const btn2 = await page.$('#confirm-new-project')
    await btn2.click()

    // Find the element with the ID 'curr-proj'
    const titleElement = await page.$('#curr-proj')

    // Get the text content of the title element
    const title = await page.evaluate(element => element.textContent, titleElement)

    // Expect the value of the title to be 'My Project'
    expect(title.trim()).toBe('My Project')
  })

  // Add second project
  it('should be possible to add a new project', async () => {
    const btn = await page.$('#new-project-button')
    await btn.click()

    await page.evaluate(() => {
      const input = document.querySelector('#project-input')
      if (input) {
        input.value = 'My Project 2'
      }
    })

    const btn2 = await page.$('#confirm-new-project')
    await btn2.click()

    // Find the element with the ID 'curr-proj'
    const titleElement = await page.$('#curr-proj')

    // Get the text content of the title element
    const title = await page.evaluate(element => element.textContent, titleElement)

    // Expect the value of the title to be 'My Project'
    expect(title.trim()).toBe('My Project 2')
  })

  // Test click the first project
  it('should be possible to add a new project', async () => {
    // Get all project divs inside the project entries list
    const allProjs = await page.$$('#project-nav div')

    const ourProject = allProjs[1]
    await ourProject.click()

    // Find the element with the ID 'curr-proj'
    const titleElement = await page.$('#curr-proj')

    // Get the text content of the title element
    const title = await page.evaluate(element => element.textContent, titleElement)

    // Expect the value of the title to be 'My Project'
    expect(title.trim()).toBe('My Project')
  })

  // Add note
  it('should be possible to add a new note', async () => {
    // Wait for the page to load completely
    await page.waitForSelector('body')

    // Click the button to add a new note
    const btn = await page.waitForSelector('#add-note', { visible: true })
    await btn.click()

    // Wait for the popup to appear
    await page.waitForSelector('.note-popup-container', { visible: true })

    // Wait for and click the 'Meeting' button within the popup
    await page.waitForSelector('#Meeting', { visible: true })
    await page.click('#Meeting')

    // Type in the text to the note input using page.evaluate
    await page.evaluate(() => {
      const input = document.querySelector('#note-input')
      if (input) {
        input.value = 'New Meeting Note'
      }
    })

    // Wait for and click the 'choose-note' button
    await page.waitForSelector('#choose-note', { visible: true })
    await page.click('#choose-note')

    // Wait for the entries list to be updated
    await page.waitForSelector('#entries-list button')

    // Get all buttons inside the entries list
    const allButtons = await page.$$('#entries-list button')

    let ourButton = null
    for (const button of allButtons) {
      const innerText = await page.evaluate(el => el.innerText, button)
      if (innerText === 'New Meeting Note') {
        ourButton = button
        break
      }
    }

    // Assert that ourButton is not null and has the correct innerText
    expect(ourButton).not.toBeNull()
    const buttonText = await page.evaluate(el => el.innerText, ourButton)
    expect(buttonText).toBe('New Meeting Note')
  })

  // Adding note will also add a tag
  it('Add note also include adding tag', async () => {
    const tagFromNote = 'meeting'
    // Wait for all the tags available rendered
    await page.waitForSelector('.tag')

    const allTags = await page.$$('.tag')
    const initialLength = allTags.length
    const tag = allTags[0]
    const tagText = await page.evaluate(tag => tag.innerText, tag)

    // // Assert tag is automatically added
    expect(initialLength).toBe(1)
    expect(tagText.includes(tagFromNote), true)
  })

  // Add another note
  it('should be possible to add another new note', async () => {
  // Wait for the page to load completely
    await page.waitForSelector('body')

    // Click the button to add a new note
    const btn = await page.waitForSelector('#add-note', { visible: true })
    await btn.click()

    // Wait for the popup to appear
    await page.waitForSelector('.note-popup-container', { visible: true })

    // Wait for and click the 'Meeting' button within the popup
    // const meetingButton = await page.waitForSelector('#Meeting', { visible: true })
    // no need to click again because its preselected from previous creation

    // Type in the text to the note input using page.evaluate
    await page.evaluate(() => {
      const input = document.querySelector('#note-input')
      if (input) {
        input.value = 'New Meeting Note 2'
      }
    })

    // Wait for and click the 'choose-note' button
    // const chooseNoteButton = await page.waitForSelector('#choose-note', { visible: true })
    await page.click('#choose-note')

    // Wait for the entries list to be updated
    await page.waitForSelector('#entries-list button')

    // Get all buttons inside the entries list
    const allButtons = await page.$$('#entries-list button')

    let ourButton = null
    for (const button of allButtons) {
      const innerText = await page.evaluate(el => el.innerText, button)
      if (innerText === 'New Meeting Note 2') {
        ourButton = button
        break
      }
    }

    // Assert that ourButton is not null and has the correct innerText
    expect(ourButton).not.toBeNull()
    const buttonText = await page.evaluate(el => el.innerText, ourButton)
    expect(buttonText).toBe('New Meeting Note 2')
  })

  // Add another note with a different template
  it('should be possible to add another new note', async () => {
    // Wait for the page to load completely
    await page.waitForSelector('body')

    // Click the button to add a new note
    const btn = await page.waitForSelector('#add-note', { visible: true })
    await btn.click()

    // Wait for the popup to appear
    await page.waitForSelector('.note-popup-container', { visible: true })

    // Wait for and click the 'Meeting' button within the popup
    // const meetingButton = await page.waitForSelector('#Design', { visible: true })
    // no need to click again because its preselected from previous creation

    // Type in the text to the note input using page.evaluate
    await page.evaluate(() => {
      const input = document.querySelector('#note-input')
      if (input) {
        input.value = 'New Design Notes'
      }
    })

    // Wait for and click the 'choose-note' button
    // const chooseNoteButton = await page.waitForSelector('#choose-note', { visible: true })
    await page.click('#choose-note')

    // Wait for the entries list to be updated
    await page.waitForSelector('#entries-list button')

    // Get all buttons inside the entries list
    const allButtons = await page.$$('#entries-list button')

    let ourButton = null
    for (const button of allButtons) {
      const innerText = await page.evaluate(el => el.innerText, button)
      if (innerText === 'New Design Notes') {
        ourButton = button
        break
      }
    }

    // Assert that ourButton is not null and has the correct innerText
    expect(ourButton).not.toBeNull()
    const buttonText = await page.evaluate(el => el.innerText, ourButton)
    expect(buttonText).toBe('New Design Notes')
  })

  // Update note  (not properly editing ??)
  it('should be possible to update a note', async () => {
    // Find the note to update
    const allButtons = await page.$$('#entries-list button')
    let noteButton = null
    for (const button of allButtons) {
      const innerText = await page.evaluate(el => el.innerText, button)
      if (innerText.toLowerCase() === 'new meeting note') {
        noteButton = button
        break
      }
    }

    // Click the note to open it
    await noteButton.click()

    // Wait for the edit button to be visible and click it to enable editing mode
    await page.waitForSelector('#edit-button', { visible: true })
    await page.click('#edit-button')

    // Clear the existing content in the textarea
    await page.evaluate(() => {
      const textarea = document.querySelector('.md-view textarea')
      if (textarea) {
        textarea.value = '' // Set the new content
      }
    })

    // Simulate typing to update the content
    await page.type('.md-view textarea', 'Updated Meeting Note', { delay: 100 }) // add a delay if needed

    // Save the updated note
    await page.click('#edit-button')

    // Add a sufficient delay to ensure content is saved
    await new Promise(resolve => setTimeout(resolve, 500))

    // Trigger renderNote to ensure the updated content is displayed
    await page.evaluate(() => {
      const renderNote = window.renderNote
      if (renderNote) {
        renderNote()
      }
    })

    // Verify the updated note content in the md-view class
    await page.waitForSelector('.md-view')
    const noteContent = await page.$eval('.md-view', el => el.innerText)
    console.log('Updated note content:', noteContent)

    // Ensure that 'Updated Meeting Note' is part of the content
    expect(noteContent.toLowerCase()).toContain('updated meeting note')
  })

  // Delete note
  it('should be possible to delete a note', async () => {
    // Find the note to delete
    const allButtons = await page.$$('#entries-list button')
    let noteButton = null
    for (const button of allButtons) {
      const innerText = await page.evaluate(el => el.innerText, button)
      if (innerText.toLowerCase() === 'new meeting note') {
        noteButton = button
        break
      }
    }

    if (!noteButton) {
      console.error('No note button found')
      return
    }

    // Click the note to open it
    await noteButton.click()

    // Wait for the delete button to be visible and click it to delete the note
    await page.waitForSelector('#delete-button', { visible: true })
    await page.click('#delete-button')

    // Verify the note is deleted by checking the entries list again
    const allButtonsAfterDelete = await page.$$('#entries-list button')
    let noteButtonAfterDelete = null
    for (const button of allButtonsAfterDelete) {
      const innerText = await page.evaluate(el => el.innerText, button)
      if (innerText.toLowerCase() === 'new meeting note') {
        noteButtonAfterDelete = button
        break
      }
    }

    // Expect that the note button is not found after deletion
    expect(noteButtonAfterDelete).toBeNull()
  })

  // Add tag to one of the notes we created above and make sure the tag got added to the ui

  it('Add new tag is not possible without a note selected', async () => {
    // Listen for the alert dialog
    const tagAlert = 'No note is selected. Please select a note before adding tags.'
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert')
      expect(dialog.message()).toBe(tagAlert)
      await dialog.dismiss() // Close the alert dialog
    })

    // Click the button with id 'add-note'
    const btn = await page.$('#add-tag-button')
    await btn.click()

    // Wait some time to ensure the alert is triggered
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Remove alert dialog event listener
    page.removeAllListeners('dialog')
  })

  it('Adding a new tag when note is selected', async () => {
    const allButtons = await page.$$('#entries-list button')
    let ourButton = null
    for (const button of allButtons) {
      const innerText = await page.evaluate(el => el.innerText, button)
      if (innerText === 'New Design Notes') {
        ourButton = button
        break
      }
    }

    await ourButton.click()

    const tagName = 'new-tag'
    const initialTags = await page.$$('.tag')
    const initialLength = initialTags.length
    // Add new tag
    await addTag(page, tagName)

    // Get the newly added tag
    const allTags = await page.$$('.tag')
    const lastTag = allTags[allTags.length - 1]
    const tagText = await page.evaluate(tag => tag.innerText, lastTag)

    // Assert new tag is added
    expect(allTags.length).toBe(initialLength + 1)
    expect(tagText.includes(tagName)).toBe(true)
  }, 8000)

  it('Adding another tag when note is selected', async () => {
    const tagName = 'another-tag'
    const initialTags = await page.$$('.tag')
    const initialLength = initialTags.length

    // Add new tag
    await addTag(page, tagName)

    // Get the newly added tag and the precious tag
    const allTags = await page.$$('.tag')
    const lastTag = allTags[allTags.length - 1]
    const secondLastTag = allTags[allTags.length - 2]
    const tagText = await page.evaluate(tag => tag.innerText, lastTag)
    const secondLastTagText = await page.evaluate(tag => tag.innerText, secondLastTag)

    // Assert new tag is added
    expect(allTags.length).toBe(initialLength + 1)
    expect(tagText.includes(tagName)).toBe(true)
    expect(secondLastTagText.includes('new-tag')).toBe(true)
  }, 8000)

  // Delete the first tag would update the new first tag
  it('Delete the first tag', async () => {
    const firstTag = 'meeting'
    const newFirstTag = 'new-tag'
    const initialTags = await page.$$('.tag')
    const initialLength = initialTags.length

    await deleteTag(page, firstTag)
    // Verify the tag is deleted
    const remainingTags = await page.$$('.tag')
    const updatedLength = remainingTags.length
    // Wait until every element in remainingTags is relsolved to be an array of tag-name (string)
    const remainingTagNames = await Promise.all(remainingTags.map(tag => page.evaluate(el => el.textContent, tag)))

    expect(updatedLength).toBe(initialLength - 1)
    expect(remainingTagNames).not.toContain(firstTag)
    expect(remainingTagNames[0].includes(newFirstTag)).toBe(true)
  }, 8000)

  // Delete another tag
  it('Delete a new-tag', async () => {
    const toDelete = 'new-tag'
    const initialTags = await page.$$('.tag')
    const initialLength = initialTags.length

    await deleteTag(page, toDelete)
    // Verify the tag is deleted
    const remainingTags = await page.$$('.tag')
    const updatedLength = remainingTags.length
    // Wait until every element in remainingTags is relsolved to be an array of tag-name (string)
    const remainingTagNames = await Promise.all(remainingTags.map(tag => page.evaluate(el => el.textContent, tag)))

    expect(updatedLength).toBe(initialLength - 1)
    expect(remainingTagNames).not.toContain(toDelete)
  }, 8000)

  /*
  // Delete project
  it('Test for deleting project', async () => {
    await page.waitForSelector('body')
    // Wait for project nav to be loaded
    const allProjs = await page.$$('#project-nav .project-icon')
    // Get the number of current projects
    const initialLength = allProjs.length
    const target = allProjs[0]

    await page.evaluate(() => {
      const element = document.querySelector('.proj-delete-button');
      if (element) {
          element.style.display = 'block';
      } else {
          console.error("Element with class 'proj-delete-button' not found.");
      }
  });

    const deleteBtn = await target.$('.proj-delete-button', { visible: true })
    if (deleteBtn) {
      await deleteBtn.evaluate(b => b.click());
    } else {
      console.log('Delete button not found')
      return
    }

    // Confirm project deletion
    const confirmBtn = await page.$('#confirm-delete-project', { visible: true })
    if (confirmBtn) {
      await confirmBtn.evaluate(b => b.click());
    } else {
      console.log('Confirmation button not found')
      return
    }

    // Check the remaining projects
    await page.waitForSelector('#project-nav .project-icon', { visible: true })
    const remainingProjs = await page.$$('#project-nav div')
    const updatedLength = remainingProjs.length
    // Assert the number of projects modified
    expect(updatedLength).toBe(initialLength - 1)
  })

  */
})
