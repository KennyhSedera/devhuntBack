const express = require('express');
const app = express.Router()

const parcoursController =require('../controllers/parcour.controllers')
const parcoursControllerPolicy =require('../policies/parcourContrllersPolicy')
//parcours
app.get('/parcours', parcoursController.index)

app.post('/parcours', parcoursControllerPolicy.isExist, parcoursController.add)

app.get('/parcours/:id_parcours', parcoursController.show)

app.put('/parcours/:id_parcours', parcoursControllerPolicy.beforeUpdated, parcoursController.update)

app.delete('/parcours/:id_parcours', parcoursControllerPolicy.isInetudiant, parcoursController.delete)

module.exports = app