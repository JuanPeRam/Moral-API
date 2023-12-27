const express = require('express')
const resultsController = require('../controllers/results')
const api = express.Router()

api.get('/results',resultsController.getLastResults)

module.exports = api