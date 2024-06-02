import puppeteer from 'puppeteer'

// Jest unit test
test('empty', () => {})

// Puppeteer tests all go in here
describe('Puppeteer Tests For App Functionality Testing', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // Set to false if you want to see the browser during the tests
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    page = await browser.newPage()
    await page.goto('http://localhost:3000/index.html') // Use local server URL
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
  })

  // Add project
  it('should be possible to add a new project', async () => {
    // Listen for the alert dialog
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

  // Add another note

  // Update note

  // Delete note

  // Add tag to one of the notes we created above and make sure the tag got added to the ui

  // Delete tag that we just made above

  // Delete project
})
