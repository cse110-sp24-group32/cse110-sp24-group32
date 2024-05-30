import puppeteer from 'puppeteer';


// Jest unit test
test('empty', () => {
})


// Pupeteer tests all go in here 
describe('Puppeteer Tests For App Functionality Testing', () => {
  // First, go to our app
  beforeAll(async () => {
    await page.goto('https://cse110-sp24-group32.github.io/cse110-sp24-group32/');
  });
  
  
  //First test to ensure adding a new note without a project is not possible
  it('shouldnt be possible to add a note without a project selected', async () => {
    // Listen for the alert dialog
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('Must select project before adding note');
      await dialog.dismiss(); // Close the alert dialog
    });

    // Click the button with id 'add-note'
    await page.click('#add-note');
    
    // Wait some time to ensure the alert is triggered
    await page.waitForTimeout(1000);
  });
  
  
});
