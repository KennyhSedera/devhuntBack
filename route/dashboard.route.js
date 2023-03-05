const express = require('express');
const app = express.Router()


const dashboardRoute = require('../controllers/dashboard.controllers')

app.get('/countEtudiantParcour/:id_parcour', dashboardRoute.countEtudientParcour)

app.get('/getEtudiantPublication/:id_user', dashboardRoute.getpublication)

module.exports = app