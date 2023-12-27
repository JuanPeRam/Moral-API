const link = 'https://competiciones-moralzarzal.envinya.es/ligaf7moral'
const pathToChromium = 'C:\\Program Files\\Chromium\\chrome.exe' // or await chromium.executablePath()
const chromium = require('@sparticuz/chromium')
const puppeteer = require('puppeteer')

async function newBrowser(){
    /*const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: pathToChromium,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });*/

      const browser = await puppeteer.launch({
        
        executablePath: pathToChromium,
        headless: false
      });

      return browser
}


module.exports = {
    link, newBrowser
}