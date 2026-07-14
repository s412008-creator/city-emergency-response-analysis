import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ channel: 'chrome' });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://43.213.64.18', { waitUntil: 'networkidle0' });
    
    // Check if a specific element exists
    const title = await page.title();
    console.log('Page Title:', title);
    
    const rootHasChildren = await page.evaluate(() => {
        return document.getElementById('root') && document.getElementById('root').children.length > 0;
    });
    console.log('Is App rendered (root has children)?', rootHasChildren);
    
    await browser.close();
  } catch (err) {
    console.error('Puppeteer Error:', err);
  } finally {
    process.exit(0);
  }
})();
