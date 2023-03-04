const express = require('express');
const app = express.Router()

const niveauController =require('../controllers/niveau.controllers')
const niveauControllerPolicy =require('../policies/niveauControllersPolicy')
//niveau
app.get('/niveau',niveauController.index)

app.post('/niveau',niveauControllerPolicy.isExist, niveauController.add)

app.get('/niveau/:id_niveau',niveauController.show)

app.put('/niveau/:id_niveau',niveauControllerPolicy.beforeUpdated, niveauController.update)

app.delete('/niveau/:id_niveau',niveauControllerPolicy.isInetudiant, niveauController.delete)

module.exports = app