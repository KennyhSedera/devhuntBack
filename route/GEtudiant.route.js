const express = require('express');
const app = express.Router()

const groupeController = require('../controllers/groupeEtudiant.controller')
//groupe
// app.get('/groupe',groupeController.index)

app.post('/groupeet', groupeController.add)

app.get('/groupeet', groupeController.index)

module.exports = app