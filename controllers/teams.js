const teamsWeb = require('../web/teams')

async function getTeamInfo(req,res){
    const teamID = req.params.id
    const result = await teamsWeb.getTeamInfo(teamID)
    if(!result) res.status(444)
    else res.status(200).json(result)
}

module.exports = {
    getTeamInfo
}