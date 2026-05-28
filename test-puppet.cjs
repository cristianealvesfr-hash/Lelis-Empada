const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:5173');
  console.log('Page loaded');
  
  await page.waitForSelector('.group.bg-white.rounded-2xl');
  console.log('Found product card');
  await page.click('.group.bg-white.rounded-2xl');
  console.log('Clicked product card');
  
  await page.waitForSelector('button');
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Adicionar ao Carrinho')) {
      console.log('Found "Adicionar ao Carrinho" button, clicking...');
      await btn.click();
      break;
    }
  }
  
  console.log('Waiting to see if it crashes...');
  await new Promise(r => setTimeout(r, 3000));
  console.log('Done waiting.');
  
  await browser.close();
})();
