const express = require('express');
const app = express.Router()

const anneeunivController =require('../controllers/anneeuniv.controllers')
const anneeunivControllerPolicy =require('../policies/anneeunivControllersPolicy')
//anneeuniv
app.get('/anneeuniv',anneeunivController.index)

app.post('/anneeuniv', anneeunivControllerPolicy.isExist, anneeunivController.add)

app.get('/anneeuniv/:idanneeuniv',anneeunivController.show)

app.put('/anneeuniv/:id_annee', anneeunivControllerPolicy.beforeUpdated, anneeunivController.update)

app.delete('/anneeuniv/:idanneeuniv',anneeunivControllerPolicy.isInetudiant, anneeunivController.delete)

module.exports = app