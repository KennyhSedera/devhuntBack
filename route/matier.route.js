const express = require('express');
const app = express.Router();

const matierController = require('../controllers/matier.controllers')
const matierControllerPolicy = require('../policies/matierControllerPolicy')

app.get('/matiere', matierController.index);
app.get('/matiere/:id_matier', matierController.show);
app.post('/matiere', matierControllerPolicy.isExist, matierController.add);
app.put('/matiere/:id_matier', matierControllerPolicy.beforeUpdated, matierController.update);
app.delete('/matiere/:id_matier', matierControllerPolicy.isInpub, matierController.delete);

module.exports = app