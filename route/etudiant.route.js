const express = require('express')
const app = express.Router()

const etudiantController =require('../controllers/etudiant.controllers')
const etudiantControllerPolicy =require('../policies/etudiantControllerPolicy')
//etudiant
app.get('/etudiant', etudiantController.index)

app.post('/etudiant', etudiantController.add)

app.get('/etudiant/:id_user',etudiantController.show)

app.get('/beforeCreate/:id_user', etudiantControllerPolicy.isExist)

app.get('/beforeUpdate/:id_user', etudiantControllerPolicy.beforeUpdated)

app.put('/etudiant/:id_user', etudiantController.update)

app.delete('/etudiant/:id_user', etudiantController.delete)

module.exports = app