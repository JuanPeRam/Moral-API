const resultsWeb = require('../web/results')

async function getLastResults(req,res){
    const result = await resultsWeb.getLastResults()
    if(!result) res.status(444)
    else res.status(200).json(result)
}

module.exports = {
    getLastResults
}