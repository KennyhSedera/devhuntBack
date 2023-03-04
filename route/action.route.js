const express = require('express');
const app = express.Router()

const actionController = require('../controllers/action.controllers')
//action
app.get('/action',actionController.index)

app.post('/action', actionController.add)

app.get('/action/:idaction',actionController.show)

app.put('/action/:idaction' ,actionController.update)

app.delete('/action/:idaction' ,actionController.delete)

module.exports = app