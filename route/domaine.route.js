const express = require('express');
const app = express.Router();

const domaineController = require('../controllers/domaine.controllers')
const domaineControllerPolicy = require('../policies/domaineControllerPolicy')

app.get('/domaine', domaineController.index);
app.get('/domaine/:id_domaine', domaineController.show);
app.post('/domaine', domaineControllerPolicy.isExist, domaineController.add);
app.put('/domaine/:id_domaine', domaineControllerPolicy.beforeUpdated, domaineController.update);
app.delete('/domaine/:id_domaine', domaineControllerPolicy.isInpub, domaineController.delete);

module.exports = app