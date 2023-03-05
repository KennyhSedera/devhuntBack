const express = require('express');
const app = express.Router()

const groupeController = require('../controllers/groupe.controllers')
//groupe
app.get('/groupe',groupeController.index)

app.post('/groupe', groupeController.add)

app.put('/groupe/:idgroupe' ,groupeController.update)

app.delete('/groupe/:idgroupe' ,groupeController.delete)

module.exports = app