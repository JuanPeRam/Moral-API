const express = require('express')
const competitionsController = require('../controllers/competitions')
const api = express.Router()

api.get('/competitions',competitionsController.getCompetitions)
api.get('/competition/:group',competitionsController.getCompetitionByGroup)

module.exports = api