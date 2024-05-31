import puppeteer from 'puppeteer';

// Jest unit test
test('empty', () => {});

// Puppeteer tests all go in here
/*
describe('Puppeteer Tests For App Functionality Testing', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // Set to false if you want to see the browser during the tests
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.goto('http://localhost:5500/index.html'); // Use local server URL
  });

  afterAll(async () => {
    await browser.close();
  });

  it('shouldnt be possible to add a note without a project selected', async () => {
    // Listen for the alert dialog
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('Must select project before adding note');
      await dialog.dismiss(); // Close the alert dialog
    });

    // Click the button with id 'add-note'
    const btn = await page.$('#add-note');
    await btn.click();

    // Wait some time to ensure the alert is triggered
    await new Promise(resolve => setTimeout(resolve, 1000));
  });
});*/
