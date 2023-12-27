const link = 'https://competiciones-moralzarzal.envinya.es/ligaf7moral'
const pathToChromium = 'C:\\Program Files\\Chromium\\chrome.exe' // or await chromium.executablePath()
const chromium = require('@sparticuz/chromium')
const puppeteer = require('puppeteer')

async function newBrowser() {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  return browser
}


module.exports = {
  link, newBrowser
}