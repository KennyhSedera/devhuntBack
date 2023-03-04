const express = require('express');
const app = express.Router();

const matierController = require('../controllers/matier.controllers')
const matierControllerPolicy = require('../policies/matierControllerPolicy')

app.get('/matier', matierController.index);
app.get('/matier/:id_matier', matierController.show);
app.post('/matier', matierControllerPolicy.isExist, matierController.add);
app.put('/matier/:id_matier', matierControllerPolicy.beforeUpdated, matierController.update);
app.delete('/matier/:id_matier', matierControllerPolicy.isInpub, matierController.delete);

module.exports = app