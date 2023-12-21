const competitionsWeb = require('../web/competitions')

async function getCompetitions(req,res){
    console.log('working')
    const result = await competitionsWeb.getCurrentCompetition()
    if(!result) res.status(444)
    else res.status(200).json(result)
}

async function getCompetitionByGroup(req,res){
    const group = req.params.group
    console.log(group)
    const result = await competitionsWeb.getCompetitionByGroup(group)
    res.status(200).json(result)
}

module.exports = {
    getCompetitions,getCompetitionByGroup
}