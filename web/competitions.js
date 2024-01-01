const global = require('./global')
const link = global.link
async function getCurrentCompetition() {
    const browser = await global.newBrowser()
    const page = await browser.newPage()

    await page.goto(`${link}/clasificacion`)
    //await page.waitForSelector('.card--has-table')

    const result = await page.evaluate(() => {
        const standingsInfo = [];
        const tables = document.querySelectorAll('.card--has-table');
      
        for (let standing of tables) {
          const children = standing.children;
          const header = children[0];
          const group = header.querySelector('h4').textContent;
          const stand = children[1].children[0];
          const rows = stand.querySelector('tbody').children;
          const newStanding = [];
      
          for (let row of rows) {
            const cols = row.querySelectorAll('td');
            const teamData = cols[1]
            const position = teamData.querySelector('span').textContent
            const teamShield = teamData.querySelector('img').src
            const teamName = teamData.querySelector('h6 a').textContent
            const link = teamData.querySelector('h6 a').href
            const teamID = link.split('/')[5]
            const points = cols[2].textContent;
            const played = cols[3].textContent;
            const won = cols[4].textContent;
            const drawn = cols[5].textContent;
            const lost = cols[6].textContent;
            const goals = cols[7].textContent;
            const goalsAgainst = cols[8].textContent;
            const gd = cols[9].textContent;
      
            newStanding.push({ teamID,position,teamShield,teamName,link,points, played, won, drawn, lost, goals, goalsAgainst, gd });
          }
      
          standingsInfo.push({ group, newStanding });
        }
      
        return standingsInfo;
      });

      return result

}

async function getCompetitionByGroup(groupId){
  const browser = await global.newBrowser()
    const page = await browser.newPage()

    await page.goto(`${link}/clasificacion`)
    await page.waitForSelector('.card--has-table')
    /*const ronda = await page.$('[data-id="GroupId"]')
    await ronda.click()

    const competitionsList = await page.$('.dropdown-menu .inner .show').children
    console.log(competitionsList)
    const listItems = await competitionsList.$$('a')
    console.log(listItems)
    for(const listItem of listItems){
        const groupName = listItem.$('span').textContent
        console.log('a')
        if(groupName==group){
            console.log(groupName)
            console.log("Si son iguales")
            await listItem.click()
            break
        }
    }*/

    const result = await page.evaluate((groupId) => {
        const standingsInfo = [];
        const tables = document.querySelectorAll('.card--has-table');
      
        for (let standing of tables) {
          const children = standing.children;
          const header = children[0];
          const group = header.querySelector('h4').textContent;
          if(group!=groupId) continue
          const stand = children[1].children[0];
          const rows = stand.querySelector('tbody').children;
          const newStanding = [];
      
          for (let row of rows) {
            const cols = row.querySelectorAll('td');
            const teamData = cols[1]
            const position = teamData.querySelector('span').textContent
            const teamShield = teamData.querySelector('img').src
            const teamName = teamData.querySelector('h6 a').textContent
            const link = teamData.querySelector('h6 a').href
            const points = cols[2].textContent;
            const played = cols[3].textContent;
            const won = cols[4].textContent;
            const drawn = cols[5].textContent;
            const lost = cols[6].textContent;
            const goals = cols[7].textContent;
            const goalsAgainst = cols[8].textContent;
            const gd = cols[9].textContent;
      
            newStanding.push({ position,teamShield,teamName,link,points, played, won, drawn, lost, goals, goalsAgainst, gd });
          }
      
          standingsInfo.push({ group, newStanding });
        }
      
        return standingsInfo;
      },groupId);

      return result
}

module.exports = {
    getCurrentCompetition,getCompetitionByGroup
}