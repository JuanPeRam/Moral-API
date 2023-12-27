const global = require('./global')
const link = global.link

async function getLastResults() {
    const browser = await global.newBrowser()

    const page = await browser.newPage()

    await page.goto(`${link}/resultados`)
    try {
        const groupSelector = '#formSearch > div > div.col-lg-3 > aside:nth-child(1) > div.card__content.filter__boxed > div:nth-child(2) > div > button'
        const groups = await page.waitForSelector(groupSelector);
        await groups.click();
        const competitionsList = await page.$('.dropdown-menu .inner .show').children
        console.log(competitionsList)
        if(groups){
            await page.evaluate(()=>{
                const buttonText = document.querySelector('button[data-id="GroupId"]')
                console.log(buttonText)
                return
            })
        }
      } catch (error) {
        console.error('No se pudo encontrar o hacer clic en el elemento:', error.message);
      }

    return []


}

module.exports = {
    getLastResults
}