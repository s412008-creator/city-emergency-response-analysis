import puppeteer from 'puppeteer';
import { exec } from 'child_process';

const server = exec('npm run dev');
setTimeout(async () => {
  try {
    const browser = await puppeteer.launch({ channel: 'chrome' });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    
    await browser.close();
  } catch (err) {
    console.error('Puppeteer Error:', err);
  } finally {
    server.kill();
    process.exit(0);
  }
}, 5000);
