const express = require('express');
const app = express.Router()

const publicationController =require('../controllers/publication.controllers')
const upload =require('../models/images')
const imgControlaire = require('../controllers/images.controller')
//publication
app.get('/publication',publicationController.index)

app.post('/publication', imgControlaire.upload, upload.register)

app.get('/publication/:id_pub',publicationController.show)

app.put('/publication/:id_pub', publicationController.update)

app.delete('/publication/:id_pub', publicationController.delete)

module.exports = app