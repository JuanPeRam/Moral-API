const express = require('express')
const app = express()

app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
app.use(express.urlencoded({extended: true}))

//Cargar rutas
const competitions_routes = require('./routes/competitions')
const results_routes = require('./routes/results')
const teams_routes = require('./routes/teams')
// Rutas base
app.use("/",competitions_routes,results_routes,teams_routes/*,etc,etc,...*/)

module.exports = app