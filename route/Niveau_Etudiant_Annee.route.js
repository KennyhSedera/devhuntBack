const express = require('express');
const app = express.Router()

const NivEtudAnneeController = require('../controllers/Niveau_Etudiant_Annee.controllers')
//NivEtudAnnee
app.get('/NivEtudAnnee/:id', NivEtudAnneeController.index)

app.get('/CountNivEtudAnnee/', NivEtudAnneeController.countEtudientNIveau)

app.get('/GetEtudiantNiveau/:id_niveau', NivEtudAnneeController.getEtudientNIveau)

app.post('/NivEtudAnnee', NivEtudAnneeController.add)

app.put('/NivEtudAnnee/:id', NivEtudAnneeController.update)

app.delete('/NivEtudAnnee/:id', NivEtudAnneeController.delete)

module.exports = app