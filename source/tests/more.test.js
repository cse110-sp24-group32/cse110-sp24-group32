import puppeteer from 'puppeteer'

// Puppeteer tests all go in here
describe('Additional E2E tests', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // Set to false if you want to see the browser during the tests
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      slowMo: 25,
      defaultViewport: 0
    })
    page = await browser.newPage()
    
    await page.goto('http://localhost:3000/index.html') // Use local server URL
    await page.setViewport({ width: 1000, height: 800 });
   
  })

  afterAll(async () => {
    await browser.close()
  })

  // Test search functionality
  // We need to do some setup to search something
  it('shouldnt be possible to add a note without a project selected', async () => {
    let btn = await page.$('#new-project-button')
    await btn.click()
    const pName = await page.$('#project-input')
    await pName.type('project')
    btn = await page.$('#project-input')
    btn = await page.$('#confirm-new-project')
    await btn.click()

    btn = await page.$('.project-icon')
    await btn.click()

    btn = await page.$('#add-note')
    await btn.click()

    btn = await page.$('#Meeting')
    await btn.click()

    await page.$('#note-input').then((i) => { return i.type('note') }).then((i) => {
      return page.$('#choose-note')
    }).then((i) => { return i.click() })

    btn = await page.$('#add-note')
    await btn.click()

    btn = await page.$('#Code')
    await btn.click()

    await page.$('#note-input').then((i) => { i.type('1') }).then((i) => {
      return page.$('#choose-note')
    }).then((i) => { return i.click() })

    // find meeting note
    const search = await page.$('#search-bar')
    await search.type('meet')
    await page.keyboard.press('Enter')
    let res = await page.$$('.search-result')
    expect(res.length).toBe(1)

    // find both notes
    await search.click({ clickCount: 3 })
    await search.press('Backspace')
    await search.type('c')
    await page.keyboard.press('Enter')
    res = await page.$$('.search-result')
    expect(res.length).toBe(2)

    // find no notes
    await search.click({ clickCount: 3 })
    await search.press('Backspace')
    await search.type('BITSET')
    await page.keyboard.press('Enter')
    res = await page.$$('.search-result')
    expect(res.length).toBe(1)
    let txt = await page.$eval('.search-result', el => el.innerText)
    expect(txt).toBe('no matching result')

    // test empty field, should not show results
    await search.click({ clickCount: 3 })
    await search.press('Backspace')
    await page.keyboard.press('Enter')
    txt = await page.$eval('#search-results-container', el => el.className)
    expect(txt).toBe('hidden')
  }, 1e9)
})
