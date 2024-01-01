const global = require('./global')
const link = global.link

async function getTeamInfo(teamID){
    const browser = await global.newBrowser()
    const page = await browser.newPage()

    await page.goto(`${link}/equipo/${teamID}`)

    const result = await page.evaluate(() => {
        const teamInfo = {};
        //Name
        const heading = document.querySelectorAll('.page-heading')[0];
        const team_name = heading.querySelector('.page-heading__title').textContent
        //Content Cards
        const contentCards = document.querySelectorAll('.content')[0].querySelectorAll('.card')
        //Last Result
        const last_result = {}
        const lastResultCard = contentCards[0]
        const lastResultLeague = lastResultCard.querySelector('.game-result__league').textContent
        const lastResultTitle = lastResultCard.querySelector('.game-result__title').textContent
        const lastResultDate = lastResultCard.querySelector('.game-result__date').textContent
        const home_team = {}
        const logo = lastResultCard.querySelector('.game-result__team-logo').querySelector('img').src
        const home_name = lastResultCard.querySelector('.game-result__team-name').textContent
        home_team.logo = logo
        home_team.team_name = home_name
        const away_team = {}
        const logo2 = lastResultCard.querySelector('.game-result__team--second').querySelector('.game-result__team-logo').querySelector('img').src
        const away_name = lastResultCard.querySelector('.game-result__team--second').querySelector('.game-result__team-name').textContent
        away_team.logo = logo2
        away_team.team_name = away_name
        const result = {}
        const goals_home = lastResultCard.querySelectorAll('.game-result__score-result')[0].textContent
        const goals_away = lastResultCard.querySelectorAll('.game-result__score-result')[1].textContent
        result.goals_home = goals_home
        result.goals_away = goals_away
        last_result.last_result_league = lastResultLeague
        last_result.lastResultTitle = lastResultTitle
        last_result.lastResultDate = lastResultDate
        last_result.home_team = home_team
        last_result.away_team = away_team
        last_result.result = result
        //Next Match
        const nextMatchCard = contentCards[1]
        const next_match = {}
        const nextMatchLeague = nextMatchCard.querySelector('.game-result__league').textContent
        const nextMatchTitle = nextMatchCard.querySelector('.game-result__title').textContent
        const nextMatchDate = nextMatchCard.querySelector('.game-result__date').textContent
        const next_home_team = {}
        const next_logo = nextMatchCard.querySelector('.game-result__team-logo').querySelector('img').src
        const next_home_name = nextMatchCard.querySelector('.game-result__team-name').textContent
        next_home_team.logo = next_logo
        next_home_team.team_name = next_home_name
        const next_away_team = {}
        const next_logo2 = nextMatchCard.querySelector('.game-result__team--second').querySelector('.game-result__team-logo').querySelector('img').src
        const next_away_name = nextMatchCard.querySelector('.game-result__team--second').querySelector('.game-result__team-name').textContent
        next_away_team.logo = next_logo2
        next_away_team.team_name = next_away_name

        next_match.last_result_league = nextMatchLeague
        next_match.lastResultTitle = nextMatchTitle
        next_match.lastResultDate = nextMatchDate
        next_match.home_team = next_home_team
        next_match.away_team = next_away_team
        //Kits Info
        const kitCard = contentCards[2]
        //Leaderboard
        const table_leader = document.querySelector('table.team-leader').querySelector('tbody').children
        const team_leaderboard = []
        for(let table_row of table_leader){
            const player_data = {}
            const name = table_row.querySelector('.team-leader__player-name').textContent
            const goals = table_row.querySelector('.team-leader__goals').textContent
            const games = table_row.querySelector('.team-leader__gp').textContent
            const average = table_row.querySelector('.circular__percents').textContent
            player_data.name = name
            player_data.goals = goals
            player_data.games = games
            player_data.average = average
            team_leaderboard.push(player_data)
        }
        //Last Results
        const table_results = document.querySelector('.table.table-results').querySelector('tbody').children
        const last_results = []
        for(let table_row of table_results){
            const game_data = {}

            const home_team = {}
            const home_logo = table_row.querySelectorAll('td')[0].querySelector('img').src
            const home_name = table_row.querySelectorAll('td')[0].querySelector('span').textContent
            home_team.logo = home_logo
            home_team.team_name = home_name
            game_data.home_team = home_team

            const away_team = {}
            const away_logo = table_row.querySelectorAll('td')[2].querySelector('img').src
            const away_name = table_row.querySelectorAll('td')[2].querySelector('span').textContent
            away_team.logo = away_logo
            away_team.team_name = away_name
            game_data.away_team = away_team

            const game_date = table_row.querySelectorAll('.results__schedule')[0].textContent.split('\n')[1].trim()
            const game_facility = table_row.querySelectorAll('.results__schedule')[1].querySelector('a').textContent
            const game_field = table_row.querySelectorAll('.results__schedule')[1].querySelectorAll('span')[1].textContent
            const results_score = table_row.querySelector('.results__score').textContent.split('\n')[1].split('()')[1].split('-')
            const goals_home = results_score[0]
            const goals_away = results_score[1]


            game_data.game_date = game_date
            game_data.game_facility = game_facility
            game_data.game_field = game_field
            game_data.goals_home = goals_home
            game_data.goals_away = goals_away

            last_results.push(game_data)
        }
        //Team Info Objects
        teamInfo.team_name = team_name
        teamInfo.last_result = last_result
        teamInfo.next_match = next_match
        teamInfo.team_leaderboard = team_leaderboard
        teamInfo.last_results = last_results
        return teamInfo
      });

      return result
}



module.exports = {
    getTeamInfo
}