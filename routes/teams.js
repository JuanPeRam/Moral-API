const express = require('express')
const teamsController = require('../controllers/teams')
const api = express.Router()

api.get('/team/:id',teamsController.getTeamInfo)

module.exports = api