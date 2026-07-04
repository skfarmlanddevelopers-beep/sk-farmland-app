const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.type().toUpperCase(), msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto('https://darkslateblue-mongoose-584002.hostingersite.com', { waitUntil: 'networkidle2' });
  
  // Wait a bit to let React render and loader to finish
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  await browser.close();
})();
