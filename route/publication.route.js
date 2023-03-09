const express = require('express');
const app = express.Router()

const publicationController =require('../controllers/publication.controllers')
const upload =require('../models/images')
//publication
app.get('/publication',publicationController.index)

app.post('/publication', upload.uploadFileMiddleWare, upload.register)

app.post('/matierepub', publicationController.registerMatierPub)

app.get('/publication/:id_pub',publicationController.show)

app.put('/publication/:id_pub', publicationController.update)

app.delete('/publication/:id_pub', publicationController.delete)

module.exports = app